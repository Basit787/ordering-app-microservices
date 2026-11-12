# Products service — data model

MongoDB through Prisma 6 (`prisma/schema.prisma`, client in `node_modules/@prisma-db/products`); `prisma db push` syncs indexes (no migrations on MongoDB).

`categories` (database `products`): `id`, `name`, `slug` (unique), timestamps.

`products`:

| Field | Type | Notes |
| --- | --- | --- |
| `id` | ObjectId | |
| `name`, `slug` | string | slug unique, kept on rename |
| `description` | string | |
| `priceCents` | int | paise; orders copy it at checkout |
| `stock` | int | |
| `imageUrl` | string? | external picture |
| `imageKey` | string? | S3 key of the uploaded picture (wins over `imageUrl`) |
| `active` | bool | false hides it from the shop |
| `categoryId` | ObjectId? | `SetNull` when the category is deleted |
