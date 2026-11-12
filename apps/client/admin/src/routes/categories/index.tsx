import { createFileRoute } from "@tanstack/react-router";
import { lazyComponent, TableSkeleton } from "frontend-common";
import { PageHeader } from "@/lib/components/page-header";

const CategoriesSection = lazyComponent(
  () => import("./_lib/components/categories-section").then((m) => m.CategoriesSection),
  <TableSkeleton columns={2} rows={5} />,
);

export const Route = createFileRoute("/categories/")({ component: CategoriesPage });

function CategoriesPage() {
  return (
    <>
      <PageHeader title="Categories" description="Groups shoppers filter the catalogue by." />
      <CategoriesSection />
    </>
  );
}
