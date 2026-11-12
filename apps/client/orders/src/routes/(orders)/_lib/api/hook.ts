import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { fetchMyOrders } from "./api";

const PAGE_SIZE = 10;

// Newest first; "Load more" fetches the next page. Suspends while the first page loads
export const useMyOrders = () =>
  useSuspenseInfiniteQuery({
    queryKey: ["orders"],
    queryFn: ({ pageParam }) => fetchMyOrders({ page: pageParam, pageSize: PAGE_SIZE }),
    initialPageParam: 1,
    getNextPageParam: (last) => (last.page * last.pageSize < last.total ? last.page + 1 : undefined),
  });
