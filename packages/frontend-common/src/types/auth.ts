export type Role = "user" | "admin";

// Mirrors AuthUserDto in apps/server/apps/auth/src/auth/dto/auth-user.dto.ts
export type AuthAccount = {
  id: string;
  name: string;
  email: string;
  role: Role;
  createdAt: string;
};

export type AuthStatus = "loading" | "signedOut" | "signedIn";

export type AuthSnapshot = {
  status: AuthStatus;
  user: AuthAccount | null;
  // JWT every API call sends as "Authorization: Bearer <token>"; empty while signed out
  token: string;
};

export type SignInPayload = { email: string; password: string };

export type SignUpPayload = SignInPayload & { name: string };

// Mirrors SignInReplyDto in apps/server/apps/auth/src/auth/dto/sign-in-reply.dto.ts
export type SignInReply = { user: AuthAccount; token: string; expiresAt: number };
