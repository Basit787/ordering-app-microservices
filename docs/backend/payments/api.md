# Payments service — API

Base URL `http://localhost:3023` (from a web app: `/payments-api`). Swagger UI at `http://localhost:3023/docs`, the spec in [`docs/api/payments.openapi.json`](../../api/payments.openapi.json) (`make api-docs` refreshes it). Protected routes take `Authorization: Bearer <token>` from `POST /auth/login`; errors are `{ error, details? }`.

## Endpoints

| Method | Path | Who | Body | Success |
| --- | --- | --- | --- | --- |
| GET | `/payments/orders/{orderId}` | signed in | — | 200 `PaymentDto` |
| POST | `/payments/orders/{orderId}/verify` | signed in | `VerifyPaymentDto` | 200 `PaymentDto` |
| GET | `/admin/payments` `?page?&pageSize?&status?` | admin | — | 200 |

## Schemas

- `RazorpayCheckoutDto` — `keyId`, `razorpayOrderId`, `amount`, `currency`
- `PaymentDto` — `id`, `orderId`, `userId`, `amountCents`, `currency`, `status`, `provider`, `razorpayPaymentId`, `failureReason`, `checkout`, `createdAt`
- `VerifyPaymentDto` — `razorpayOrderId`, `razorpayPaymentId`, `razorpaySignature`
