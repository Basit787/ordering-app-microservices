import { Controller } from "@nestjs/common";
import { EventPattern, Payload } from "@nestjs/microservices";
import { AckMessage, PATTERNS, type PaymentResultPayload } from "backend-common";
import { OrdersService } from "./orders.service";

// Payment outcomes on the orders queue; @AckMessage acks each one after the handler, even when it throws
@Controller()
export class OrdersMessagesController {
  constructor(private readonly orders: OrdersService) {}

  @AckMessage()
  @EventPattern(PATTERNS.paymentSucceeded)
  paymentSucceeded(@Payload() payload: PaymentResultPayload) {
    return this.orders.paymentSucceeded(payload);
  }

  @AckMessage()
  @EventPattern(PATTERNS.paymentFailed)
  paymentFailed(@Payload() payload: PaymentResultPayload) {
    return this.orders.paymentFailed(payload);
  }
}
