import { useSuspenseInfiniteQuery, useSuspenseQuery } from "@tanstack/react-query";
import { fetchCategories, fetchProducts } from "./api";

const PAGE_SIZE = 12;

// Pages of the catalogue for the current search and category; "Load more" fetches the next one.
// Suspends while the first page loads (render inside a SuspenseBoundary / lazyComponent)
export const useCatalog = (search: string, categoryId: string | undefined) =>
  useSuspenseInfiniteQuery({
    queryKey: ["catalog", search, categoryId],
    queryFn: ({ pageParam }) => fetchProducts({ page: pageParam, pageSize: PAGE_SIZE, search, categoryId }),
    initialPageParam: 1,
    getNextPageParam: (last) => (last.page * last.pageSize < last.total ? last.page + 1 : undefined),
  });

export const useCategories = () =>
  useSuspenseQuery({ queryKey: ["categories"], queryFn: fetchCategories, staleTime: 5 * 60_000 });
