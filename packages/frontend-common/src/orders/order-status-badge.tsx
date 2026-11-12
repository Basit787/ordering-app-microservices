import { Ban, CircleAlert, CircleCheck, CircleX, Clock, Loader2, PackageCheck, Truck } from "lucide-react";
import { OamUiBadge } from "oamui";
import type { OrderStatus } from "../types/orders";

export const ORDER_STATUS_LABEL: Record<OrderStatus, string> = {
  processing: "Placing order",
  rejected: "Not placed",
  pending_payment: "Awaiting payment",
  paid: "Paid",
  payment_failed: "Payment failed",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

const ICON: Record<OrderStatus, typeof Clock> = {
  processing: Loader2,
  rejected: CircleX,
  pending_payment: Clock,
  paid: CircleCheck,
  payment_failed: CircleAlert,
  shipped: Truck,
  delivered: PackageCheck,
  cancelled: Ban,
};

// Problems in red, done in the primary colour, everything in between muted
export const OrderStatusBadge = ({ status }: { status: OrderStatus }) => {
  const Icon = ICON[status];
  const variant =
    status === "payment_failed" || status === "rejected"
      ? "destructive"
      : status === "delivered" || status === "paid"
        ? "default"
        : status === "cancelled"
          ? "outline"
          : "secondary";
  return (
    <OamUiBadge variant={variant} icon={<Icon className={status === "processing" ? "animate-spin" : undefined} />}>
      {ORDER_STATUS_LABEL[status]}
    </OamUiBadge>
  );
};
