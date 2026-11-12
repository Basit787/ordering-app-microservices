import { createAuthClient } from "frontend-common";

// The auth service, proxied by Vite at /auth-api; the token cookie is shared by every app on this host
export const authClient = createAuthClient({ baseUrl: "/auth-api" });
