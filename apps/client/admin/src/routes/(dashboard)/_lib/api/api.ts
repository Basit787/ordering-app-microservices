import { createApiError, type Page, toApiError } from "frontend-common";
import { apiClient } from "@/lib/api-client";

// The `total` of a list, asking for one row
const countOf = async (url: string, params: Record<string, unknown> = {}): Promise<number> => {
  try {
    const response = await apiClient.get<Page<unknown>>(url, { ...params, pageSize: 1 });
    if (!response.ok) throw createApiError(response.message, response.status);
    return response.data.total;
  } catch (error) {
    throw toApiError(error, "Failed to load the dashboard");
  }
};

export const fetchDashboard = async () => {
  const [products, toShip, awaitingPayment, payments, users] = await Promise.all([
    countOf("/products-api/admin/products"),
    countOf("/orders-api/admin/orders", { status: "paid" }),
    countOf("/orders-api/admin/orders", { status: "pending_payment" }),
    countOf("/payments-api/admin/payments", { status: "succeeded" }),
    countOf("/auth-api/admin/users"),
  ]);
  return { products, toShip, awaitingPayment, payments, users };
};
