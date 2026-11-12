import { CreditCard } from "lucide-react";
import { OamUiButton, Skeleton, useNotification } from "oamui";
import { useState } from "react";
import { useAuth } from "../auth/react/use-auth";
import { formatMoney } from "../lib/format";
import type { Order } from "../types/orders";
import { usePayment, useVerifyPayment } from "./payment-hooks";
import type { PaymentsApi } from "./payments-api";
import { openRazorpayCheckout } from "./razorpay-checkout";

type PayButtonProps = {
  api: PaymentsApi;
  order: Order;
  // Called once the payment is confirmed, e.g. to refetch the order
  onPaid?: () => void;
};

// Pays a pending order: Razorpay Checkout, then the signature is verified by the payments service
export const PayButton = ({ api, order, onPaid }: PayButtonProps) => {
  const { user } = useAuth();
  const { showErrorNotification, showSuccessNotification } = useNotification();
  const payment = usePayment(api, order.id, order.status === "pending_payment");
  const verify = useVerifyPayment(api, order.id);
  const [opening, setOpening] = useState(false);

  if (order.status !== "pending_payment") return null;
  // Not opened by the payments service yet, or the mock gateway (no Razorpay keys) settling on its own
  if (!payment.data?.checkout) {
    return (
      <div className="space-y-2" aria-busy>
        <Skeleton className="h-9 w-40" />
        <p className="text-sm text-muted-foreground">{payment.data ? "Confirming payment…" : "Preparing payment…"}</p>
      </div>
    );
  }

  const pay = async () => {
    if (!payment.data?.checkout) return;
    setOpening(true);
    try {
      const result = await openRazorpayCheckout({
        checkout: payment.data.checkout,
        name: "OAM Shop",
        description: `Order ${order.id.slice(-6).toUpperCase()}`,
        prefill: { name: user?.name, email: user?.email, contact: order.shippingAddress.phone },
      });
      await verify.mutateAsync(result);
      showSuccessNotification("Payment received");
      onPaid?.();
    } catch (error) {
      showErrorNotification(error, "Payment was not completed");
    } finally {
      setOpening(false);
    }
  };

  return (
    <div className="space-y-2">
      <OamUiButton icon={<CreditCard />} loading={opening || verify.isPending} onClick={() => void pay()}>
        Pay {formatMoney(order.totalCents)}
      </OamUiButton>
      {payment.data.failureReason && (
        <p className="text-sm text-muted-foreground">Last attempt: {payment.data.failureReason}</p>
      )}
    </div>
  );
};
