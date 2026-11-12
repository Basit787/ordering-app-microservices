import { ApiProperty } from "@nestjs/swagger";
import { IsIn } from "class-validator";

export const ADMIN_STATUSES = ["shipped", "delivered", "cancelled"] as const;

export class UpdateOrderStatusDto {
  @ApiProperty({ enum: ADMIN_STATUSES })
  @IsIn(ADMIN_STATUSES)
  status: (typeof ADMIN_STATUSES)[number];
}
