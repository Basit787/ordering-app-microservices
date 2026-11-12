import {
  type CanActivate,
  type ExecutionContext,
  ForbiddenException,
  Inject,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { IS_PUBLIC, ROLES } from "../decorators/metadata-keys.js";
import { bearerToken, verifyAccessToken } from "./access-token.js";
import type { AuthenticatedRequest, Role } from "./auth-user.js";

// Every HTTP route needs a valid bearer token unless marked @Public(); @Roles() narrows it to roles
@Injectable()
export class AuthGuard implements CanActivate {
  // Explicit token: this package is built without decorator metadata
  constructor(@Inject(Reflector) private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    if (context.getType() !== "http") return true;
    const targets = [context.getHandler(), context.getClass()];
    if (this.reflector.getAllAndOverride<boolean>(IS_PUBLIC, targets)) return true;

    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const token = bearerToken(request.headers.authorization);
    const user = token ? await verifyAccessToken(token) : null;
    if (!user) throw new UnauthorizedException("Authentication required");
    request.user = user;

    const roles = this.reflector.getAllAndOverride<Role[] | undefined>(ROLES, targets);
    if (roles && !roles.includes(user.role)) throw new ForbiddenException("Not allowed");
    return true;
  }
}
