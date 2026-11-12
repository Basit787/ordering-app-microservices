import { Controller, Logger } from "@nestjs/common";
import { EventPattern, MessagePattern, Payload, RpcException } from "@nestjs/microservices";
import {
  AckMessage,
  type GetProductsPayload,
  PATTERNS,
  type ProductSummary,
  type ReserveStockPayload,
  type ReserveStockReply,
  type RpcErrorBody,
  type StockReleasedPayload,
} from "backend-common";
import { StockShortageError } from "./product.repository";
import { ProductsService } from "./products.service";

// RabbitMQ handlers on the products queue; @AckMessage acks each message after the handler, even when it throws
@Controller()
export class ProductsMessagesController {
  private readonly logger = new Logger(ProductsMessagesController.name);

  constructor(private readonly products: ProductsService) {}

  @AckMessage()
  @MessagePattern(PATTERNS.getProducts)
  getProducts(@Payload() { ids }: GetProductsPayload): Promise<ProductSummary[]> {
    return this.products.summaries(ids);
  }

  // A shortage is a refusal (out_of_stock, not retried); anything else is a fault the caller may retry
  @AckMessage()
  @MessagePattern(PATTERNS.reserveStock)
  async reserveStock(@Payload() { items }: ReserveStockPayload): Promise<ReserveStockReply> {
    try {
      return { items: await this.products.reserve(items) };
    } catch (error) {
      if (error instanceof StockShortageError) {
        throw new RpcException({ message: error.message, code: "out_of_stock" } satisfies RpcErrorBody);
      }
      this.logger.error("Stock reservation failed", error);
      throw new RpcException({ message: "Could not reserve stock", code: "unavailable" } satisfies RpcErrorBody);
    }
  }

  @AckMessage()
  @EventPattern(PATTERNS.stockReleased)
  stockReleased(@Payload() { items }: StockReleasedPayload) {
    return this.products.release(items);
  }
}
