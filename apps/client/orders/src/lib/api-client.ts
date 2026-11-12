import { createAppApiClient, createPaymentsApi } from "frontend-common";
import { authClient } from "./auth-client";

// The app's one API client; URLs name the service proxy, e.g. "/orders-api/cart"
export const apiClient = createAppApiClient(authClient, "");

// Payments helpers from frontend-common (PayButton, usePayment), on the same client
export const paymentsApi = createPaymentsApi(apiClient);
