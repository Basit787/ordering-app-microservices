# Payments service — flow

1. **Charge** — `order_placed` queues `payments.charge` (job id = order id). The worker opens a Razorpay order and stores the payment as `created` (or, mock, `succeeded` / `failed` and reports it).
2. **Checkout** — the orders app reads `GET /payments/orders/:id` (its `checkout` field has `keyId`, `razorpayOrderId`, `amount`, `currency`), opens Razorpay Checkout, then posts the three values to `/verify`.
3. **Verify** — HMAC-SHA256 of `order_id|payment_id` with the key secret must match; the payment becomes `succeeded` and `payment_succeeded` goes to orders.
4. **Webhook** — `payment.captured` settles a payment the browser never reported; `payment.failed` records the reason and keeps it open for a retry. Point Razorpay at `/payments/razorpay/webhook` with the events `payment.captured` and `payment.failed`.
5. **Refund** — `order_cancelled` refunds a succeeded payment through Razorpay (status `refunded`) or closes an unpaid one (`failed`).
