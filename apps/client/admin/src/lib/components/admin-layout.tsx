import { useNavigate, useRouterState } from "@tanstack/react-router";
import { UserMenu } from "frontend-common";
import { ClipboardList, CreditCard, LayoutDashboard, Package, Shapes, Users } from "lucide-react";
import { ModeToggle, OamUiSidebarLayout } from "oamui";
import type { ReactNode } from "react";

const NAV = [
  { to: "/", title: "Dashboard", icon: LayoutDashboard },
  { to: "/products", title: "Products", icon: Package },
  { to: "/categories", title: "Categories", icon: Shapes },
  { to: "/orders", title: "Orders", icon: ClipboardList },
  { to: "/payments", title: "Payments", icon: CreditCard },
  { to: "/users", title: "Users", icon: Users },
] as const;

// Back-office shell: sidebar navigation, theme toggle and account menu
export const AdminLayout = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  return (
    <OamUiSidebarLayout
      header={<span className="px-2 text-sm font-semibold">OAM Admin</span>}
      sections={[
        {
          items: NAV.map(({ to, title, icon: Icon }) => ({
            title,
            icon: <Icon />,
            isActive: pathname === to,
            onClick: () => void navigate({ to }),
          })),
        },
      ]}
      topBar={
        <div className="ml-auto flex items-center gap-2">
          <ModeToggle />
          <UserMenu />
        </div>
      }
    >
      <main className="mx-auto w-full max-w-6xl space-y-6 px-4 py-6 md:px-6">{children}</main>
    </OamUiSidebarLayout>
  );
};
