import { createApiClient } from "./client";

// What the API client needs from the session; the auth client fits it
export type ApiSession = {
  getToken: () => string;
  signOut: () => void;
};

// One service's API client: every call sends the signed-in user's JWT; a 401 (expired token) signs out
export const createAppApiClient = (session: ApiSession, baseURL: string) =>
  createApiClient({
    baseURL,
    getAccessToken: session.getToken,
    onUnauthorized: session.signOut,
  });

export type ApiClient = ReturnType<typeof createApiClient>;
