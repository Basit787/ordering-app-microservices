# Orders service — API

Base URL `http://localhost:3022` (from a web app: `/orders-api`). Swagger UI at `http://localhost:3022/docs`, the spec in [`docs/api/orders.openapi.json`](../../api/orders.openapi.json) (`make api-docs` refreshes it). Protected routes take `Authorization: Bearer <token>` from `POST /auth/login`; errors are `{ error, details? }`.

## Endpoints

| Method | Path | Who | Body | Success |
| --- | --- | --- | --- | --- |
| GET | `/cart` | signed in | — | 200 `CartDto` |
| DELETE | `/cart` | signed in | — | 204 |
| PUT | `/cart/items` | signed in | `SetCartItemDto` | 200 `CartDto` |
| DELETE | `/cart/items/{productId}` | signed in | — | 200 `CartDto` |
| POST | `/orders/checkout` | signed in | `CheckoutDto` | 201 `OrderDto` |
| GET | `/orders` `?page?&pageSize?&status?` | signed in | — | 200 |
| GET | `/orders/{id}` | signed in | — | 200 `OrderDto` |
| POST | `/orders/{id}/cancel` | signed in | — | 200 `OrderDto` |
| GET | `/admin/orders` `?page?&pageSize?&status?` | admin | — | 200 |
| PATCH | `/admin/orders/{id}/status` | admin | `UpdateOrderStatusDto` | 200 `OrderDto` |

## Schemas

- `CartLineDto` — `productId`, `name`, `priceCents`, `imageUrl`, `quantity`, `stock`, `available`
- `CartDto` — `items`, `totalCents`
- `SetCartItemDto` — `productId`, `quantity`
- `AddressDto` — `fullName`, `phone`, `line1`, `line2`?, `city`, `state`, `postalCode`, `country`
- `CheckoutDto` — `shippingAddress`
- `OrderItemDto` — `productId`, `name`, `priceCents`, `quantity`
- `OrderDto` — `id`, `userId`, `userName`, `items`, `totalCents`, `status`, `shippingAddress`, `paymentId`, `failureReason`, `createdAt`, `updatedAt`
- `UpdateOrderStatusDto` — `status`
