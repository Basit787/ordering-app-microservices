import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

// Swagger shapes; explicit `type`s because this package is built without decorator metadata
export class ErrorResponseDto {
  @ApiProperty({ type: String, example: "Authentication required" })
  error!: string;

  @ApiPropertyOptional({ type: "object", additionalProperties: { type: "array", items: { type: "string" } } })
  details?: Record<string, string[]>;
}

export class OkResponseDto {
  @ApiProperty({ type: Boolean, example: true })
  ok!: true;
}
