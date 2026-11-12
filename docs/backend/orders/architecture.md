# Orders service — architecture

NestJS service on port `3022` (Swagger at `/docs`): carts, the queued checkout, order tracking and fulfilment. Consumes the `orders` RabbitMQ queue and runs two BullMQ queues.

## Layout

- `src/cart/` — `CartController` (`GET /cart`, `PUT /cart/items`, `DELETE /cart/items/:productId`, `DELETE /cart`), `CartService` (live prices from products, `restore`), `CartRepository`.
- `src/orders/` — `OrdersController` (checkout, mine, detail, cancel), `AdminOrdersController` (all orders, status), `OrdersMessagesController` (payment outcomes), `OrdersService` (checkout, the `orders.place` and `orders.expire-unpaid` workers, status changes), `OrderRepository`, `utils/status-transitions.ts`.
- `src/clients/` — `ProductsClient` (`get_products`, `reserve_stock`, `stock_released`), `PaymentsClient` (`order_placed`, `order_cancelled`).

## Statuses

`processing` → `pending_payment` | `rejected`; `pending_payment` → `paid` | `payment_failed` | `cancelled`;
`paid` → `shipped` | `cancelled`; `shipped` → `delivered`. Every change is conditional on the old status, so two
updates cannot both win. Shoppers may cancel `pending_payment` and `paid` orders; admins ship, deliver and cancel.

## Interfaces

- Endpoints: [api.md](api.md)
- Flow: [flow.md](flow.md)
- Data: [data-model.md](data-model.md)
- Environment: [configuration.md](configuration.md)
