import { createApiError, type Page, type Payment, toApiError } from "frontend-common";
import { ADMIN_PAGE_SIZE, apiClient } from "@/lib/api-client";
export const fetchPayments = async (): Promise<Page<Payment>> => {
  try {
    const response = await apiClient.get<Page<Payment>>("/payments-api/admin/payments", { pageSize: ADMIN_PAGE_SIZE });
    if (!response.ok) throw createApiError(response.message, response.status);
    return response.data;
  } catch (error) {
    throw toApiError(error, "Failed to load payments");
  }
};
