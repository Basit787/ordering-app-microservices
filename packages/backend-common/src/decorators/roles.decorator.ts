import { SetMetadata } from "@nestjs/common";
import type { Role } from "../auth/auth-user.js";
import { ROLES } from "./metadata-keys.js";

// Only these roles get through (after the token check), e.g. @Roles("admin") on an admin controller
export const Roles = (...roles: Role[]) => SetMetadata(ROLES, roles);
