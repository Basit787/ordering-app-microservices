import { ApiProperty } from "@nestjs/swagger";

export class AuthUserDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty({ enum: ["user", "admin"] })
  role: "user" | "admin";

  @ApiProperty()
  createdAt: Date;
}
