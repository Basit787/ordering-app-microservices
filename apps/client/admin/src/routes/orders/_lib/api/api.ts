import { type AdminOrderStatus, createApiError, type Order, type Page, toApiError } from "frontend-common";
import { ADMIN_PAGE_SIZE, apiClient } from "@/lib/api-client";
export const fetchOrders = async (): Promise<Page<Order>> => {
  try {
    const response = await apiClient.get<Page<Order>>("/orders-api/admin/orders", { pageSize: ADMIN_PAGE_SIZE });
    if (!response.ok) throw createApiError(response.message, response.status);
    return response.data;
  } catch (error) {
    throw toApiError(error, "Failed to load orders");
  }
};

export const setOrderStatus = async (id: string, status: AdminOrderStatus): Promise<Order> => {
  try {
    const response = await apiClient.patch<Order>(`/orders-api/admin/orders/${encodeURIComponent(id)}/status`, {
      status,
    });
    if (!response.ok) throw createApiError(response.message, response.status);
    return response.data;
  } catch (error) {
    throw toApiError(error, "Could not update the order");
  }
};
