import { createAppApiClient } from "frontend-common";
import { authClient } from "./auth-client";

// The app's one API client; URLs name the service proxy, e.g. "/products-api/products" or "/orders-api/cart"
export const apiClient = createAppApiClient(authClient, "");
