import { defineConfig } from "prisma/config";

// The service's own schema and seed; DATABASE_URL comes from the environment (compose or the shell).
// MongoDB has no Prisma migrations: `prisma db push` syncs the indexes instead
export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: { seed: "ts-node --transpile-only apps/auth/prisma/seed.ts" },
});
