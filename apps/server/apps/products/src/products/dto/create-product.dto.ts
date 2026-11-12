import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsBoolean, IsInt, IsMongoId, IsOptional, IsString, IsUrl, MaxLength, Min, MinLength } from "class-validator";

export class CreateProductDto {
  @ApiProperty({ example: "Blue cotton T-shirt" })
  @IsString()
  @MinLength(1)
  @MaxLength(120)
  name: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(4000)
  description?: string;

  @ApiProperty({ description: "Smallest currency unit (paise)", example: 49900 })
  @IsInt()
  @Min(0)
  priceCents: number;

  @ApiProperty({ example: 25 })
  @IsInt()
  @Min(0)
  stock: number;

  @ApiPropertyOptional({ type: String, nullable: true })
  @IsOptional()
  @IsUrl()
  imageUrl?: string | null;

  @ApiPropertyOptional({ type: String, nullable: true, description: "null removes the category" })
  @IsOptional()
  @IsMongoId()
  categoryId?: string | null;

  @ApiPropertyOptional({ default: true })
  @IsOptional()
  @IsBoolean()
  active?: boolean;
}
