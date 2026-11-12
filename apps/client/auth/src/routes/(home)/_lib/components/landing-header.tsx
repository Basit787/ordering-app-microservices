import { Link } from "@tanstack/react-router";
import { frontendUrl, UserMenu, useAuth } from "frontend-common";
import { ShoppingBag, UserRound } from "lucide-react";
import { Button, DropdownMenuItem, ModeToggle } from "oamui";

// The site header: brand, the two shopper apps, then sign-in or the account menu
export const LandingHeader = () => {
  const { status } = useAuth();
  return (
    <header className="sticky top-0 z-30 border-b bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-6 px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <span className="flex size-8 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <ShoppingBag className="size-4" />
          </span>
          OAM Shop
        </Link>
        <nav className="hidden items-center gap-1 text-sm sm:flex" aria-label="Main">
          <Button asChild variant="ghost" size="sm">
            <a href={frontendUrl("products")}>Shop</a>
          </Button>
          <Button asChild variant="ghost" size="sm">
            <a href={frontendUrl("orders")}>My orders</a>
          </Button>
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <ModeToggle />
          {status === "signedIn" ? (
            <UserMenu>
              <DropdownMenuItem asChild>
                <Link to="/profile">
                  <UserRound />
                  Profile
                </Link>
              </DropdownMenuItem>
            </UserMenu>
          ) : status === "signedOut" ? (
            <Button asChild size="sm">
              <Link to="/sign-in">Sign in</Link>
            </Button>
          ) : null}
        </div>
      </div>
    </header>
  );
};
