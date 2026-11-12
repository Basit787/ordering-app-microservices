import { bootstrapService, PRODUCTS_SERVICE } from "backend-common";
import { AppModule } from "./app.module";

void bootstrapService(AppModule, {
  title: "Products API",
  description: "The catalogue: public browsing, admin management of products and categories, and stock for orders.",
  queue: PRODUCTS_SERVICE,
});
