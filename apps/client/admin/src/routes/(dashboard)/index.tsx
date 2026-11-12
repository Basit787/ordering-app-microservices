import { createFileRoute } from "@tanstack/react-router";
import { lazyComponent, StatGridSkeleton } from "frontend-common";
import { PageHeader } from "@/lib/components/page-header";

const StatGrid = lazyComponent(
  () => import("./_lib/components/stat-grid").then((m) => m.StatGrid),
  <StatGridSkeleton />,
);

export const Route = createFileRoute("/(dashboard)/")({ component: DashboardPage });

function DashboardPage() {
  return (
    <>
      <PageHeader title="Dashboard" description="What needs attention in the shop." />
      <StatGrid />
    </>
  );
}
