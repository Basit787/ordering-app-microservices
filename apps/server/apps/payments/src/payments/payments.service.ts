import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
  type OnModuleDestroy,
  type OnModuleInit,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import type { Payment } from "@prisma-db/payments";
import {
  type AuthUser,
  createJobQueue,
  type JobQueue,
  type OrderPlacedPayload,
  type Page,
  toSkipTake,
} from "backend-common";
import { OrdersClient } from "../clients/orders.client";
import { RazorpayGateway } from "../gateway/razorpay.gateway";
import { ListPaymentsQueryDto } from "./dto/list-payments-query.dto";
import { PaymentDto } from "./dto/payment.dto";
import { VerifyPaymentDto } from "./dto/verify-payment.dto";
import { PaymentRepository } from "./payment.repository";
import type { RazorpayWebhookEvent } from "./utils/razorpay-webhook-event";

@Injectable()
export class PaymentsService implements OnModuleInit, OnModuleDestroy {
  private chargeQueue!: JobQueue<OrderPlacedPayload>;
  private readonly logger = new Logger(PaymentsService.name);

  constructor(
    private readonly payments: PaymentRepository,
    private readonly orders: OrdersClient,
    private readonly razorpay: RazorpayGateway,
    private readonly config: ConfigService,
  ) {}

  onModuleInit() {
    const redisUrl = this.config.getOrThrow<string>("REDIS_URL");
    this.chargeQueue = createJobQueue<OrderPlacedPayload>("payments.charge", (job) => this.charge(job.data), {
      redisUrl,
    });
    this.chargeQueue.start();
  }

  async onModuleDestroy() {
    await this.chargeQueue.close();
  }

  // jobId = order id: a repeated order_placed adds nothing while the first charge job exists
  async queueCharge(payload: OrderPlacedPayload): Promise<void> {
    await this.chargeQueue.add(payload, { jobId: payload.orderId });
  }

  // Charge job. Razorpay: open a Razorpay order and wait for Checkout. Mock: decide at once (declined above PAYMENT_LIMIT_CENTS)
  async charge({ orderId, userId, totalCents }: OrderPlacedPayload): Promise<void> {
    const existing = await this.payments.findByOrder(orderId);
    if (existing) return this.announce(existing);

    const currency = this.config.getOrThrow<string>("PAYMENT_CURRENCY");
    if (this.razorpay.enabled) {
      const razorpayOrderId = await this.razorpay.createOrder(totalCents, currency, orderId);
      await this.payments.create({
        orderId,
        userId,
        amountCents: totalCents,
        currency,
        status: "created",
        provider: "razorpay",
        razorpayOrderId,
      });
      return;
    }

    const declined = totalCents > this.config.getOrThrow<number>("PAYMENT_LIMIT_CENTS");
    const payment = await this.payments.create({
      orderId,
      userId,
      amountCents: totalCents,
      currency,
      status: declined ? "failed" : "succeeded",
      provider: "mock",
      failureReason: declined ? "The card was declined: amount above the limit" : null,
    });
    await this.announce(payment);
  }

  // The values from Checkout's success handler; the signature proves Razorpay issued them
  async verify(user: AuthUser, orderId: string, body: VerifyPaymentDto): Promise<PaymentDto> {
    const payment = await this.ownPayment(user, orderId);
    if (payment.provider !== "razorpay" || payment.razorpayOrderId !== body.razorpayOrderId) {
      throw new BadRequestException("This payment does not belong to the order");
    }
    if (!this.razorpay.verifyCheckout(body.razorpayOrderId, body.razorpayPaymentId, body.razorpaySignature)) {
      throw new BadRequestException("Invalid payment signature");
    }
    return this.toPaymentDto(await this.settle(payment, body.razorpayPaymentId));
  }

  // Captures the browser never reported (tab closed after paying) and failed attempts
  async webhook(rawBody: Buffer | undefined, signature: string | undefined): Promise<void> {
    if (!rawBody || !signature || !this.razorpay.verifyWebhook(rawBody, signature)) {
      throw new BadRequestException("Invalid webhook signature");
    }
    const event = JSON.parse(rawBody.toString("utf8")) as RazorpayWebhookEvent;
    const entity = event.payload?.payment?.entity;
    if (!entity?.order_id) return;
    const payment = await this.payments.findByRazorpayOrder(entity.order_id);
    if (!payment) return;

    if (event.event === "payment.captured") await this.settle(payment, entity.id);
    if (event.event === "payment.failed") {
      await this.payments.noteFailure(payment.id, entity.error_description || "Payment failed");
    }
  }

  // An unpaid payment is closed; a paid one is refunded (through Razorpay when it went through Razorpay)
  async refund(orderId: string): Promise<void> {
    const payment = await this.payments.findByOrder(orderId);
    if (!payment) return;
    if (payment.status === "created") return this.payments.closeUnpaid(orderId, "Order cancelled before payment");
    if (payment.status !== "succeeded") return;

    if (payment.provider === "razorpay" && payment.razorpayPaymentId) {
      await this.razorpay.refund(payment.razorpayPaymentId, payment.amountCents);
    }
    if (await this.payments.markRefunded(orderId)) this.logger.log(`Refunded the payment of order ${orderId}`);
  }

  async list(query: ListPaymentsQueryDto): Promise<Page<PaymentDto>> {
    const { skip, take } = toSkipTake(query);
    const [payments, total] = await this.payments.list(query.status ? { status: query.status } : {}, skip, take);
    return { items: payments.map((p) => this.toPaymentDto(p)), total, page: query.page, pageSize: query.pageSize };
  }

  // The payer or an admin; carries the Checkout values while the payment waits
  async forOrder(user: AuthUser, orderId: string): Promise<PaymentDto> {
    return this.toPaymentDto(await this.ownPayment(user, orderId));
  }

  private async ownPayment(user: AuthUser, orderId: string): Promise<Payment> {
    const payment = await this.payments.findByOrder(orderId);
    if (!payment || (user.role !== "admin" && payment.userId !== user.id)) {
      throw new NotFoundException("Payment not found");
    }
    return payment;
  }

  // Marks it paid once and tells orders; a second report (Checkout and webhook) changes nothing
  private async settle(payment: Payment, razorpayPaymentId: string): Promise<Payment> {
    const settled = await this.payments.markSucceeded(payment.orderId, razorpayPaymentId);
    if (!settled) return payment;
    await this.orders.paymentSucceeded({ orderId: payment.orderId, paymentId: payment.id });
    return settled;
  }

  // Replays a decided outcome to orders; an open payment has nothing to say yet
  private async announce(payment: Payment): Promise<void> {
    const result = { orderId: payment.orderId, paymentId: payment.id };
    if (payment.status === "failed") {
      await this.orders.paymentFailed({ ...result, reason: payment.failureReason ?? undefined });
    }
    if (payment.status === "succeeded" || payment.status === "refunded") await this.orders.paymentSucceeded(result);
  }

  private toPaymentDto(payment: Payment): PaymentDto {
    const waiting = payment.status === "created" && payment.razorpayOrderId;
    return {
      id: payment.id,
      orderId: payment.orderId,
      userId: payment.userId,
      amountCents: payment.amountCents,
      currency: payment.currency,
      status: payment.status,
      provider: payment.provider,
      razorpayPaymentId: payment.razorpayPaymentId,
      failureReason: payment.failureReason,
      checkout: waiting
        ? {
            keyId: this.razorpay.keyId,
            razorpayOrderId: payment.razorpayOrderId as string,
            amount: payment.amountCents,
            currency: payment.currency,
          }
        : null,
      createdAt: payment.createdAt,
    };
  }
}
