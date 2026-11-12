import { Inject, Injectable } from "@nestjs/common";
import type { ClientProxy } from "@nestjs/microservices";
import { ORDERS_SERVICE, PATTERNS, type PaymentResultPayload } from "backend-common";
import { lastValueFrom } from "rxjs";

// Payment outcomes for the orders service
@Injectable()
export class OrdersClient {
  constructor(@Inject(ORDERS_SERVICE) private readonly client: ClientProxy) {}

  async paymentSucceeded(payload: PaymentResultPayload): Promise<void> {
    await lastValueFrom(this.client.emit(PATTERNS.paymentSucceeded, payload));
  }

  async paymentFailed(payload: PaymentResultPayload): Promise<void> {
    await lastValueFrom(this.client.emit(PATTERNS.paymentFailed, payload));
  }
}
