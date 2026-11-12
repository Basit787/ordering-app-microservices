import { Logger, type Type } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { HttpAdapterHost, NestFactory } from "@nestjs/core";
import { corsOriginCallback } from "../cors/cors.js";
import { localAppOrigins } from "../cors/local-app-origins.js";
import { ApiExceptionFilter } from "../errors/api-exception.filter.js";
import { httpValidationPipe } from "../errors/validation.pipe.js";
import { RmqService } from "../rmq/rmq.service.js";
import { securityHeaders } from "./security-headers.js";
import { setupSwagger } from "./swagger.js";

export interface ServiceOptions {
  title: string;
  description: string;
  // This service's own RabbitMQ queue (RABBIT_MQ_<queue>_QUEUE); omit for HTTP-only services
  queue?: string;
}

// Starts one service: security headers, CORS, validation, `{ error }` bodies, Swagger at /docs, its queue, then HTTP
export const bootstrapService = async (module: Type<unknown>, { title, description, queue }: ServiceOptions) => {
  // rawBody keeps the request bytes for webhook signatures (req.rawBody)
  const app = await NestFactory.create(module, { rawBody: true });
  const config = app.get(ConfigService);

  app.use(securityHeaders());
  app.enableCors({
    origin: corsOriginCallback({
      corsOrigin: config.get<string>("CORS_ORIGIN")?.split(",") ?? localAppOrigins(),
      allowLanOrigins: config.get<string>("NODE_ENV") !== "production",
      mobileAppOrigin: "",
    }),
  });
  app.useGlobalPipes(httpValidationPipe());
  app.useGlobalFilters(new ApiExceptionFilter(app.get(HttpAdapterHost)));
  app.enableShutdownHooks();
  setupSwagger(app, { title, description });

  if (queue) {
    app.connectMicroservice(app.get(RmqService).getOptions(queue));
    await app.startAllMicroservices();
  }

  const port = config.getOrThrow<number>("PORT");
  await app.listen(port);
  Logger.log(`${title} on http://localhost:${port} (docs at /docs)`, "Bootstrap");
};
