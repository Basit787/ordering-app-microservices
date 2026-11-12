import type { IncomingMessage, ServerResponse } from "node:http";
import { Injectable, Logger, type NestMiddleware } from "@nestjs/common";

// One log line per request once the reply is sent: method, path, status and duration
@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger("HTTP");

  use(request: IncomingMessage, response: ServerResponse, next: () => void) {
    const started = Date.now();
    response.on("finish", () => {
      const line = `${request.method} ${request.url} ${response.statusCode} ${Date.now() - started}ms`;
      if (response.statusCode >= 500) this.logger.error(line);
      else if (response.statusCode >= 400) this.logger.warn(line);
      else this.logger.log(line);
    });
    next();
  }
}
