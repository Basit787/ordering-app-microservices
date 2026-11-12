import { PORTS } from "ports";
import { defineAppConfig } from "vite-config";

export default defineAppConfig({
  port: PORTS.auth.frontend,
  // The landing page shows categories and featured products
  apis: ["products"],
});
