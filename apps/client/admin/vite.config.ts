import { PORTS } from "ports";
import { defineAppConfig } from "vite-config";

export default defineAppConfig({
  port: PORTS.admin.frontend,
  apis: ["products", "orders", "payments"],
});
