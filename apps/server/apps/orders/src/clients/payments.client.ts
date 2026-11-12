import { Inject, Injectable } from "@nestjs/common";
import type { ClientProxy } from "@nestjs/microservices";
import { type OrderCancelledPayload, type OrderPlacedPayload, PATTERNS, PAYMENTS_SERVICE } from "backend-common";
import { lastValueFrom } from "rxjs";

// Events for the payments service
@Injectable()
export class PaymentsClient {
  constructor(@Inject(PAYMENTS_SERVICE) private readonly client: ClientProxy) {}

  async orderPlaced(payload: OrderPlacedPayload): Promise<void> {
    await lastValueFrom(this.client.emit(PATTERNS.orderPlaced, payload));
  }

  async orderCancelled(payload: OrderCancelledPayload): Promise<void> {
    await lastValueFrom(this.client.emit(PATTERNS.orderCancelled, payload));
  }
}
