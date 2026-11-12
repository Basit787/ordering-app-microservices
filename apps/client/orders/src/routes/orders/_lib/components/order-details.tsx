import { Link } from "@tanstack/react-router";
import { formatDateTime, OrderStatusBadge, PayButton, PaymentStatusBadge, usePayment } from "frontend-common";
import { CircleAlert, Clock, ShoppingCart } from "lucide-react";
import { Button, OamUiAlert, OamUiAlertDialog, OamUiCard } from "oamui";
import { useState } from "react";
import { paymentsApi } from "@/lib/api-client";
import { useCancelOrder, useOrder, useRefreshOrder } from "../api/hook";
import { AddressCard } from "./address-card";
import { OrderItems } from "./order-items";

// Shoppers may cancel until the order ships
const CANCELLABLE = new Set(["pending_payment", "paid"]);

export const OrderDetails = ({ orderId }: { orderId: string }) => {
  const { data: order } = useOrder(orderId);
  const payment = usePayment(paymentsApi, orderId);
  const cancel = useCancelOrder();
  const refresh = useRefreshOrder();
  const [confirmCancel, setConfirmCancel] = useState(false);

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold">Order #{order.id.slice(-6).toUpperCase()}</h1>
          <p className="text-sm text-muted-foreground">Placed {formatDateTime(order.createdAt)}</p>
        </div>
        <OrderStatusBadge status={order.status} />
      </div>

      {order.status === "processing" && (
        <OamUiAlert
          icon={<Clock />}
          title="Placing your order"
          description="Reserving your items — this takes a moment."
        />
      )}
      {order.status === "rejected" && (
        <OamUiAlert
          icon={<ShoppingCart />}
          title="Your items are back in the cart"
          description={
            <span>
              <Link to="/cart">Review the cart</Link> and try again.
            </span>
          }
        />
      )}
      {order.failureReason && <OamUiAlert variant="destructive" icon={<CircleAlert />} title={order.failureReason} />}

      <div className="grid gap-6 md:grid-cols-[1fr_18rem]">
        <OamUiCard title="Items">
          <OrderItems items={order.items} totalCents={order.totalCents} />
        </OamUiCard>
        <div className="space-y-4">
          <OamUiCard title="Payment">
            {order.status === "pending_payment" ? (
              <PayButton api={paymentsApi} order={order} onPaid={refresh} />
            ) : payment.data ? (
              <div className="space-y-2 text-sm">
                <PaymentStatusBadge status={payment.data.status} />
                <p className="text-muted-foreground">
                  {payment.data.provider === "razorpay" ? "Razorpay" : "Test gateway"}
                  {payment.data.razorpayPaymentId && ` · ${payment.data.razorpayPaymentId}`}
                </p>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No payment recorded.</p>
            )}
          </OamUiCard>
          <AddressCard address={order.shippingAddress} />
          {CANCELLABLE.has(order.status) && (
            <Button
              variant="outline"
              className="w-full text-destructive hover:text-destructive"
              onClick={() => setConfirmCancel(true)}
            >
              Cancel order
            </Button>
          )}
        </div>
      </div>

      <OamUiAlertDialog
        open={confirmCancel}
        onOpenChange={setConfirmCancel}
        title="Cancel this order?"
        description={
          order.status === "paid"
            ? "The items go back on sale and your payment is refunded."
            : "The items go back on sale."
        }
        confirmText="Cancel order"
        cancelText="Keep it"
        destructive
        onConfirm={() => cancel.mutate(order.id)}
      />
    </>
  );
};
