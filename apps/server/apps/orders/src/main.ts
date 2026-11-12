import { bootstrapService, ORDERS_SERVICE } from "backend-common";
import { AppModule } from "./app.module";

void bootstrapService(AppModule, {
  title: "Orders API",
  description: "Carts, checkout and order tracking for shoppers; every order and its fulfilment for admins.",
  queue: ORDERS_SERVICE,
});
