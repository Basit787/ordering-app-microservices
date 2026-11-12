import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "frontend-common";
import { useNotification } from "oamui";
import { fetchCart, setCartItem } from "./api";

// Only for a signed-in shopper; nobody else has a cart
export const useCart = () => {
  const { status } = useAuth();
  return useQuery({ queryKey: ["cart"], queryFn: fetchCart, enabled: status === "signedIn" });
};

export const useCartCount = () => {
  const { data } = useCart();
  return data?.items.reduce((sum, line) => sum + line.quantity, 0) ?? 0;
};

// Adds on top of what the cart already holds for the product
export const useAddToCart = () => {
  const queryClient = useQueryClient();
  const { data: cart } = useCart();
  const { showSuccessNotification, showErrorNotification } = useNotification();

  return useMutation({
    mutationFn: ({ productId, quantity }: { productId: string; quantity: number }) => {
      const inCart = cart?.items.find((line) => line.productId === productId)?.quantity ?? 0;
      return setCartItem(productId, inCart + quantity);
    },
    onSuccess: (next) => {
      queryClient.setQueryData(["cart"], next);
      showSuccessNotification("Added to your cart");
    },
    onError: (error) => {
      console.error(error);
      showErrorNotification(error, "Could not add to your cart");
    },
  });
};
