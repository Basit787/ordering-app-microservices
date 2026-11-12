import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import type { Cart } from "frontend-common";
import { useNotification } from "oamui";
import { fetchCart, removeCartItem, setCartItem } from "./api";

// Suspends until loaded; render inside a SuspenseBoundary / lazyComponent
export const useCart = () => useSuspenseQuery({ queryKey: ["cart"], queryFn: fetchCart });

const useCartMutation = <T>(run: (input: T) => Promise<Cart>) => {
  const queryClient = useQueryClient();
  const { showErrorNotification } = useNotification();
  return useMutation({
    mutationFn: run,
    onSuccess: (cart) => queryClient.setQueryData(["cart"], cart),
    onError: (error) => {
      console.error(error);
      showErrorNotification(error, "Could not update your cart");
    },
  });
};

export const useSetCartItem = () =>
  useCartMutation(({ productId, quantity }: { productId: string; quantity: number }) =>
    setCartItem(productId, quantity),
  );

export const useRemoveCartItem = () => useCartMutation((productId: string) => removeCartItem(productId));
