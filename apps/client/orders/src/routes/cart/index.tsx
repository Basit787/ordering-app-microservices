import { createFileRoute } from "@tanstack/react-router";
import { ListSkeleton, lazyComponent } from "frontend-common";
import { OrdersHeader } from "@/lib/components/orders-header";

const CartContents = lazyComponent(
  () => import("./_lib/components/cart-contents").then((m) => m.CartContents),
  <ListSkeleton count={3} />,
);

export const Route = createFileRoute("/cart/")({ component: CartPage });

function CartPage() {
  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <OrdersHeader page="Cart" />
      <main className="mx-auto w-full max-w-3xl flex-1 space-y-4 px-4 py-8 md:px-6">
        <h1 className="text-2xl font-semibold">Your cart</h1>
        <CartContents />
      </main>
    </div>
  );
}
