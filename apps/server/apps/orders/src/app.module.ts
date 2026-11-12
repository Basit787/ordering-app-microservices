import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PrismaClient } from "@prisma-db/orders";
import {
  configSchema,
  databaseUrl,
  JwtAuthModule,
  PAYMENTS_SERVICE,
  PRODUCTS_SERVICE,
  PrismaModule,
  queueName,
  RmqModule,
  rabbitMqUri,
} from "backend-common";
import joi from "joi";
import { CartController } from "./cart/cart.controller";
import { CartRepository } from "./cart/cart.repository";
import { CartService } from "./cart/cart.service";
import { PaymentsClient } from "./clients/payments.client";
import { ProductsClient } from "./clients/products.client";
import { AdminOrdersController } from "./orders/admin-orders.controller";
import { OrderRepository } from "./orders/order.repository";
import { OrdersController } from "./orders/orders.controller";
import { OrdersMessagesController } from "./orders/orders.messages.controller";
import { OrdersService } from "./orders/orders.service";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: "apps/orders/.env",
      validationSchema: configSchema("orders", {
        DATABASE_URL: databaseUrl("orders"),
        RABBIT_MQ_URI: rabbitMqUri(),
        // BullMQ queues on Redis
        REDIS_URL: joi.string().default("redis://localhost:6379"),
        // Unpaid orders are cancelled after this long (the expire-unpaid job)
        PAYMENT_TIMEOUT_MINUTES: joi.number().integer().min(1).default(30),

        RABBIT_MQ_ORDERS_QUEUE: queueName("orders"),
        RABBIT_MQ_PRODUCTS_QUEUE: queueName("products"),
        RABBIT_MQ_PAYMENTS_QUEUE: queueName("payments"),
      }),
    }),
    JwtAuthModule,
    PrismaModule.forRoot(PrismaClient),
    RmqModule.register({ name: PRODUCTS_SERVICE }),
    RmqModule.register({ name: PAYMENTS_SERVICE }),
  ],
  controllers: [CartController, OrdersController, AdminOrdersController, OrdersMessagesController],
  providers: [CartService, CartRepository, OrdersService, OrderRepository, ProductsClient, PaymentsClient],
})
export class AppModule {}
