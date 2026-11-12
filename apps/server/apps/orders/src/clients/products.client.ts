import { Inject, Injectable, ServiceUnavailableException } from "@nestjs/common";
import type { ClientProxy } from "@nestjs/microservices";
import {
  type GetProductsPayload,
  PATTERNS,
  PRODUCTS_SERVICE,
  type ProductSummary,
  type ReservedLine,
  type ReserveStockPayload,
  type ReserveStockReply,
  rpcErrorCode,
  rpcErrorMessage,
  type StockLine,
  type StockReleasedPayload,
} from "backend-common";
import { lastValueFrom, timeout } from "rxjs";

const REPLY_TIMEOUT_MS = 5000;

// Products refused the reservation (too little stock, product no longer sold); retrying will not help
export class OutOfStockError extends Error {}

// The products service over RabbitMQ
@Injectable()
export class ProductsClient {
  constructor(@Inject(PRODUCTS_SERVICE) private readonly client: ClientProxy) {}

  async summaries(ids: string[]): Promise<ProductSummary[]> {
    if (!ids.length) return [];
    try {
      const reply = this.client.send<ProductSummary[], GetProductsPayload>(PATTERNS.getProducts, { ids });
      return await lastValueFrom(reply.pipe(timeout(REPLY_TIMEOUT_MS)));
    } catch (error) {
      throw new ServiceUnavailableException(rpcErrorMessage(error, "The catalogue is unavailable, try again"));
    }
  }

  // Takes stock for every line; OutOfStockError when products refuses, ServiceUnavailableException on a fault (retry)
  async reserve(items: StockLine[]): Promise<ReservedLine[]> {
    try {
      const reply = this.client.send<ReserveStockReply, ReserveStockPayload>(PATTERNS.reserveStock, { items });
      return (await lastValueFrom(reply.pipe(timeout(REPLY_TIMEOUT_MS)))).items;
    } catch (error) {
      const message = rpcErrorMessage(error, "Could not reserve stock");
      if (rpcErrorCode(error) === "out_of_stock") throw new OutOfStockError(message);
      throw new ServiceUnavailableException(message);
    }
  }

  async release(payload: StockReleasedPayload): Promise<void> {
    await lastValueFrom(this.client.emit(PATTERNS.stockReleased, payload));
  }
}
