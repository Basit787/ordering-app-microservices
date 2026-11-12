import { createApiError, type Order, type OrderQuery, type Page, toApiError } from "frontend-common";
import { apiClient } from "@/lib/api-client";

export const fetchMyOrders = async (query: OrderQuery): Promise<Page<Order>> => {
  try {
    const response = await apiClient.get<Page<Order>>("/orders-api/orders", query);
    if (!response.ok) throw createApiError(response.message, response.status);
    return response.data;
  } catch (error) {
    throw toApiError(error, "Failed to load your orders");
  }
};
