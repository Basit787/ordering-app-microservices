import {
  formatDateTime,
  formatMoney,
  type Order,
  type OrderItem,
  OrderStatusBadge,
  PaymentStatusBadge,
  usePayment,
} from "frontend-common";
import { OamUiAlert, OamUiDialog, OamUiItem, OamUiTable, type OamUiTableColumn, Skeleton } from "oamui";
import { paymentsApi } from "@/lib/api-client";

const ITEM_COLUMNS: OamUiTableColumn<OrderItem>[] = [
  { key: "name", header: "Item" },
  { key: "quantity", header: "Qty", className: "text-right" },
  {
    key: "total",
    header: "Total",
    className: "text-right",
    cell: (item) => formatMoney(item.priceCents * item.quantity),
  },
];

type OrderDetailsDialogProps = { order: Order | null; onClose: () => void };

export const OrderDetailsDialog = ({ order, onClose }: OrderDetailsDialogProps) => {
  const payment = usePayment(paymentsApi, order?.id ?? "", !!order);
  const address = order?.shippingAddress;

  return (
    <OamUiDialog
      open={!!order}
      onOpenChange={(open) => !open && onClose()}
      title={order ? `Order #${order.id.slice(-6).toUpperCase()}` : ""}
      description={order ? `${order.userName} · ${formatDateTime(order.createdAt)}` : undefined}
      className="sm:max-w-xl"
    >
      {order && address && (
        <div className="space-y-4">
          <OrderStatusBadge status={order.status} />
          <OamUiTable
            columns={ITEM_COLUMNS}
            data={order.items}
            rowKey={(item) => item.productId}
            footer={
              <div className="flex justify-between">
                <span>Total</span>
                <span>{formatMoney(order.totalCents)}</span>
              </div>
            }
          />
          <OamUiItem
            variant="muted"
            title="Ship to"
            description={`${address.fullName}, ${address.phone} · ${address.line1}${address.line2 ? `, ${address.line2}` : ""}, ${address.city}, ${address.state} ${address.postalCode}, ${address.country}`}
          />
          <OamUiItem
            variant="muted"
            title="Payment"
            description={
              payment.isLoading ? (
                <Skeleton className="h-4 w-40" />
              ) : payment.data ? (
                `${payment.data.provider === "razorpay" ? "Razorpay" : "Test gateway"}${payment.data.razorpayPaymentId ? ` · ${payment.data.razorpayPaymentId}` : ""}`
              ) : (
                "None yet"
              )
            }
            actions={payment.data && <PaymentStatusBadge status={payment.data.status} />}
          />
          {order.failureReason && <OamUiAlert variant="destructive" title={order.failureReason} />}
        </div>
      )}
    </OamUiDialog>
  );
};
