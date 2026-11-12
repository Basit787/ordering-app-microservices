# Products service — API

Base URL `http://localhost:3021` (from a web app: `/products-api`). Swagger UI at `http://localhost:3021/docs`, the spec in [`docs/api/products.openapi.json`](../../api/products.openapi.json) (`make api-docs` refreshes it). Protected routes take `Authorization: Bearer <token>` from `POST /auth/login`; errors are `{ error, details? }`.

## Endpoints

| Method | Path | Who | Body | Success |
| --- | --- | --- | --- | --- |
| GET | `/categories` | public | — | 200 `CategoryDto`[] |
| POST | `/admin/categories` | admin | `SaveCategoryDto` | 200 `CategoryDto` |
| PATCH | `/admin/categories/{id}` | admin | `SaveCategoryDto` | 200 `CategoryDto` |
| DELETE | `/admin/categories/{id}` | admin | — | 204 |
| GET | `/products` `?page?&pageSize?&search?&categoryId?` | public | — | 200 |
| GET | `/products/{id}/image` | public | — | 200 |
| GET | `/products/{id}` | public | — | 200 `ProductDto` |
| GET | `/admin/products` `?page?&pageSize?&search?&categoryId?` | admin | — | 200 |
| POST | `/admin/products` | admin | `CreateProductDto` | 200 `ProductDto` |
| GET | `/admin/products/{id}` | admin | — | 200 `ProductDto` |
| PATCH | `/admin/products/{id}` | admin | `UpdateProductDto` | 200 `ProductDto` |
| DELETE | `/admin/products/{id}` | admin | — | 204 |
| POST | `/admin/products/{id}/image` | admin | multipart: `image` | 200 `ProductDto` |
| DELETE | `/admin/products/{id}/image` | admin | — | 200 `ProductDto` |

## Schemas

- `CategoryDto` — `id`, `name`, `slug`
- `SaveCategoryDto` — `name`
- `ProductDto` — `id`, `name`, `slug`, `description`, `priceCents`, `stock`, `imageUrl`, `active`, `category`, `createdAt`, `updatedAt`
- `CreateProductDto` — `name`, `description`?, `priceCents`, `stock`, `imageUrl`?, `categoryId`?, `active`?
- `UpdateProductDto` — `name`?, `description`?, `priceCents`?, `stock`?, `imageUrl`?, `categoryId`?, `active`?
