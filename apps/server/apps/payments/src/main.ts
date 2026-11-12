import { bootstrapService, PAYMENTS_SERVICE } from "backend-common";
import { AppModule } from "./app.module";

void bootstrapService(AppModule, {
  title: "Payments API",
  description:
    "Charges each new order through a mock gateway, refunds cancelled orders, and lists payments for admins.",
  queue: PAYMENTS_SERVICE,
});
