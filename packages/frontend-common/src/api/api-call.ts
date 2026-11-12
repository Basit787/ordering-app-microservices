import { createApiError } from "./errors";
import { toApiError } from "./to-api-error";
import type { ApiResponse } from "./types";

// Awaits an API client call and returns its data; any failure becomes an Error with the server's message or `fallback`
export const apiCall = async <T>(request: Promise<ApiResponse<T>>, fallback: string): Promise<T> => {
  try {
    const response = await request;
    if (!response.ok) throw createApiError(response.message, response.status);
    return response.data;
  } catch (error) {
    throw toApiError(error, fallback);
  }
};
