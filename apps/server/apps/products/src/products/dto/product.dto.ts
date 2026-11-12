import { ApiProperty } from "@nestjs/swagger";
import { CategoryDto } from "../../categories/dto/category.dto";

export class ProductDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  slug: string;

  @ApiProperty()
  description: string;

  @ApiProperty({ description: "Smallest currency unit (paise)" })
  priceCents: number;

  @ApiProperty()
  stock: number;

  @ApiProperty({ type: String, nullable: true })
  imageUrl: string | null;

  @ApiProperty()
  active: boolean;

  @ApiProperty({ type: CategoryDto, nullable: true })
  category: CategoryDto | null;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
