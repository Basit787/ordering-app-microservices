# File uploads (S3)

Product pictures go to an S3-compatible bucket through the products service. Locally that is **floci**
(`floci/floci:2.3.0`, port `4566`, the same emulator as my-app); in production any S3, MinIO or R2 endpoint.

## Pieces (`backend-common`)

- `ObjectStorageModule.forRoot({ inject, useFactory })` — a global `ObjectStorageService` for one bucket, created on
  start. Without `S3_ENDPOINT` the service still starts; uploads answer `503`.
- `createUploadOptions({ maxFileSizeMb, imagesOnly })` — Multer options for `MulterModule.register(...)`: files stay in
  memory, non-images are refused with `400 Only image files are allowed`, client paths are stripped from names.
- `entityObjectKey(folder, id, name)` → `products/<id>.png` (one picture per product);
  `uniqueObjectKey(folder, name)` → `folder/<uuid>.png` (many files).
- `storage.bucket.put / getObject / delete / deleteByPrefix`, `storage.streamFile(key, { inline })`.

## Upload a product image

`POST /admin/products/:id/image` (admin token), `multipart/form-data`, field **`image`**, an image up to 5 MB. The
reply is the product; `imageUrl` becomes `/products/<id>/image?v=<timestamp>`.

```bash
curl -X POST http://localhost:3021/admin/products/$PRODUCT_ID/image \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -F "image=@./mug.png;type=image/png"
```

From a web app (the admin app does this in `services/products.ts`):

```ts
const body = new FormData();
body.append("image", file);
await apiCall(productsApi.postForm<Product>(`/admin/products/${id}/image`, body), "Could not upload the image");
```

- `DELETE /admin/products/:id/image` removes it; deleting the product removes it too.
- `GET /products/:id/image` (public) streams it. Web apps show it with `resolveImageUrl(product.imageUrl)` from
  `frontend-common`, which routes it through the app's `/products-api` proxy; an external `imageUrl` is used as is.

## Configuration

`S3_ENDPOINT` (empty in `.env` → compose uses `http://floci:4566`), `S3_REGION`, `S3_ACCESS_KEY_ID`,
`S3_SECRET_ACCESS_KEY`, `S3_BUCKET` (`products`).

## Adding uploads to another service

1. Import `ObjectStorageModule.forRoot(...)` and `MulterModule.register(createUploadOptions(...))` in its app module.
2. In the controller: `@UseInterceptors(FileInterceptor("<field>"))` and `@UploadedFile() file: UploadedFileData`.
3. Store with `storage.bucket.put(key, file.buffer, file.mimetype)`; keep the key on the entity, never a public URL.
4. Add its `S3_*` variables to compose and its [configuration page](README.md).
