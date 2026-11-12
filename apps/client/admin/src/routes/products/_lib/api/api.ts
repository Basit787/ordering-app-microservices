import { createApiError, type Page, type Product, type ProductInput, toApiError } from "frontend-common";
import { ADMIN_PAGE_SIZE, apiClient } from "@/lib/api-client";
// Every product, visible or hidden
export const fetchProducts = async (): Promise<Page<Product>> => {
  try {
    const response = await apiClient.get<Page<Product>>("/products-api/admin/products", { pageSize: ADMIN_PAGE_SIZE });
    if (!response.ok) throw createApiError(response.message, response.status);
    return response.data;
  } catch (error) {
    throw toApiError(error, "Failed to load products");
  }
};

export const createProduct = async (input: ProductInput): Promise<Product> => {
  try {
    const response = await apiClient.post<Product>("/products-api/admin/products", input);
    if (!response.ok) throw createApiError(response.message, response.status);
    return response.data;
  } catch (error) {
    throw toApiError(error, "Could not create the product");
  }
};

export const updateProduct = async (id: string, input: Partial<ProductInput>): Promise<Product> => {
  try {
    const response = await apiClient.patch<Product>(`/products-api/admin/products/${encodeURIComponent(id)}`, input);
    if (!response.ok) throw createApiError(response.message, response.status);
    return response.data;
  } catch (error) {
    throw toApiError(error, "Could not save the product");
  }
};

export const deleteProduct = async (id: string): Promise<void> => {
  try {
    const response = await apiClient.delete<void>(`/products-api/admin/products/${encodeURIComponent(id)}`);
    if (!response.ok) throw createApiError(response.message, response.status);
    return response.data;
  } catch (error) {
    throw toApiError(error, "Could not delete the product");
  }
};

// Multipart field "image"; images only, up to 5 MB (the products service checks both)
export const uploadProductImage = async (id: string, file: File): Promise<Product> => {
  const body = new FormData();
  body.append("image", file);
  try {
    const response = await apiClient.postForm<Product>(
      `/products-api/admin/products/${encodeURIComponent(id)}/image`,
      body,
    );
    if (!response.ok) throw createApiError(response.message, response.status);
    return response.data;
  } catch (error) {
    throw toApiError(error, "Could not upload the image");
  }
};

export const removeProductImage = async (id: string): Promise<Product> => {
  try {
    const response = await apiClient.delete<Product>(`/products-api/admin/products/${encodeURIComponent(id)}/image`);
    if (!response.ok) throw createApiError(response.message, response.status);
    return response.data;
  } catch (error) {
    throw toApiError(error, "Could not remove the image");
  }
};
