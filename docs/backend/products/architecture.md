# Products service — architecture

NestJS service on port `3021` (Swagger at `/docs`): the catalogue, categories, stock and product images. Consumes the `products` RabbitMQ queue.

## Layout

- `src/products/` — `ProductsController` (public `GET /products`, `GET /products/:id`, `GET /products/:id/image`), `AdminProductsController` (CRUD, image upload/remove), `ProductsMessagesController` (`get_products`, `reserve_stock`, `stock_released`), `ProductsService`, `ProductRepository` (stock reservation in a transaction).
- `src/categories/` — public `GET /categories`, `AdminCategoriesController` (create, rename, delete), service, repository.
- `src/utils/slugify.ts`; `prisma/` schema, `seed.ts` (sample catalogue), `prisma.config.ts`.
- `src/app.module.ts` — config, `JwtAuthModule`, `PrismaModule`, `RmqModule`, `ObjectStorageModule` (bucket `products`), `MulterModule` (images, 5 MB).

## Stock

`reserve_stock` takes every line or none: one transaction decrements each product only while `stock >= quantity`
and it is active; a short line throws and the transaction rolls back, answering `out_of_stock`. `stock_released`
adds the quantities back.

## Images

See [file uploads](../../file-uploads.md).

## Interfaces

- Endpoints: [api.md](api.md)
- Flow: [flow.md](flow.md)
- Data: [data-model.md](data-model.md)
- Environment: [configuration.md](configuration.md)
