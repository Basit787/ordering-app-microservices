import { type Category, createApiError, toApiError } from "frontend-common";
import { apiClient } from "@/lib/api-client";
export const fetchCategories = async (): Promise<Category[]> => {
  try {
    const response = await apiClient.get<Category[]>("/products-api/categories");
    if (!response.ok) throw createApiError(response.message, response.status);
    return response.data;
  } catch (error) {
    throw toApiError(error, "Failed to load categories");
  }
};

export const createCategory = async (name: string): Promise<Category> => {
  try {
    const response = await apiClient.post<Category>("/products-api/admin/categories", { name });
    if (!response.ok) throw createApiError(response.message, response.status);
    return response.data;
  } catch (error) {
    throw toApiError(error, "Could not create the category");
  }
};

export const renameCategory = async (id: string, name: string): Promise<Category> => {
  try {
    const response = await apiClient.patch<Category>(`/products-api/admin/categories/${encodeURIComponent(id)}`, {
      name,
    });
    if (!response.ok) throw createApiError(response.message, response.status);
    return response.data;
  } catch (error) {
    throw toApiError(error, "Could not rename the category");
  }
};

export const deleteCategory = async (id: string): Promise<void> => {
  try {
    const response = await apiClient.delete<void>(`/products-api/admin/categories/${encodeURIComponent(id)}`);
    if (!response.ok) throw createApiError(response.message, response.status);
    return response.data;
  } catch (error) {
    throw toApiError(error, "Could not delete the category");
  }
};
