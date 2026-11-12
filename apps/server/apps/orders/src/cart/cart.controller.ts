import { Body, Controller, Delete, Get, HttpCode, Param, Put } from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { type AuthUser, CurrentUser, ParseObjectIdPipe } from "backend-common";
import { CartService } from "./cart.service";
import { CartDto } from "./dto/cart.dto";
import { SetCartItemDto } from "./dto/set-cart-item.dto";

// The signed-in user's cart
@ApiTags("Cart")
@ApiBearerAuth()
@Controller("cart")
export class CartController {
  constructor(private readonly cart: CartService) {}

  @Get()
  @ApiOkResponse({ type: CartDto })
  get(@CurrentUser() user: AuthUser): Promise<CartDto> {
    return this.cart.get(user.id);
  }

  @Put("items")
  @ApiOkResponse({ type: CartDto })
  setItem(@CurrentUser() user: AuthUser, @Body() body: SetCartItemDto): Promise<CartDto> {
    return this.cart.setItem(user.id, body);
  }

  @Delete("items/:productId")
  @ApiOkResponse({ type: CartDto })
  removeItem(
    @CurrentUser() user: AuthUser,
    @Param("productId", ParseObjectIdPipe) productId: string,
  ): Promise<CartDto> {
    return this.cart.setItem(user.id, { productId, quantity: 0 });
  }

  @Delete()
  @HttpCode(204)
  clear(@CurrentUser() user: AuthUser): Promise<void> {
    return this.cart.clear(user.id);
  }
}
