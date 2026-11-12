import { RouterProvider } from "@tanstack/react-router";
import { AppProviders } from "frontend-common";
import { authClient } from "./lib/auth-client";
import { queryClient } from "./lib/query-client";
import { getRouter } from "./router";

const router = getRouter();

// Theme, React Query, the shared sign-in session, tooltips and toasts around the router
export const App = () => (
  <AppProviders authClient={authClient} queryClient={queryClient}>
    <RouterProvider router={router} />
  </AppProviders>
);
