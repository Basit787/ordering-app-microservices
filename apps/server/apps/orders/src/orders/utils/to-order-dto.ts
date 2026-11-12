import type { Order } from "@prisma-db/orders";
import { OrderDto } from "../dto/order.dto";

export const toOrderDto = (order: Order): OrderDto => ({
  id: order.id,
  userId: order.userId,
  userName: order.userName,
  items: order.items,
  totalCents: order.totalCents,
  status: order.status,
  shippingAddress: order.shippingAddress,
  paymentId: order.paymentId,
  failureReason: order.failureReason,
  createdAt: order.createdAt,
  updatedAt: order.updatedAt,
});
