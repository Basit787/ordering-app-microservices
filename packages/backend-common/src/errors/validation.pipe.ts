import { BadRequestException, type ValidationError, ValidationPipe } from "@nestjs/common";

// 400 `{ error: "Invalid request", details: { field: [messages] } }` for invalid DTOs
export const httpValidationPipe = () =>
  new ValidationPipe({
    whitelist: true,
    transform: true,
    exceptionFactory: (errors: ValidationError[]) => {
      const details = Object.fromEntries(errors.map((e) => [e.property, Object.values(e.constraints ?? {})]));
      return new BadRequestException({ error: "Invalid request", details });
    },
  });
