import { TanStackDevtools } from "@tanstack/react-devtools";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { AuthGate } from "frontend-common";
import { LayoutDashboard } from "lucide-react";
import { ModeToggle } from "oamui";
import { AdminLayout } from "@/lib/components/admin-layout";

export const Route = createRootRoute({ component: RootComponent });

// Admins only, for every page; the services check the role again on each request
function RootComponent() {
  return (
    <>
      <AuthGate
        requiredRole="admin"
        appName="OAM Admin"
        logo={
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
            <LayoutDashboard className="h-6 w-6" />
          </div>
        }
        headerRight={<ModeToggle />}
      >
        <AdminLayout>
          <Outlet />
        </AdminLayout>
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
