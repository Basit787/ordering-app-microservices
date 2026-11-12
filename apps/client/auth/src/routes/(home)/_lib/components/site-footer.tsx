import { frontendUrl } from "frontend-common";

export const SiteFooter = () => (
  <footer className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-8 text-sm text-muted-foreground md:px-6">
    <p>© {new Date().getFullYear()} OAM Shop</p>
    <nav className="flex gap-4" aria-label="Footer">
      <a href={frontendUrl("products")} className="hover:text-foreground">
        Shop
      </a>
      <a href={frontendUrl("orders")} className="hover:text-foreground">
        My orders
      </a>
      <a href={frontendUrl("orders", "/cart")} className="hover:text-foreground">
        Cart
      </a>
    </nav>
  </footer>
);
