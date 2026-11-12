import { Link } from "@tanstack/react-router";
import { formatMoney, frontendUrl } from "frontend-common";
import { ShoppingCart } from "lucide-react";
import { Button, Card, ItemGroup, ItemSeparator, OamUiAlert, OamUiCard, OamUiEmpty } from "oamui";
import { Fragment } from "react";
import { useCart } from "../api/hook";
import { CartLineRow } from "./cart-line-row";

export const CartContents = () => {
  const { data: cart } = useCart();
  const blocked = cart.items.some((line) => !line.available);

  if (!cart.items.length) {
    return (
      <OamUiEmpty
        icon={<ShoppingCart />}
        title="Your cart is empty"
        description="Add products from the shop to see them here."
        action={
          <Button asChild>
            <a href={frontendUrl("products")}>Go to the shop</a>
          </Button>
        }
        className="border"
      />
    );
  }

  return (
    <>
      <Card className="py-0">
        <ItemGroup>
          {cart.items.map((line, index) => (
            <Fragment key={line.productId}>
              {index > 0 && <ItemSeparator />}
              <CartLineRow line={line} />
            </Fragment>
          ))}
        </ItemGroup>
      </Card>
      {blocked && <OamUiAlert variant="destructive" title="Fix the highlighted items before checking out." />}
      <OamUiCard
        title="Subtotal"
        description="Prices are confirmed when your order is placed."
        action={<span className="text-lg font-semibold">{formatMoney(cart.totalCents)}</span>}
        footer={
          <div className="flex w-full justify-end gap-2">
            <Button asChild variant="outline">
              <a href={frontendUrl("products")}>Continue shopping</a>
            </Button>
            {blocked ? (
              <Button disabled>Checkout</Button>
            ) : (
              <Button asChild>
                <Link to="/checkout">Checkout</Link>
              </Button>
            )}
          </div>
        }
      />
    </>
  );
};
