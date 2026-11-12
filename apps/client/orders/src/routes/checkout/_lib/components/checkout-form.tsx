import { Link, useNavigate } from "@tanstack/react-router";
import { type Address, useAddressStore } from "frontend-common";
import { OamUiAlert, OamUiButton, OamUiCard, useAppForm } from "oamui";
import { useCart } from "../../../cart/_lib/api/hook";
import { OrderItems } from "../../../orders/_lib/components/order-items";
import { useCheckout } from "../api/hook";

const EMPTY: Address = {
  fullName: "",
  phone: "",
  line1: "",
  line2: "",
  city: "",
  state: "",
  postalCode: "",
  country: "India",
};

// Required, with the same minimum lengths as AddressDto; a saved address submits as is, so no "changed" check
const required = (label: string, min = 1) => ({
  onChange: ({ value }: { value: string | null | undefined }) =>
    (value ?? "").trim().length < min ? `${label} is required` : undefined,
});

// The shipping form beside the order summary
export const CheckoutForm = () => {
  const navigate = useNavigate();
  const { data: cart } = useCart();
  const saved = useAddressStore((state) => state.address);
  const placeOrder = useCheckout();

  const form = useAppForm({
    defaultValues: { ...EMPTY, ...saved, line2: saved?.line2 ?? "" },
    onSubmit: async ({ value }) => {
      const address = { ...value, line2: value.line2?.trim() || null };
      const order = await placeOrder.mutateAsync(address);
      await navigate({ to: "/orders/$orderId", params: { orderId: order.id } });
    },
  });

  return (
    <div className="grid gap-8 md:grid-cols-[1fr_22rem]">
      <section className="space-y-4">
        <h1 className="text-2xl font-semibold">Shipping address</h1>
        <form.AppForm>
          <form.Form className="grid gap-4 sm:grid-cols-2">
            <form.AppField name="fullName" validators={required("Full name")}>
              {(field) => <field.TextField label="Full name" autoComplete="name" />}
            </form.AppField>
            <form.AppField name="phone" validators={required("Phone", 5)}>
              {(field) => <field.TextField label="Phone" type="tel" autoComplete="tel" />}
            </form.AppField>
            <form.AppField name="line1" validators={required("Address")}>
              {(field) => <field.TextField label="Address" autoComplete="address-line1" className="sm:col-span-2" />}
            </form.AppField>
            <form.AppField name="line2">
              {(field) => (
                <field.TextField
                  label="Apartment, landmark (optional)"
                  autoComplete="address-line2"
                  className="sm:col-span-2"
                />
              )}
            </form.AppField>
            <form.AppField name="city" validators={required("City")}>
              {(field) => <field.TextField label="City" autoComplete="address-level2" />}
            </form.AppField>
            <form.AppField name="state" validators={required("State")}>
              {(field) => <field.TextField label="State" autoComplete="address-level1" />}
            </form.AppField>
            <form.AppField name="postalCode" validators={required("PIN code", 3)}>
              {(field) => <field.TextField label="PIN code" inputMode="numeric" autoComplete="postal-code" />}
            </form.AppField>
            <form.AppField name="country" validators={required("Country", 2)}>
              {(field) => <field.TextField label="Country" autoComplete="country-name" />}
            </form.AppField>
            <div className="flex gap-2 sm:col-span-2">
              <form.Subscribe selector={(state) => state.isSubmitting}>
                {(isSubmitting) => (
                  <OamUiButton type="submit" loading={isSubmitting} disabled={!cart.items.length}>
                    Place order and pay
                  </OamUiButton>
                )}
              </form.Subscribe>
            </div>
          </form.Form>
        </form.AppForm>
      </section>

      <OamUiCard title="Order summary" className="h-fit">
        {cart.items.length ? (
          <OrderItems
            items={cart.items.map(({ productId, name, priceCents, quantity }) => ({
              productId,
              name,
              priceCents,
              quantity,
            }))}
            totalCents={cart.totalCents}
          />
        ) : (
          <OamUiAlert title="Your cart is empty" description={<Link to="/cart">Back to the cart</Link>} />
        )}
      </OamUiCard>
    </div>
  );
};
