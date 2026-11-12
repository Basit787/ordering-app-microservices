import { createApiError, type Order, toApiError } from "frontend-common";
import { apiClient } from "@/lib/api-client";

export const fetchOrder = async (id: string): Promise<Order> => {
  try {
    const response = await apiClient.get<Order>(`/orders-api/orders/${encodeURIComponent(id)}`);
    if (!response.ok) throw createApiError(response.message, response.status);
    return response.data;
  } catch (error) {
    throw toApiError(error, "Failed to load the order");
  }
};

export const cancelOrder = async (id: string): Promise<Order> => {
  try {
    const response = await apiClient.post<Order>(`/orders-api/orders/${encodeURIComponent(id)}/cancel`);
    if (!response.ok) throw createApiError(response.message, response.status);
    return response.data;
  } catch (error) {
    throw toApiError(error, "Could not cancel the order");
  }
};
