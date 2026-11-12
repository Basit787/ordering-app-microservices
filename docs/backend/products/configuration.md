# Products service — configuration

Validated at start by `configSchema("products", …)` in `src/app.module.ts`; compose sets them from `.env`.

- `PORT` — default `3021`
- `DATABASE_URL` — MongoDB `products` database
- `RABBIT_MQ_URI`, `RABBIT_MQ_PRODUCTS_QUEUE` (`products`)
- `S3_ENDPOINT`, `S3_REGION`, `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY`, `S3_BUCKET` (`products`) — empty endpoint disables uploads (503)
- `JWT_SECRET`, `CORS_ORIGIN` — as every service
