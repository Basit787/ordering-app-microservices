import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class AddressDto {
  @ApiProperty()
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  fullName: string;

  @ApiProperty()
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  phone: string;

  @ApiProperty()
  @IsString()
  @MinLength(1)
  @MaxLength(200)
  line1: string;

  @ApiPropertyOptional({ type: String, nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  line2?: string | null;

  @ApiProperty()
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  city: string;

  @ApiProperty()
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  state: string;

  @ApiProperty()
  @IsString()
  @MinLength(3)
  @MaxLength(12)
  postalCode: string;

  @ApiProperty({ example: "India" })
  @IsString()
  @MinLength(2)
  @MaxLength(60)
  country: string;
}
