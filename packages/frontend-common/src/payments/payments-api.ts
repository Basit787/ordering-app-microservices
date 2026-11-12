import type { ApiClient } from "../api/create-app-api-client";
import { createApiError } from "../api/errors";
import { toApiError } from "../api/to-api-error";
import type { Page } from "../types/page";
import type { Payment, PaymentQuery, VerifyPaymentInput } from "../types/payments";

// The payments service, reached through the app's /payments-api proxy with its one API client
export const createPaymentsApi = (client: ApiClient) => ({
  // null while payments has not picked the order up yet
  forOrder: async (orderId: string): Promise<Payment | null> => {
    try {
      const response = await client.get<Payment>(`/payments-api/payments/orders/${encodeURIComponent(orderId)}`);
      if (response.ok) return response.data;
      if (response.status === 404) return null;
      throw createApiError(response.message, response.status);
    } catch (error) {
      throw toApiError(error, "Failed to load the payment");
    }
  },

  verify: async (orderId: string, body: VerifyPaymentInput): Promise<Payment> => {
    try {
      const response = await client.post<Payment>(
        `/payments-api/payments/orders/${encodeURIComponent(orderId)}/verify`,
        body,
      );
      if (!response.ok) throw createApiError(response.message, response.status);
      return response.data;
    } catch (error) {
      throw toApiError(error, "Failed to confirm the payment");
    }
  },

  list: async (query: PaymentQuery = {}): Promise<Page<Payment>> => {
    try {
      const response = await client.get<Page<Payment>>("/payments-api/admin/payments", query);
      if (!response.ok) throw createApiError(response.message, response.status);
      return response.data;
    } catch (error) {
      throw toApiError(error, "Failed to load payments");
    }
  },
});

export type PaymentsApi = ReturnType<typeof createPaymentsApi>;
