import { type AuthAccount, createApiError, type Page, type Role, toApiError } from "frontend-common";
import { ADMIN_PAGE_SIZE, apiClient } from "@/lib/api-client";
export const fetchUsers = async (): Promise<Page<AuthAccount>> => {
  try {
    const response = await apiClient.get<Page<AuthAccount>>("/auth-api/admin/users", { pageSize: ADMIN_PAGE_SIZE });
    if (!response.ok) throw createApiError(response.message, response.status);
    return response.data;
  } catch (error) {
    throw toApiError(error, "Failed to load users");
  }
};

export const setUserRole = async (id: string, role: Role): Promise<AuthAccount> => {
  try {
    const response = await apiClient.patch<AuthAccount>(`/auth-api/admin/users/${encodeURIComponent(id)}/role`, {
      role,
    });
    if (!response.ok) throw createApiError(response.message, response.status);
    return response.data;
  } catch (error) {
    throw toApiError(error, "Could not change the role");
  }
};
