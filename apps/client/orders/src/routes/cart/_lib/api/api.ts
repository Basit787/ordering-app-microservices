import { type Cart, createApiError, toApiError } from "frontend-common";
import { apiClient } from "@/lib/api-client";

export const fetchCart = async (): Promise<Cart> => {
  try {
    const response = await apiClient.get<Cart>("/orders-api/cart");
    if (!response.ok) throw createApiError(response.message, response.status);
    return response.data;
  } catch (error) {
    throw toApiError(error, "Failed to load your cart");
  }
};

// Sets the line's quantity; 0 removes it
export const setCartItem = async (productId: string, quantity: number): Promise<Cart> => {
  try {
    const response = await apiClient.put<Cart>("/orders-api/cart/items", { productId, quantity });
    if (!response.ok) throw createApiError(response.message, response.status);
    return response.data;
  } catch (error) {
    throw toApiError(error, "Could not update your cart");
  }
};

export const removeCartItem = async (productId: string): Promise<Cart> => {
  try {
    const response = await apiClient.delete<Cart>(`/orders-api/cart/items/${encodeURIComponent(productId)}`);
    if (!response.ok) throw createApiError(response.message, response.status);
    return response.data;
  } catch (error) {
    throw toApiError(error, "Could not remove the item");
  }
};
