# Orders service — configuration

Validated at start by `configSchema("orders", …)` in `src/app.module.ts`; compose sets them from `.env`.

- `PORT` — default `3022`
- `DATABASE_URL` — MongoDB `orders` database
- `RABBIT_MQ_URI`, `RABBIT_MQ_ORDERS_QUEUE`, `RABBIT_MQ_PRODUCTS_QUEUE`, `RABBIT_MQ_PAYMENTS_QUEUE`
- `REDIS_URL` — BullMQ queues, default `redis://localhost:6379`
- `PAYMENT_TIMEOUT_MINUTES` — unpaid orders are cancelled after this, default `30`
- `JWT_SECRET`, `CORS_ORIGIN` — as every service
