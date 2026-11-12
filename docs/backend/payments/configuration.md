# Payments service — configuration

Validated at start by `configSchema("payments", …)` in `src/app.module.ts`; compose sets them from `.env`.

- `PORT` — default `3023`
- `DATABASE_URL` — MongoDB `payments` database
- `RABBIT_MQ_URI`, `RABBIT_MQ_PAYMENTS_QUEUE`, `RABBIT_MQ_ORDERS_QUEUE`
- `REDIS_URL` — the `payments.charge` queue
- `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET` — both set → Razorpay, else mock
- `RAZORPAY_WEBHOOK_SECRET` — verifies `X-Razorpay-Signature`
- `PAYMENT_CURRENCY` — default `INR`
- `PAYMENT_LIMIT_CENTS` — mock gateway declines above it, default `10000000`
- `JWT_SECRET`, `CORS_ORIGIN` — as every service
