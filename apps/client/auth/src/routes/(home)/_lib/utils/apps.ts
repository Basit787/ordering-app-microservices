import { frontendUrl } from "frontend-common";
import { ClipboardList, LayoutDashboard, type LucideIcon, ShoppingBag, ShoppingCart } from "lucide-react";

export type AppEntry = {
  id: string;
  name: string;
  description: string;
  url: string;
  icon: LucideIcon;
  // Shown to admins only
  adminOnly?: boolean;
};

// Every app reachable from home; add new apps here
export const APPS: AppEntry[] = [
  {
    id: "products",
    name: "Shop",
    description: "Browse the catalogue and add products to your cart.",
    url: frontendUrl("products"),
    icon: ShoppingBag,
  },
  {
    id: "cart",
    name: "Cart & checkout",
    description: "Review your cart, pay securely with Razorpay.",
    url: frontendUrl("orders", "/cart"),
    icon: ShoppingCart,
  },
  {
    id: "orders",
    name: "My orders",
    description: "Track orders, pay pending ones or cancel.",
    url: frontendUrl("orders"),
    icon: ClipboardList,
  },
  {
    id: "admin",
    name: "Admin",
    description: "Products, categories, orders, payments and users.",
    url: frontendUrl("admin"),
    icon: LayoutDashboard,
    adminOnly: true,
  },
];
