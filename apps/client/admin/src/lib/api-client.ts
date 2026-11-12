import { createAppApiClient, createPaymentsApi } from "frontend-common";
import { authClient } from "./auth-client";

// The app's one API client; URLs name the service proxy, e.g. "/orders-api/admin/orders"
export const apiClient = createAppApiClient(authClient, "");

// Payments helpers from frontend-common (order payment lookups), on the same client
export const paymentsApi = createPaymentsApi(apiClient);

// The services cap a page at 100; the tables filter and page these rows in the browser
export const ADMIN_PAGE_SIZE = 100;
