import { ConflictException, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import type { User } from "@prisma-db/auth";
import { signAccessToken } from "backend-common";
import { UserRepository } from "../users/user.repository";
import { AuthUserDto } from "./dto/auth-user.dto";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";
import { SignInReplyDto } from "./dto/sign-in-reply.dto";
import { hashPassword } from "./utils/hash-password";
import { toAuthUserDto } from "./utils/to-auth-user-dto";
import { verifyPassword } from "./utils/verify-password";

// One message for an unknown email and a wrong password, so neither can be probed
const invalidCredentials = () => new UnauthorizedException("Invalid email or password");

@Injectable()
export class AuthService {
  constructor(
    private readonly users: UserRepository,
    private readonly config: ConfigService,
  ) {}

  async register({ name, email, password }: RegisterDto): Promise<SignInReplyDto> {
    if (await this.users.findByEmail(email)) throw new ConflictException("An account with this email already exists");
    const user = await this.users.create({
      name: name.trim(),
      email,
      passwordHash: await hashPassword(password),
      role: "user",
    });
    return this.signIn(user);
  }

  async login({ email, password }: LoginDto): Promise<SignInReplyDto> {
    const user = await this.users.findByEmail(email);
    if (!user) {
      // Same work as a real check, so an unknown email answers as slowly as a wrong password
      await hashPassword(password);
      throw invalidCredentials();
    }
    if (!(await verifyPassword(password, user.passwordHash))) throw invalidCredentials();
    return this.signIn(user);
  }

  // The account behind a verified token; gone means signed out
  async me(userId: string): Promise<AuthUserDto> {
    const user = await this.users.findById(userId);
    if (!user) throw new UnauthorizedException("Authentication required");
    return toAuthUserDto(user);
  }

  private async signIn(user: User): Promise<SignInReplyDto> {
    const dto = toAuthUserDto(user);
    const { token, expiresAt } = await signAccessToken(
      { id: dto.id, username: dto.name, email: dto.email, role: dto.role },
      this.config.getOrThrow<number>("JWT_TTL_SECONDS"),
    );
    return { user: dto, token, expiresAt };
  }
}
