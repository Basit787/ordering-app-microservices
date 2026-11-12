import { Link } from "@tanstack/react-router";
import { AppHeader, frontendUrl } from "frontend-common";
import { ClipboardList, ShoppingBag, ShoppingCart } from "lucide-react";
import { Button } from "oamui";

const TAB =
  "flex items-center gap-2 border-b-2 border-transparent px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground";

// Header plus the app's two sections: the cart and the orders
export const OrdersHeader = ({ page }: { page?: string }) => (
  <>
    <AppHeader
      app="Orders"
      page={page}
      actions={
        <Button asChild variant="ghost" size="sm">
          <a href={frontendUrl("products")}>
            <ShoppingBag />
            Shop
          </a>
        </Button>
      }
    />
    <nav className="flex gap-1 border-b px-4 md:px-6" aria-label="Sections">
      <Link
        to="/"
        className={TAB}
        activeOptions={{ exact: true }}
        activeProps={{ className: "border-primary text-foreground" }}
      >
        <ClipboardList className="h-4 w-4" />
        My orders
      </Link>
      <Link to="/cart" className={TAB} activeProps={{ className: "border-primary text-foreground" }}>
        <ShoppingCart className="h-4 w-4" />
        Cart
      </Link>
    </nav>
  </>
);
