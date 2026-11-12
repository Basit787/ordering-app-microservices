# Payments service — architecture

NestJS service on port `3023` (Swagger at `/docs`): Razorpay payments (or a mock gateway without keys), Checkout verification, webhooks and refunds. Consumes the `payments` RabbitMQ queue and runs the `payments.charge` BullMQ queue.

## Layout

- `src/payments/` — `PaymentsController` (`GET /payments/orders/:orderId`, `POST /payments/orders/:orderId/verify`), `AdminPaymentsController` (`GET /admin/payments`), `RazorpayWebhookController` (`POST /payments/razorpay/webhook`, public, signature-checked), `PaymentsMessagesController` (`order_placed`, `order_cancelled`), `PaymentsService` (charge worker, verify, webhook, refund), `PaymentRepository`.
- `src/gateway/razorpay.gateway.ts` — Orders and Refunds APIs, HMAC checks for Checkout and webhooks.
- `src/clients/orders.client.ts` — `payment_succeeded`, `payment_failed`.

## Gateways

- **Razorpay** when `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` are set: a Razorpay order per order (`receipt` = our order id); the payment stays `created` until Checkout or the webhook confirms it.
- **Mock** otherwise: decided at once, declined above `PAYMENT_LIMIT_CENTS`.

## Interfaces

- Endpoints: [api.md](api.md)
- Flow: [flow.md](flow.md)
- Data: [data-model.md](data-model.md)
- Environment: [configuration.md](configuration.md)
