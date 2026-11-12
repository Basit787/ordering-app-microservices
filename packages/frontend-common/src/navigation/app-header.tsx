import { cn } from "oamui";
import type { ReactNode } from "react";
import { AppBreadcrumbs } from "./app-breadcrumbs";
import { UserMenu } from "./user-menu";

type AppHeaderProps = {
  // Current app, e.g. "Store"; leave out on the home app itself
  app?: string;
  // Page inside the app, e.g. "Orders"
  page?: string;
  // Extra buttons left of the avatar
  actions?: ReactNode;
  // Extra entries in the account menu
  menu?: ReactNode;
  className?: string;
};

// Header every app shares: breadcrumbs on the left, the account menu on the right
export const AppHeader = ({ app, page, actions, menu, className }: AppHeaderProps) => (
  <header
    className={cn(
      "sticky top-0 z-30 flex h-14 shrink-0 items-center gap-3 border-b bg-background/95 px-4 backdrop-blur md:px-6",
      className,
    )}
  >
    <AppBreadcrumbs app={app} page={page} className="min-w-0" />
    <div className="ml-auto flex items-center gap-2">
      {actions}
      <UserMenu>{menu}</UserMenu>
    </div>
  </header>
);
