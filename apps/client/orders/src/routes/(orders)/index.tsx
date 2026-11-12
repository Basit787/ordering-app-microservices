import { createFileRoute } from "@tanstack/react-router";
import { ListSkeleton, lazyComponent } from "frontend-common";
import { OrdersHeader } from "@/lib/components/orders-header";

const OrdersList = lazyComponent(
  () => import("./_lib/components/orders-list").then((m) => m.OrdersList),
  <ListSkeleton />,
);

export const Route = createFileRoute("/(orders)/")({ component: OrdersPage });

function OrdersPage() {
  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <OrdersHeader page="My orders" />
      <main className="mx-auto w-full max-w-3xl flex-1 space-y-4 px-4 py-8 md:px-6">
        <h1 className="text-2xl font-semibold">My orders</h1>
        <OrdersList />
      </main>
    </div>
  );
}
