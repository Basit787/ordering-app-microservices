import { Body, Controller, Get, HttpCode, Param, Post, Query } from "@nestjs/common";
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { type AuthUser, CurrentUser, ParseObjectIdPipe } from "backend-common";
import { CheckoutDto } from "./dto/checkout.dto";
import { ListOrdersQueryDto } from "./dto/list-orders-query.dto";
import { OrderDto } from "./dto/order.dto";
import { OrdersService } from "./orders.service";

// The signed-in user's orders
@ApiTags("Orders")
@ApiBearerAuth()
@Controller("orders")
export class OrdersController {
  constructor(private readonly orders: OrdersService) {}

  @Post("checkout")
  @ApiCreatedResponse({ type: OrderDto })
  checkout(@CurrentUser() user: AuthUser, @Body() body: CheckoutDto): Promise<OrderDto> {
    return this.orders.checkout(user, body);
  }

  @Get()
  mine(@CurrentUser() user: AuthUser, @Query() query: ListOrdersQueryDto) {
    return this.orders.mine(user.id, query);
  }

  @Get(":id")
  @ApiOkResponse({ type: OrderDto })
  get(@CurrentUser() user: AuthUser, @Param("id", ParseObjectIdPipe) id: string): Promise<OrderDto> {
    return this.orders.get(user, id);
  }

  @Post(":id/cancel")
  @HttpCode(200)
  @ApiOkResponse({ type: OrderDto })
  cancel(@CurrentUser() user: AuthUser, @Param("id", ParseObjectIdPipe) id: string): Promise<OrderDto> {
    return this.orders.cancel(user, id);
  }
}
