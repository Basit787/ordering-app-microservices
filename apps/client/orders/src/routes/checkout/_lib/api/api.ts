import { type Address, createApiError, type Order, toApiError } from "frontend-common";
import { apiClient } from "@/lib/api-client";

// Queues the cart as an order (status processing); the orders service places it
export const checkout = async (shippingAddress: Address): Promise<Order> => {
  try {
    const response = await apiClient.post<Order>("/orders-api/orders/checkout", { shippingAddress });
    if (!response.ok) throw createApiError(response.message, response.status);
    return response.data;
  } catch (error) {
    throw toApiError(error, "Could not place the order");
  }
};
