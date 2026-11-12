import type { IncomingMessage } from "node:http";

export type Role = "user" | "admin";

// The user behind a verified access token (claims sub, name, role)
export interface AuthUser {
  id: string;
  role: Role;
  username: string;
}

// The HTTP request after the guard: Node's request plus the signed-in user
export type AuthenticatedRequest = IncomingMessage & { user?: AuthUser };
