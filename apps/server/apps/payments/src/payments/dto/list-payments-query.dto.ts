import { ApiPropertyOptional } from "@nestjs/swagger";
import { PaginationQueryDto } from "backend-common";
import { IsIn, IsOptional } from "class-validator";
import { PAYMENT_STATUSES } from "./payment.dto";

export class ListPaymentsQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional({ enum: PAYMENT_STATUSES })
  @IsOptional()
  @IsIn(PAYMENT_STATUSES)
  status?: (typeof PAYMENT_STATUSES)[number];
}
