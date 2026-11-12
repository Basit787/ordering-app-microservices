import { type Category, createApiError, type Page, type Product, type ProductQuery, toApiError } from "frontend-common";
import { apiClient } from "@/lib/api-client";

// Active products only; the shop needs no sign-in
export const fetchProducts = async (query: ProductQuery): Promise<Page<Product>> => {
  try {
    const response = await apiClient.get<Page<Product>>("/products-api/products", query);
    if (!response.ok) throw createApiError(response.message, response.status);
    return response.data;
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
