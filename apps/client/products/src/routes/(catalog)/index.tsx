import { createFileRoute } from "@tanstack/react-router";
import { CardGridSkeleton, ChipsSkeleton, lazyComponent } from "frontend-common";
import { Search } from "lucide-react";
import { OamUiInput } from "oamui";
import { ShopHeader } from "@/lib/components/shop-header";
import { useCatalogFilterStore } from "./_lib/store/catalog-filter-store";

const CategoryFilter = lazyComponent(
  () => import("./_lib/components/category-filter").then((m) => m.CategoryFilter),
  <ChipsSkeleton />,
);
const ProductResults = lazyComponent(
  () => import("./_lib/components/product-results").then((m) => m.ProductResults),
  <CardGridSkeleton />,
);

export const Route = createFileRoute("/(catalog)/")({ component: CatalogPage });

// The search box stays outside the suspense sections, so typing is never interrupted
function CatalogPage() {
  const { search, setSearch } = useCatalogFilterStore();

  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <ShopHeader />
      <main className="mx-auto w-full max-w-6xl flex-1 space-y-6 px-4 py-8 md:px-6">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold">Shop</h1>
          <p className="text-muted-foreground">Everyday things, delivered across India.</p>
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <CategoryFilter />
          <div className="relative md:w-72">
            <Search className="pointer-events-none absolute top-2.5 left-3 size-4 text-muted-foreground" />
            <OamUiInput
              aria-label="Search products"
              placeholder="Search products…"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="[&_input]:pl-9"
            />
          </div>
        </div>

        <ProductResults />
      </main>
    </div>
  );
}
