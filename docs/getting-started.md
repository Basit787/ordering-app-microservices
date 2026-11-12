# Getting started

## Run everything

```bash
make up        # builds the images, creates .env from .env.example, starts the stack
make down      # stops it
```

| What | URL |
| --- | --- |
| Landing page (entry point; sign in at `/sign-in`) | http://localhost:3000 |
| Shop | http://localhost:3002 |
| Orders (cart, checkout) | http://localhost:3003 |
| Admin | http://localhost:3004 |
| Swagger | http://localhost:3001/docs (auth), :3021/docs (products), :3022/docs (orders), :3023/docs (payments) |
| RabbitMQ UI | http://localhost:15672 (guest / guest) |

## Accounts

- Admin: `admin@oam.local` / `Admin123!` (from `ADMIN_*` in `.env`, created by the auth seed).
- Shoppers register on the landing app (`/sign-in`); one sign-in works in every app on the same host (token cookie).
- A sample catalogue (three categories, six products) is seeded on start; `make seed` runs both seeds again.

## Payments

Without Razorpay keys the payments service uses a mock gateway: orders up to `PAYMENT_LIMIT_CENTS` pay at once,
larger ones are declined. To pay through Razorpay (test mode), set `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET` and
`RAZORPAY_WEBHOOK_SECRET` in `.env` and run `make up`; see [payments flow](backend/payments/flow.md).

## Work on the code

```bash
pnpm install                  # one workspace, one lockfile
pnpm turbo run build          # shared packages first, then apps
make typecheck                # TypeScript everywhere
pnpm turbo run check          # Biome lint + format
```

Services run in watch mode inside Docker; edits under `apps/server/apps` and `apps/client/*` reload. After changing a
shared package, rebuild it (`pnpm turbo run build --filter=<package>`) and run `make up`.
