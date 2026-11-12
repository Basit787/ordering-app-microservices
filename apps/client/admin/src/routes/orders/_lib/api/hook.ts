import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { type AdminOrderStatus, invalidateKeys, ORDER_STATUS_LABEL } from "frontend-common";
import { useNotification } from "oamui";
import { fetchOrders, setOrderStatus } from "./api";

// Suspends until loaded; render inside a SuspenseBoundary / lazyComponent
export const useOrders = () => useSuspenseQuery({ queryKey: ["admin-orders"], queryFn: fetchOrders });

export const useSetOrderStatus = () => {
  const queryClient = useQueryClient();
  const { showSuccessNotification, showErrorNotification } = useNotification();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: AdminOrderStatus }) => setOrderStatus(id, status),
    onSuccess: (order) => {
      void invalidateKeys(queryClient, ["admin-orders", "dashboard"]);
      showSuccessNotification(`Order #${order.id.slice(-6).toUpperCase()}: ${ORDER_STATUS_LABEL[order.status]}`);
    },
    onError: (error) => {
      console.error(error);
      showErrorNotification(error, "Could not update the order");
    },
  });
};
