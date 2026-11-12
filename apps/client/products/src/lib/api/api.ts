import { type Cart, createApiError, toApiError } from "frontend-common";
import { apiClient } from "@/lib/api-client";

// The cart lives in the orders service; the shop reads it (header count) and adds to it (product page)
export const fetchCart = async (): Promise<Cart> => {
  try {
    const response = await apiClient.get<Cart>("/orders-api/cart");
    if (!response.ok) throw createApiError(response.message, response.status);
    return response.data;
  } catch (error) {
    throw toApiError(error, "Failed to load your cart");
  }
};

// Sets the line's quantity (not an increment)
export const setCartItem = async (productId: string, quantity: number): Promise<Cart> => {
  try {
    const response = await apiClient.put<Cart>("/orders-api/cart/items", { productId, quantity });
    if (!response.ok) throw createApiError(response.message, response.status);
    return response.data;
  } catch (error) {
    throw toApiError(error, "Could not update your cart");
  }
};
