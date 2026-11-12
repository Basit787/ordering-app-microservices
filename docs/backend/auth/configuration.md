# Auth service — configuration

Validated at start by `configSchema("auth", …)` in `src/app.module.ts`; compose sets them from `.env`.

- `PORT` — default `3001`
- `DATABASE_URL` — MongoDB `auth` database (replica set)
- `JWT_SECRET` — signs tokens; every service needs the same value (dev default `dev-secret-change-me`)
- `JWT_TTL_SECONDS` — sign-in lifetime, default `86400`
- `ADMIN_NAME`, `ADMIN_EMAIL`, `ADMIN_PASSWORD` — the seeded admin (read by `prisma/seed.ts`)
- `CORS_ORIGIN` — comma-separated origins; default every web app on localhost
