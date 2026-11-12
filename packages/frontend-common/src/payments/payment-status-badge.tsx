import { CircleAlert, CircleCheck, Clock, Undo2 } from "lucide-react";
import { OamUiBadge } from "oamui";
import type { PaymentStatus } from "../types/payments";

export const PAYMENT_STATUS_LABEL: Record<PaymentStatus, string> = {
  created: "Awaiting payment",
  succeeded: "Succeeded",
  failed: "Failed",
  refunded: "Refunded",
};

export const PaymentStatusBadge = ({ status }: { status: PaymentStatus }) => {
  if (status === "succeeded") return <OamUiBadge icon={<CircleCheck />}>{PAYMENT_STATUS_LABEL.succeeded}</OamUiBadge>;
  if (status === "failed") {
    return (
      <OamUiBadge variant="destructive" icon={<CircleAlert />}>
        {PAYMENT_STATUS_LABEL.failed}
      </OamUiBadge>
    );
  }
  if (status === "refunded") {
    return (
      <OamUiBadge variant="outline" icon={<Undo2 />}>
        {PAYMENT_STATUS_LABEL.refunded}
      </OamUiBadge>
    );
  }
  return (
    <OamUiBadge variant="secondary" icon={<Clock />}>
      {PAYMENT_STATUS_LABEL.created}
    </OamUiBadge>
  );
};
