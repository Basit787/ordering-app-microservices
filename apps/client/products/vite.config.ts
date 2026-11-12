import { PORTS } from "ports";
import { defineAppConfig } from "vite-config";

export default defineAppConfig({
  port: PORTS.products.frontend,
  apis: ["products", "orders"],
});
