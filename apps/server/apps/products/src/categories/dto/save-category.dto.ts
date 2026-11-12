import { ApiProperty } from "@nestjs/swagger";
import { IsString, MaxLength, MinLength } from "class-validator";

export class SaveCategoryDto {
  @ApiProperty({ example: "T-shirts" })
  @IsString()
  @MinLength(1)
  @MaxLength(64)
  name: string;
}
