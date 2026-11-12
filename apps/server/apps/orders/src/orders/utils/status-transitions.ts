import type { OrderStatus } from "@prisma-db/orders";

// Where an order may go next; rejected, payment_failed, delivered and cancelled are final
export const NEXT_STATUSES: Record<OrderStatus, OrderStatus[]> = {
  processing: ["pending_payment", "rejected"],
  rejected: [],
  pending_payment: ["paid", "payment_failed", "cancelled"],
  paid: ["shipped", "cancelled"],
  shipped: ["delivered"],
  payment_failed: [],
  delivered: [],
  cancelled: [],
};

export const canMove = (from: OrderStatus, to: OrderStatus) => NEXT_STATUSES[from].includes(to);
