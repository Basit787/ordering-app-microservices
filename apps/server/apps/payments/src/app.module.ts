import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PrismaClient } from "@prisma-db/payments";
import {
  configSchema,
  databaseUrl,
  JwtAuthModule,
  ORDERS_SERVICE,
  PrismaModule,
  queueName,
  RmqModule,
  rabbitMqUri,
} from "backend-common";
import joi from "joi";
import { OrdersClient } from "./clients/orders.client";
import { RazorpayGateway } from "./gateway/razorpay.gateway";
import { AdminPaymentsController } from "./payments/admin-payments.controller";
import { PaymentRepository } from "./payments/payment.repository";
import { PaymentsController } from "./payments/payments.controller";
import { PaymentsMessagesController } from "./payments/payments.messages.controller";
import { PaymentsService } from "./payments/payments.service";
import { RazorpayWebhookController } from "./payments/razorpay-webhook.controller";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: "apps/payments/.env",
      validationSchema: configSchema("payments", {
        DATABASE_URL: databaseUrl("payments"),
        RABBIT_MQ_URI: rabbitMqUri(),
        // BullMQ queues on Redis
        REDIS_URL: joi.string().default("redis://localhost:6379"),

        RABBIT_MQ_PAYMENTS_QUEUE: queueName("payments"),
        RABBIT_MQ_ORDERS_QUEUE: queueName("orders"),
        PAYMENT_CURRENCY: joi.string().length(3).default("INR"),
        // Razorpay is used when both keys are set; otherwise the mock gateway
        RAZORPAY_KEY_ID: joi.string().allow("").default(""),
        RAZORPAY_KEY_SECRET: joi.string().allow("").default(""),
        RAZORPAY_WEBHOOK_SECRET: joi.string().allow("").default(""),
        // ₹1,00,000 in paise; the mock gateway declines anything above it
        PAYMENT_LIMIT_CENTS: joi.number().integer().min(0).default(10_000_000),
      }),
    }),
    JwtAuthModule,
    PrismaModule.forRoot(PrismaClient),
    RmqModule.register({ name: ORDERS_SERVICE }),
  ],
  controllers: [PaymentsController, AdminPaymentsController, PaymentsMessagesController, RazorpayWebhookController],
  providers: [PaymentsService, PaymentRepository, OrdersClient, RazorpayGateway],
})
export class AppModule {}
