import { Controller, Headers, HttpCode, Post, type RawBodyRequest, Req } from "@nestjs/common";
import { ApiExcludeController } from "@nestjs/swagger";
import { Public } from "backend-common";
import type { Request } from "express";
import { PaymentsService } from "./payments.service";

// Razorpay calls this; the X-Razorpay-Signature header, not a JWT, authenticates it
@ApiExcludeController()
@Public()
@Controller("payments/razorpay")
export class RazorpayWebhookController {
  constructor(private readonly payments: PaymentsService) {}

  @Post("webhook")
  @HttpCode(200)
  async webhook(@Req() request: RawBodyRequest<Request>, @Headers("x-razorpay-signature") signature?: string) {
    await this.payments.webhook(request.rawBody, signature);
    return { ok: true };
  }
}
