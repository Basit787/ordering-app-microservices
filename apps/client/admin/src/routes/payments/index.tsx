import { createFileRoute } from "@tanstack/react-router";
import { lazyComponent, TableSkeleton } from "frontend-common";
import { PageHeader } from "@/lib/components/page-header";

const PaymentsSection = lazyComponent(
  () => import("./_lib/components/payments-section").then((m) => m.PaymentsSection),
  <TableSkeleton columns={6} />,
);

export const Route = createFileRoute("/payments/")({ component: PaymentsPage });

function PaymentsPage() {
  return (
    <>
      <PageHeader title="Payments" description="Every charge and refund, newest first." />
      <PaymentsSection />
    </>
  );
}
