import { ApiPropertyOptional } from "@nestjs/swagger";
import { PaginationQueryDto } from "backend-common";
import { IsIn, IsOptional } from "class-validator";
import { ORDER_STATUSES, type OrderStatusValue } from "./order.dto";

export class ListOrdersQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional({ enum: ORDER_STATUSES })
  @IsOptional()
  @IsIn(ORDER_STATUSES)
  status?: OrderStatusValue;
}
