import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MulterModule } from "@nestjs/platform-express";
import { PrismaClient } from "@prisma-db/products";
import {
  configSchema,
  createUploadOptions,
  databaseUrl,
  JwtAuthModule,
  ObjectStorageModule,
  PrismaModule,
  queueName,
  RmqModule,
  rabbitMqUri,
} from "backend-common";
import joi from "joi";
import { AdminCategoriesController } from "./categories/admin-categories.controller";
import { CategoriesController } from "./categories/categories.controller";
import { CategoriesService } from "./categories/categories.service";
import { CategoryRepository } from "./categories/category.repository";
import { AdminProductsController } from "./products/admin-products.controller";
import { ProductRepository } from "./products/product.repository";
import { ProductsController } from "./products/products.controller";
import { ProductsMessagesController } from "./products/products.messages.controller";
import { ProductsService } from "./products/products.service";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: "apps/products/.env",
      validationSchema: configSchema("products", {
        DATABASE_URL: databaseUrl("products"),
        RABBIT_MQ_URI: rabbitMqUri(),
        RABBIT_MQ_PRODUCTS_QUEUE: queueName("products"),
        // Any S3-compatible store; empty S3_ENDPOINT starts without uploads (they answer 503)
        S3_ENDPOINT: joi.string().allow("").default(""),
        S3_REGION: joi.string().default("us-east-1"),
        S3_ACCESS_KEY_ID: joi.string().default("test"),
        S3_SECRET_ACCESS_KEY: joi.string().default("test"),
        S3_BUCKET: joi.string().default("products"),
      }),
    }),
    JwtAuthModule,
    PrismaModule.forRoot(PrismaClient),
    RmqModule,
    ObjectStorageModule.forRoot({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        endpoint: config.getOrThrow<string>("S3_ENDPOINT"),
        region: config.getOrThrow<string>("S3_REGION"),
        accessKey: config.getOrThrow<string>("S3_ACCESS_KEY_ID"),
        secretKey: config.getOrThrow<string>("S3_SECRET_ACCESS_KEY"),
        bucket: config.getOrThrow<string>("S3_BUCKET"),
      }),
    }),
    // Product pictures: images only, up to 5 MB, kept in memory until they go to S3
    MulterModule.register(createUploadOptions({ maxFileSizeMb: 5, imagesOnly: true })),
  ],
  controllers: [
    CategoriesController,
    AdminCategoriesController,
    ProductsController,
    AdminProductsController,
    ProductsMessagesController,
  ],
  providers: [CategoriesService, CategoryRepository, ProductsService, ProductRepository],
})
export class AppModule {}
