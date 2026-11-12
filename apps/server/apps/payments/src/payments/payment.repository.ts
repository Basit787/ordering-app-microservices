import { Inject, Injectable } from "@nestjs/common";
import { type Payment, type Prisma, PrismaClient } from "@prisma-db/payments";
import { PRISMA } from "backend-common";

// Data access for payments
@Injectable()
export class PaymentRepository {
  constructor(@Inject(PRISMA) private readonly prisma: PrismaClient) {}

  create(data: Prisma.PaymentCreateInput): Promise<Payment> {
    return this.prisma.payment.create({ data });
  }

  findByOrder(orderId: string): Promise<Payment | null> {
    return this.prisma.payment.findUnique({ where: { orderId } });
  }

  findByRazorpayOrder(razorpayOrderId: string): Promise<Payment | null> {
    return this.prisma.payment.findFirst({ where: { razorpayOrderId } });
  }

  list(where: Prisma.PaymentWhereInput, skip: number, take: number): Promise<[Payment[], number]> {
    return this.prisma.$transaction([
      this.prisma.payment.findMany({ where, orderBy: { createdAt: "desc" }, skip, take }),
      this.prisma.payment.count({ where }),
    ]);
  }

  // A capture also lands on a payment closed by a cancellation, so the order side can refund it; null when already settled
  async markSucceeded(orderId: string, razorpayPaymentId: string | null): Promise<Payment | null> {
    const { count } = await this.prisma.payment.updateMany({
      where: { orderId, status: { in: ["created", "failed"] } },
      data: { status: "succeeded", razorpayPaymentId, failureReason: null },
    });
    return count ? this.findByOrder(orderId) : null;
  }

  // Closes a payment nobody paid yet
  async closeUnpaid(orderId: string, reason: string): Promise<void> {
    await this.prisma.payment.updateMany({
      where: { orderId, status: "created" },
      data: { status: "failed", failureReason: reason },
    });
  }

  // A failed attempt in Checkout; the payment stays open so the shopper can retry
  async noteFailure(id: string, reason: string): Promise<void> {
    await this.prisma.payment.updateMany({ where: { id, status: "created" }, data: { failureReason: reason } });
  }

  // Only a payment that went through can be refunded; false when there was none
  async markRefunded(orderId: string): Promise<boolean> {
    const { count } = await this.prisma.payment.updateMany({
      where: { orderId, status: "succeeded" },
      data: { status: "refunded" },
    });
    return count > 0;
  }
}
