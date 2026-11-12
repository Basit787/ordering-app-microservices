# Orders service — data model

MongoDB through Prisma 6 (`prisma/schema.prisma`, client in `node_modules/@prisma-db/orders`); `prisma db push` syncs indexes (no migrations on MongoDB).

`carts` (database `orders`): `userId` (unique), `items[] { productId, quantity }`.

`orders`:

| Field | Type | Notes |
| --- | --- | --- |
| `id`, `userId` | ObjectId | |
| `userName` | string | from the token |
| `items[]` | `{ productId, name, priceCents, quantity }` | copied when placed |
| `totalCents` | int | |
| `status` | `processing` … `cancelled` | see statuses |
| `shippingAddress` | `{ fullName, phone, line1, line2?, city, state, postalCode, country }` | |
| `paymentId` | ObjectId? | set by payment events |
| `failureReason` | string? | rejected, declined or expired |
