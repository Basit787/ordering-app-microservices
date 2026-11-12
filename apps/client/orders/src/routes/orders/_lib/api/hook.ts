import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { invalidateKeys } from "frontend-common";
import { useNotification } from "oamui";
import { cancelOrder, fetchOrder } from "./api";

// While an order is being placed (queue) or waits for payment, its next status arrives through events
const POLL_MS = 2000;
const SETTLING = new Set(["processing", "pending_payment"]);

// Suspends until loaded, then polls while the order settles; a 404 reaches the error card
export const useOrder = (id: string) =>
  useSuspenseQuery({
    queryKey: ["order", id],
    queryFn: () => fetchOrder(id),
    refetchInterval: (query) => (SETTLING.has(query.state.data?.status ?? "") ? POLL_MS : false),
  });

export const useCancelOrder = () => {
  const queryClient = useQueryClient();
  const { showSuccessNotification, showErrorNotification } = useNotification();
  return useMutation({
    mutationFn: (id: string) => cancelOrder(id),
    onSuccess: (order) => {
      queryClient.setQueryData(["order", order.id], order);
      void queryClient.invalidateQueries({ queryKey: ["orders"] });
      showSuccessNotification("Order cancelled");
    },
    onError: (error) => {
      console.error(error);
      showErrorNotification(error, "Could not cancel the order");
    },
  });
};

// After a payment: the open order and the list
export const useRefreshOrder = () => {
  const queryClient = useQueryClient();
  return () => void invalidateKeys(queryClient, ["order", "orders"]);
};
