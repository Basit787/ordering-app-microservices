# Orders service — flow

See [events and queues](../../events-and-queues.md) for the diagram.

1. **Cart** — `PUT /cart/items` sets a quantity after checking the product is sold and in stock.
2. **Checkout** — `POST /orders/checkout` records the order as `processing` with the current names and prices, empties the cart and adds an `orders.place` job; it answers at once.
3. **Place** — the worker reserves stock (`reserve_stock`), stores the reserved prices, moves to `pending_payment`, emits `order_placed` and schedules `orders.expire-unpaid`. Out of stock → `rejected`, items back in the cart.
4. **Pay** — `payment_succeeded` → `paid` (expiry job removed); `payment_failed` → `payment_failed` and `stock_released`.
5. **Expire** — still unpaid after `PAYMENT_TIMEOUT_MINUTES` → `cancelled` ("Not paid within … minutes").
6. **Cancel** — stock back (`stock_released`) and `order_cancelled`, so payments refunds or closes the payment.
