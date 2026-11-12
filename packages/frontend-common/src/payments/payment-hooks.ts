import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { PaymentQuery } from "../types/payments";
import type { PaymentsApi } from "./payments-api";

const POLL_MS = 1500;

// The order's payment; polled until payments has opened it, then while it waits for the shopper
export const usePayment = (api: PaymentsApi, orderId: string, enabled = true) =>
  useQuery({
    queryKey: ["payment", orderId],
    queryFn: () => api.forOrder(orderId),
    enabled,
    refetchInterval: (query) => (!query.state.data || query.state.data.status === "created" ? POLL_MS : false),
  });

export const useVerifyPayment = (api: PaymentsApi, orderId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: Parameters<PaymentsApi["verify"]>[1]) => api.verify(orderId, body),
    onSuccess: (payment) => queryClient.setQueryData(["payment", orderId], payment),
  });
};

// Every payment, for admins
export const usePayments = (api: PaymentsApi, query: PaymentQuery) =>
  useQuery({ queryKey: ["payments", query], queryFn: () => api.list(query) });
