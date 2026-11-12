import { useMutation, useQueryClient } from "@tanstack/react-query";
import { type Address, invalidateKeys, useAddressStore } from "frontend-common";
import { useNotification } from "oamui";
import { checkout } from "./api";

// Remembers the address for next time, empties the cart cache and lists the new order
export const useCheckout = () => {
  const queryClient = useQueryClient();
  const saveAddress = useAddressStore((state) => state.save);
  const { showErrorNotification } = useNotification();
  return useMutation({
    mutationFn: (address: Address) => checkout(address),
    onSuccess: (order, address) => {
      saveAddress(address);
      queryClient.setQueryData(["order", order.id], order);
      void invalidateKeys(queryClient, ["cart", "orders"]);
    },
    onError: (error) => {
      console.error(error);
      showErrorNotification(error, "Could not place the order");
    },
  });
};
