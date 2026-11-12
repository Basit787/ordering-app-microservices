# Products service — flow

1. **Browse** — shoppers list active products (search, category, pages of `pageSize`) without signing in.
2. **Manage** — admins create products (price in paise), edit, hide (`active: false`) or delete them, and manage categories; deleting a category leaves its products without one.
3. **Pictures** — `POST /admin/products/:id/image` stores `products/<id>.<ext>` in S3 and sets `imageKey`; `imageUrl` then points at `GET /products/:id/image`.
4. **Checkout** — the orders worker calls `reserve_stock`; products answers priced lines or `out_of_stock`.
5. **Give back** — a failed payment, a cancellation or an expired order sends `stock_released`.
