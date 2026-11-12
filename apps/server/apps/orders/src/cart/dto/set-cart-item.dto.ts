import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsMongoId, Max, Min } from "class-validator";

export class SetCartItemDto {
  @ApiProperty()
  @IsMongoId()
  productId: string;

  @ApiProperty({ description: "0 removes the line", minimum: 0, maximum: 99 })
  @IsInt()
  @Min(0)
  @Max(99)
  quantity: number;
}
