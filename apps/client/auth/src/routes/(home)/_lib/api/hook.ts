import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchCategories, fetchFeaturedProducts } from "./api";

// Both suspend until loaded; render inside a SuspenseBoundary / lazyComponent
export const useFeaturedProducts = () =>
  useSuspenseQuery({ queryKey: ["featured-products"], queryFn: fetchFeaturedProducts, staleTime: 60_000 });

export const useCategories = () =>
  useSuspenseQuery({ queryKey: ["categories"], queryFn: fetchCategories, staleTime: 5 * 60_000 });
