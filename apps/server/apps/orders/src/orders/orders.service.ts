import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
  type OnModuleDestroy,
  type OnModuleInit,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import type { Order, OrderStatus } from "@prisma-db/orders";
import {
  type AuthUser,
  createJobQueue,
  type JobQueue,
  type Page,
  type PaymentResultPayload,
  toSkipTake,
} from "backend-common";
import type { Job } from "bullmq";
import { CartService } from "../cart/cart.service";
import { PaymentsClient } from "../clients/payments.client";
import { OutOfStockError, ProductsClient } from "../clients/products.client";
import { CheckoutDto } from "./dto/checkout.dto";
import { ListOrdersQueryDto } from "./dto/list-orders-query.dto";
import { OrderDto } from "./dto/order.dto";
import { OrderRepository } from "./order.repository";
import { canMove } from "./utils/status-transitions";
import { toOrderDto } from "./utils/to-order-dto";

type OrderJob = { orderId: string };

const PLACE_QUEUE = "orders.place";
const EXPIRE_QUEUE = "orders.expire-unpaid";

@Injectable()
export class OrdersService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(OrdersService.name);
  private placeQueue!: JobQueue<OrderJob>;
  private expireQueue!: JobQueue<OrderJob>;

  constructor(
    private readonly orders: OrderRepository,
    private readonly cart: CartService,
    private readonly products: ProductsClient,
    private readonly payments: PaymentsClient,
    private readonly config: ConfigService,
  ) {}

  onModuleInit() {
    const redisUrl = this.config.getOrThrow<string>("REDIS_URL");
    this.placeQueue = createJobQueue<OrderJob>(PLACE_QUEUE, (job) => this.place(job), { redisUrl, concurrency: 5 });
    this.expireQueue = createJobQueue<OrderJob>(EXPIRE_QUEUE, (job) => this.expire(job.data.orderId), { redisUrl });
    this.placeQueue.start();
    this.expireQueue.start();
  }

  async onModuleDestroy() {
    await Promise.all([this.placeQueue.close(), this.expireQueue.close()]);
  }

  // Event-driven checkout: the order is recorded as processing and queued; the place worker finishes it
  async checkout(user: AuthUser, { shippingAddress }: CheckoutDto): Promise<OrderDto> {
    const lines = await this.cart.items(user.id);
    if (!lines.length) throw new BadRequestException("Your cart is empty");

    // Names and prices shown while processing; the worker replaces them with the reserved ones
    const products = new Map((await this.products.summaries(lines.map((l) => l.productId))).map((p) => [p.id, p]));
    const items = lines.flatMap(({ productId, quantity }) => {
      const product = products.get(productId);
      return product ? [{ productId, quantity, name: product.name, priceCents: product.priceCents }] : [];
    });
    if (items.length !== lines.length) throw new BadRequestException("A product in your cart is no longer sold");

    const order = await this.orders.create({
      userId: user.id,
      userName: user.username,
      items,
      totalCents: items.reduce((sum, item) => sum + item.priceCents * item.quantity, 0),
      shippingAddress,
    });
    await this.cart.clear(user.id);
    // jobId = order id: the same order is never queued twice
    await this.placeQueue.add({ orderId: order.id }, { jobId: order.id });
    return toOrderDto(order);
  }

  async mine(userId: string, query: ListOrdersQueryDto): Promise<Page<OrderDto>> {
    return this.list({ userId, ...(query.status && { status: query.status }) }, query);
  }

  async all(query: ListOrdersQueryDto): Promise<Page<OrderDto>> {
    return this.list(query.status ? { status: query.status } : {}, query);
  }

  // Shoppers see their own orders only; admins see every order
  async get(user: AuthUser, id: string): Promise<OrderDto> {
    return toOrderDto(await this.find(user, id));
  }

  async cancel(user: AuthUser, id: string): Promise<OrderDto> {
    return this.moveTo(await this.find(user, id), "cancelled");
  }

  async setStatus(id: string, status: OrderStatus): Promise<OrderDto> {
    const order = await this.orders.findById(id);
    if (!order) throw new NotFoundException("Order not found");
    return this.moveTo(order, status);
  }

  async paymentSucceeded({ orderId, paymentId }: PaymentResultPayload): Promise<void> {
    if (await this.orders.move(orderId, "pending_payment", { status: "paid", paymentId })) {
      await this.expireQueue.queue.remove(`expire-${orderId}`);
      return;
    }
    // Cancelled while the payment was in flight: refund it
    const order = await this.orders.findById(orderId);
    if (order?.status === "cancelled") await this.payments.orderCancelled({ orderId });
    else this.logger.warn(`Payment ${paymentId} for order ${orderId}, which no longer waits for payment`);
  }

  async paymentFailed({ orderId, paymentId, reason }: PaymentResultPayload): Promise<void> {
    const order = await this.orders.move(orderId, "pending_payment", {
      status: "payment_failed",
      paymentId,
      failureReason: reason ?? "Payment failed",
    });
    if (order) await this.products.release({ orderId, items: order.items });
  }

  // Place worker: reserve stock → pending_payment → order_placed event → expiry timer.
  // Refused (out of stock) → rejected with the items back in the cart; a fault is retried by the queue
  private async place(job: Job<OrderJob>): Promise<void> {
    const order = await this.orders.findById(job.data.orderId);
    if (order?.status !== "processing") return;

    let items: Awaited<ReturnType<ProductsClient["reserve"]>>;
    try {
      items = await this.products.reserve(order.items.map(({ productId, quantity }) => ({ productId, quantity })));
    } catch (error) {
      if (error instanceof OutOfStockError) return this.reject(order, error.message);
      const lastAttempt = job.attemptsMade + 1 >= (job.opts.attempts ?? 1);
      if (lastAttempt) return this.reject(order, "We could not place your order. Please try again.");
      throw error;
    }

    const totalCents = items.reduce((sum, item) => sum + item.priceCents * item.quantity, 0);
    const placed = await this.orders.move(order.id, "processing", { status: "pending_payment", items, totalCents });
    if (!placed) {
      await this.products.release({ orderId: order.id, items });
      return;
    }
    await this.payments.orderPlaced({ orderId: order.id, userId: order.userId, totalCents });
    const minutes = this.config.getOrThrow<number>("PAYMENT_TIMEOUT_MINUTES");
    await this.expireQueue.addAt(
      new Date(Date.now() + minutes * 60_000),
      { orderId: order.id },
      { jobId: `expire-${order.id}` },
    );
  }

  private async reject(order: Order, reason: string): Promise<void> {
    if (!(await this.orders.move(order.id, "processing", { status: "rejected", failureReason: reason }))) return;
    await this.cart.restore(order.userId, order.items);
  }

  // Expiry worker: an order still unpaid after PAYMENT_TIMEOUT_MINUTES is cancelled (stock back, payment closed)
  private async expire(orderId: string): Promise<void> {
    const order = await this.orders.findById(orderId);
    if (order?.status !== "pending_payment") return;
    const minutes = this.config.getOrThrow<number>("PAYMENT_TIMEOUT_MINUTES");
    await this.moveTo(order, "cancelled", `Not paid within ${minutes} minutes`);
  }

  private async list(where: Record<string, unknown>, query: ListOrdersQueryDto): Promise<Page<OrderDto>> {
    const { skip, take } = toSkipTake(query);
    const [orders, total] = await this.orders.list(where, skip, take);
    return { items: orders.map(toOrderDto), total, page: query.page, pageSize: query.pageSize };
  }

  private async find(user: AuthUser, id: string): Promise<Order> {
    const order = await this.orders.findById(id);
    if (!order || (user.role !== "admin" && order.userId !== user.id)) throw new NotFoundException("Order not found");
    return order;
  }

  // A cancellation gives the stock back and tells payments, which refunds a payment that went through
  private async moveTo(order: Order, status: OrderStatus, failureReason?: string): Promise<OrderDto> {
    if (!canMove(order.status, status)) {
      throw new BadRequestException(`An order that is ${order.status.replace("_", " ")} cannot become ${status}`);
    }
    const moved = await this.orders.move(order.id, order.status, { status, ...(failureReason && { failureReason }) });
    if (!moved) throw new ConflictException("The order changed meanwhile, reload it");

    if (status === "cancelled") {
      await this.products.release({ orderId: order.id, items: order.items });
      await this.payments.orderCancelled({ orderId: order.id });
      await this.expireQueue.queue.remove(`expire-${order.id}`);
    }
    return toOrderDto(moved);
  }
}
