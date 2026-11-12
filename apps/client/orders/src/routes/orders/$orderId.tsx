import { createFileRoute, Link } from "@tanstack/react-router";
import { DetailSkeleton, lazyComponent } from "frontend-common";
import { ArrowLeft } from "lucide-react";
import { Button } from "oamui";
import { OrdersHeader } from "@/lib/components/orders-header";

const OrderDetails = lazyComponent(
  () => import("./_lib/components/order-details").then((m) => m.OrderDetails),
  <DetailSkeleton />,
);

export const Route = createFileRoute("/orders/$orderId")({ component: OrderPage });

function OrderPage() {
  const { orderId } = Route.useParams();
  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <OrdersHeader page={`Order #${orderId.slice(-6).toUpperCase()}`} />
      <main className="mx-auto w-full max-w-4xl flex-1 space-y-6 px-4 py-8 md:px-6">
        <Button asChild variant="ghost" size="sm">
          <Link to="/">
            <ArrowLeft />
            My orders
          </Link>
        </Button>
        <OrderDetails orderId={orderId} />
      </main>
    </div>
  );
}
