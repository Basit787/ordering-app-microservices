import { PORTS } from "ports";
import { defineAppConfig } from "vite-config";

export default defineAppConfig({
  port: PORTS.orders.frontend,
  apis: ["orders", "products", "payments"],
});
