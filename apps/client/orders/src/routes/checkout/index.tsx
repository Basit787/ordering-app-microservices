import { createFileRoute } from "@tanstack/react-router";
import { FormSkeleton, ListSkeleton, lazyComponent } from "frontend-common";
import { OrdersHeader } from "@/lib/components/orders-header";

const CheckoutForm = lazyComponent(
  () => import("./_lib/components/checkout-form").then((m) => m.CheckoutForm),
  <div className="grid gap-8 md:grid-cols-[1fr_22rem]">
    <FormSkeleton fields={8} />
    <ListSkeleton count={2} />
  </div>,
);

export const Route = createFileRoute("/checkout/")({ component: CheckoutPage });

function CheckoutPage() {
  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <OrdersHeader page="Checkout" />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 md:px-6">
        <CheckoutForm />
      </main>
    </div>
  );
}
