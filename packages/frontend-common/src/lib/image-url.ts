// Pictures uploaded to the products service come back as API paths ("/products/<id>/image");
// every app reaches that service through its /products-api proxy. External URLs stay as they are
export const resolveImageUrl = (url: string | null | undefined): string | undefined =>
  url ? (url.startsWith("/") ? `/products-api${url}` : url) : undefined;
