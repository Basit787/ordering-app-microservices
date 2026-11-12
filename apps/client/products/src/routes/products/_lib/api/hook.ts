import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchProduct } from "./api";

// Suspends until loaded; a 404 reaches the SuspenseBoundary's error card
export const useProduct = (id: string) =>
  useSuspenseQuery({ queryKey: ["product", id], queryFn: () => fetchProduct(id) });
