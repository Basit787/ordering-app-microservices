import { AppHeader, frontendUrl, signInUrl, useAuth } from "frontend-common";
import { LogIn, ShoppingCart } from "lucide-react";
import { Button } from "oamui";
import { useCartCount } from "@/lib/api/hook";

// The store header: cart with its item count when signed in, otherwise a sign-in button
export const ShopHeader = ({ page }: { page?: string }) => {
  const { status } = useAuth();
  const count = useCartCount();

  return (
    <AppHeader
      app="Shop"
      page={page}
      actions={
        status === "signedIn" ? (
          <Button asChild variant="ghost" size="sm">
            <a href={frontendUrl("orders", "/cart")} aria-label={`Cart, ${count} items`}>
              <ShoppingCart />
              Cart
              {count > 0 && (
                <span className="rounded-full bg-primary/15 px-2 text-xs font-medium text-primary">{count}</span>
              )}
            </a>
          </Button>
        ) : status === "signedOut" ? (
          <Button asChild size="sm">
            <a href={signInUrl()}>
              <LogIn />
              Sign in
            </a>
          </Button>
        ) : null
      }
    />
  );
};
