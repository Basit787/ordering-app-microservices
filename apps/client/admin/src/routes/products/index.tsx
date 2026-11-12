import { createFileRoute } from "@tanstack/react-router";
import { lazyComponent, TableSkeleton } from "frontend-common";
import { PageHeader } from "@/lib/components/page-header";

const ProductsSection = lazyComponent(
  () => import("./_lib/components/products-section").then((m) => m.ProductsSection),
  <TableSkeleton columns={5} />,
);

export const Route = createFileRoute("/products/")({ component: ProductsPage });

function ProductsPage() {
  return (
    <>
      <PageHeader title="Products" description="Everything in the catalogue, visible or hidden." />
      <ProductsSection />
    </>
  );
}
