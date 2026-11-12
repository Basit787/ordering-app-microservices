import { TanStackDevtools } from "@tanstack/react-devtools";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { AuthGate } from "frontend-common";
import { ClipboardList } from "lucide-react";
import { ModeToggle } from "oamui";

export const Route = createRootRoute({ component: RootComponent });

// Carts and orders belong to an account, so every page needs a signed-in shopper
function RootComponent() {
  return (
    <>
      <AuthGate
        appName="OAM Shop"
        logo={
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
            <ClipboardList className="h-6 w-6" />
          </div>
        }
        headerRight={<ModeToggle />}
      >
        <Outlet />
      </AuthGate>
      {import.meta.env.DEV && (
        <TanStackDevtools
          config={{ position: "bottom-right" }}
          plugins={[{ name: "TanStack Router", render: <TanStackRouterDevtoolsPanel /> }]}
        />
      )}
    </>
  );
}
