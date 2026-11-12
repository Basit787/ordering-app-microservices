import type { User } from "@prisma-db/auth";
import { AuthUserDto } from "../dto/auth-user.dto";

export const toAuthUserDto = (user: User): AuthUserDto => ({
  id: user.id,
  name: user.name,
  email: user.email,
  role: user.role,
  createdAt: user.createdAt,
});
