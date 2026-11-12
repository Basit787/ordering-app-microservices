import { ApiProperty } from "@nestjs/swagger";
import { IsIn } from "class-validator";

export class SetRoleDto {
  @ApiProperty({ enum: ["user", "admin"] })
  @IsIn(["user", "admin"])
  role: "user" | "admin";
}
