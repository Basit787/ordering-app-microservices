import { ApiPropertyOptional } from "@nestjs/swagger";
import { PaginationQueryDto } from "backend-common";
import { IsMongoId, IsOptional, IsString, MaxLength } from "class-validator";

export class ListProductsQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional({ description: "Matches the name, ignoring case" })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  search?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsMongoId()
  categoryId?: string;
}
