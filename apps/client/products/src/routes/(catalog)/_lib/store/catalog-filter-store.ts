import { create } from "zustand";

type CatalogFilterState = {
  // What the shopper types; the results follow it after a short pause (useDebouncedValue)
  search: string;
  categoryId: string | undefined;
  setSearch: (search: string) => void;
  setCategory: (categoryId: string | undefined) => void;
};

// Kept while the shopper moves between the catalogue and a product page
export const useCatalogFilterStore = create<CatalogFilterState>()((set) => ({
  search: "",
  categoryId: undefined,
  setSearch: (search) => set({ search }),
  setCategory: (categoryId) => set({ categoryId }),
}));
