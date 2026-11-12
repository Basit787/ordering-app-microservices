import { Body, Controller, Get, HttpCode, Post } from "@nestjs/common";
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { type AuthUser, CurrentUser, Public } from "backend-common";
import { AuthService } from "./auth.service";
import { AuthUserDto } from "./dto/auth-user.dto";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";
import { SignInReplyDto } from "./dto/sign-in-reply.dto";

// Sign-in for every app: register or log in for a JWT, then send it as "Authorization: Bearer <token>"
@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Public()
  @Post("register")
  @ApiCreatedResponse({ type: SignInReplyDto })
  register(@Body() body: RegisterDto): Promise<SignInReplyDto> {
    return this.auth.register(body);
  }

  @Public()
  @Post("login")
  @HttpCode(200)
  @ApiOkResponse({ type: SignInReplyDto })
  login(@Body() body: LoginDto): Promise<SignInReplyDto> {
    return this.auth.login(body);
  }

  @Get("me")
  @ApiBearerAuth()
  @ApiOkResponse({ type: AuthUserDto })
  me(@CurrentUser() user: AuthUser): Promise<AuthUserDto> {
    return this.auth.me(user.id);
  }
}
