import { ApiProperty } from "@nestjs/swagger";
import { AuthUserDto } from "./auth-user.dto";

export class SignInReplyDto {
  @ApiProperty({ type: AuthUserDto })
  user: AuthUserDto;

  @ApiProperty({ description: "JWT to send as Authorization: Bearer <token>" })
  token: string;

  @ApiProperty({ description: "Expiry in epoch milliseconds" })
  expiresAt: number;
}
