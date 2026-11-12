import { ClipboardList, Clock, CreditCard, type LucideIcon, Package, Users } from "lucide-react";
import type { fetchDashboard } from "../api/api";

type DashboardTotals = Awaited<ReturnType<typeof fetchDashboard>>;

// One tile per total, in display order
export const STATS: { key: keyof DashboardTotals; label: string; icon: LucideIcon }[] = [
  { key: "toShip", label: "Orders to ship", icon: ClipboardList },
  { key: "awaitingPayment", label: "Awaiting payment", icon: Clock },
  { key: "payments", label: "Successful payments", icon: CreditCard },
  { key: "products", label: "Products", icon: Package },
  { key: "users", label: "Users", icon: Users },
];
