import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import { TableSkeleton } from "frontend-common";
import { routeTree } from "./routeTree.gen";

export function getRouter() {
  return createTanStackRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreload: "intent",
    defaultPreloadStaleTime: 0,
    // Route chunks load lazily (autoCodeSplitting); a slow one shows a skeleton inside the admin layout
    defaultPendingComponent: () => <TableSkeleton />,
    defaultPendingMs: 150,
  });
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
