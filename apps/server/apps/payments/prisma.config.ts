import { defineConfig } from "prisma/config";

// The service's own schema; DATABASE_URL comes from the environment (compose or the shell)
export default defineConfig({
  schema: "prisma/schema.prisma",
});
