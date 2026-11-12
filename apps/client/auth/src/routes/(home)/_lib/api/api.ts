import { type Category, createApiError, type Page, type Product, toApiError } from "frontend-common";
import { apiClient } from "@/lib/api-client";

// The newest products in the shop (public)
export const fetchFeaturedProducts = async (): Promise<Product[]> => {
  try {
    const response = await apiClient.get<Page<Product>>("/products-api/products", { pageSize: 8 });
    if (!response.ok) throw createApiError(response.message, response.status);
    return response.data.items;
  } catch (error) {
    throw toApiError(error, "Failed to load products");
  }
};

export const fetchCategories = async (): Promise<Category[]> => {
  try {
    const response = await apiClient.get<Category[]>("/products-api/categories");
    if (!response.ok) throw createApiError(response.message, response.status);
    return response.data;
  } catch (error) {
    throw toApiError(error, "Failed to load categories");
  }
};
