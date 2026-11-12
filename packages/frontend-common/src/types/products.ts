import type { PageQuery } from "./page";

// Mirrors CategoryDto in apps/server/apps/products/src/categories/dto/category.dto.ts
export type Category = {
  id: string;
  name: string;
  slug: string;
};

// Mirrors ProductDto in apps/server/apps/products/src/products/dto/product.dto.ts
export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  // Smallest currency unit (paise)
  priceCents: number;
  stock: number;
  imageUrl: string | null;
  active: boolean;
  category: Category | null;
  createdAt: string;
  updatedAt: string;
};

// Mirrors CreateProductDto; UpdateProductDto is the same with every field optional
export type ProductInput = {
  name: string;
  description?: string;
  priceCents: number;
  stock: number;
  imageUrl?: string | null;
  categoryId?: string | null;
  active?: boolean;
};

// Mirrors ListProductsQueryDto
export type ProductQuery = PageQuery & { search?: string; categoryId?: string };
