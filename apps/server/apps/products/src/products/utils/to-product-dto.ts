import type { Category, Product } from "@prisma-db/products";
import { ProductDto } from "../dto/product.dto";

export type ProductWithCategory = Product & { category: Category | null };

// Uploaded picture (relative to the products API, versioned so caches refresh), else the external URL
export const productImageUrl = (product: Product): string | null =>
  product.imageKey ? `/products/${product.id}/image?v=${product.updatedAt.getTime()}` : product.imageUrl;

export const toProductDto = (product: ProductWithCategory): ProductDto => ({
  id: product.id,
  name: product.name,
  slug: product.slug,
  description: product.description,
  priceCents: product.priceCents,
  stock: product.stock,
  imageUrl: productImageUrl(product),
  active: product.active,
  category: product.category
    ? { id: product.category.id, name: product.category.name, slug: product.category.slug }
    : null,
  createdAt: product.createdAt,
  updatedAt: product.updatedAt,
});
