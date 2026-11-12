import { Body, Controller, Get, HttpCode, Param, Post } from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { type AuthUser, CurrentUser, ParseObjectIdPipe } from "backend-common";
import { PaymentDto } from "./dto/payment.dto";
import { VerifyPaymentDto } from "./dto/verify-payment.dto";
import { PaymentsService } from "./payments.service";

@ApiTags("Payments")
@ApiBearerAuth()
@Controller("payments")
export class PaymentsController {
  constructor(private readonly payments: PaymentsService) {}

  @Get("orders/:orderId")
  @ApiOkResponse({ type: PaymentDto })
  forOrder(@CurrentUser() user: AuthUser, @Param("orderId", ParseObjectIdPipe) orderId: string): Promise<PaymentDto> {
    return this.payments.forOrder(user, orderId);
  }

  @Post("orders/:orderId/verify")
  @HttpCode(200)
  @ApiOkResponse({ type: PaymentDto })
  verify(
    @CurrentUser() user: AuthUser,
    @Param("orderId", ParseObjectIdPipe) orderId: string,
    @Body() body: VerifyPaymentDto,
  ): Promise<PaymentDto> {
    return this.payments.verify(user, orderId, body);
  }
}
