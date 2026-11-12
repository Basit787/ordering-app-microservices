import { OamUiBreadcrumb } from "oamui";
import { frontendUrl } from "../lib/service-url";

type AppBreadcrumbsProps = {
  // Current app, e.g. "Store"; leave out on the home app itself
  app?: string;
  // Page inside the app, e.g. "Orders"
  page?: string;
  className?: string;
};

// Home › App › Page; every part but the last is a link
export const AppBreadcrumbs = ({ app, page, className }: AppBreadcrumbsProps) => {
  const items: { label: string; href?: string }[] = [{ label: "Home", href: frontendUrl("auth") }];
  if (app) items.push({ label: app, href: "/" });
  if (page) items.push({ label: page });
  return <OamUiBreadcrumb items={items} className={className} />;
};
