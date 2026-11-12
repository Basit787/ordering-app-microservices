import { Controller } from "@nestjs/common";
import { EventPattern, Payload } from "@nestjs/microservices";
import { AckMessage, type OrderCancelledPayload, type OrderPlacedPayload, PATTERNS } from "backend-common";
import { PaymentsService } from "./payments.service";

// Order events on the payments queue; @AckMessage acks each one after the handler, even when it throws
@Controller()
export class PaymentsMessagesController {
  constructor(private readonly payments: PaymentsService) {}

  // Queued, not charged here: the charge job retries when Razorpay is briefly unreachable
  @AckMessage()
  @EventPattern(PATTERNS.orderPlaced)
  orderPlaced(@Payload() payload: OrderPlacedPayload) {
    return this.payments.queueCharge(payload);
  }

  @AckMessage()
  @EventPattern(PATTERNS.orderCancelled)
  orderCancelled(@Payload() { orderId }: OrderCancelledPayload) {
    return this.payments.refund(orderId);
  }
}
