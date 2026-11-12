import { createApiError, type Product, toApiError } from "frontend-common";
import { apiClient } from "@/lib/api-client";

export const fetchProduct = async (id: string): Promise<Product> => {
  try {
    const response = await apiClient.get<Product>(`/products-api/products/${encodeURIComponent(id)}`);
    if (!response.ok) throw createApiError(response.message, response.status);
    return response.data;
  } catch (error) {
    throw toApiError(error, "Failed to load the product");
  }
};
