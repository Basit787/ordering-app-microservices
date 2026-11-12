import { Body, Controller, Get, Param, Patch, Query } from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { ParseObjectIdPipe, Roles } from "backend-common";
import { ListOrdersQueryDto } from "./dto/list-orders-query.dto";
import { OrderDto } from "./dto/order.dto";
import { UpdateOrderStatusDto } from "./dto/update-order-status.dto";
import { OrdersService } from "./orders.service";

// Every order, and the fulfilment steps: ship, deliver, cancel
@ApiTags("Admin: orders")
@ApiBearerAuth()
@Roles("admin")
@Controller("admin/orders")
export class AdminOrdersController {
  constructor(private readonly orders: OrdersService) {}

  @Get()
  list(@Query() query: ListOrdersQueryDto) {
    return this.orders.all(query);
  }

  @Patch(":id/status")
  @ApiOkResponse({ type: OrderDto })
  setStatus(@Param("id", ParseObjectIdPipe) id: string, @Body() { status }: UpdateOrderStatusDto): Promise<OrderDto> {
    return this.orders.setStatus(id, status);
  }
}
