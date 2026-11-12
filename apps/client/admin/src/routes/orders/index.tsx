import { createFileRoute } from "@tanstack/react-router";
import { lazyComponent, TableSkeleton } from "frontend-common";
import { PageHeader } from "@/lib/components/page-header";

const OrdersSection = lazyComponent(
  () => import("./_lib/components/orders-section").then((m) => m.OrdersSection),
  <TableSkeleton columns={6} />,
);

export const Route = createFileRoute("/orders/")({ component: OrdersPage });

function OrdersPage() {
  return (
    <>
      <PageHeader title="Orders" description="Ship paid orders, mark deliveries, cancel with a refund." />
      <OrdersSection />
    </>
  );
}
