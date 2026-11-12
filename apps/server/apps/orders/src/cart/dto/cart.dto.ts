import { ApiProperty } from "@nestjs/swagger";

export class CartLineDto {
  @ApiProperty()
  productId: string;

  @ApiProperty()
  name: string;

  @ApiProperty({ description: "Current price, smallest currency unit" })
  priceCents: number;

  @ApiProperty({ type: String, nullable: true })
  imageUrl: string | null;

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  stock: number;

  @ApiProperty({ description: "false when the product is no longer sold or has too little stock" })
  available: boolean;
}

export class CartDto {
  @ApiProperty({ type: [CartLineDto] })
  items: CartLineDto[];

  @ApiProperty({ description: "Sum of the available lines" })
  totalCents: number;
}
