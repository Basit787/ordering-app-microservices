import { useDebouncedValue } from "frontend-common";
import { PackageSearch } from "lucide-react";
import { OamUiButton, OamUiEmpty } from "oamui";
import { useCatalog } from "../api/hook";
import { useCatalogFilterStore } from "../store/catalog-filter-store";
import { ProductCard } from "./product-card";

// The product grid for one search and category, with "Load more"
export const ProductResults = () => {
  const search = useDebouncedValue(useCatalogFilterStore((state) => state.search).trim());
  const categoryId = useCatalogFilterStore((state) => state.categoryId);
  const catalog = useCatalog(search, categoryId);
  const products = catalog.data.pages.flatMap((page) => page.items);

  if (!products.length) {
    return (
      <OamUiEmpty
        icon={<PackageSearch />}
        title="Nothing found"
        description={search ? `No products match "${search}".` : "No products in this category yet."}
        className="border"
      />
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {catalog.hasNextPage && (
        <div className="flex justify-center">
          <OamUiButton
            variant="outline"
            loading={catalog.isFetchingNextPage}
            onClick={() => void catalog.fetchNextPage()}
          >
            Load more
          </OamUiButton>
        </div>
      )}
    </>
  );
};
