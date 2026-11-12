import { Inject, Injectable } from "@nestjs/common";
import { type Prisma, PrismaClient, type Product } from "@prisma-db/products";
import type { ReservedLine, StockLine } from "backend-common";
import { PRISMA } from "backend-common";
import type { ProductWithCategory } from "./utils/to-product-dto";

// Thrown inside the reservation transaction so it rolls back; carries the message for the shopper
export class StockShortageError extends Error {}

export type ProductFilter = { search?: string; categoryId?: string; activeOnly: boolean };

const where = ({ search, categoryId, activeOnly }: ProductFilter): Prisma.ProductWhereInput => ({
  ...(activeOnly && { active: true }),
  ...(categoryId && { categoryId }),
  ...(search && { name: { contains: search, mode: "insensitive" } }),
});

// Data access for products and stock
@Injectable()
export class ProductRepository {
  constructor(@Inject(PRISMA) private readonly prisma: PrismaClient) {}

  list(filter: ProductFilter, skip: number, take: number): Promise<[ProductWithCategory[], number]> {
    return this.prisma.$transaction([
      this.prisma.product.findMany({
        where: where(filter),
        include: { category: true },
        orderBy: { createdAt: "desc" },
        skip,
        take,
      }),
      this.prisma.product.count({ where: where(filter) }),
    ]);
  }

  findById(id: string): Promise<ProductWithCategory | null> {
    return this.prisma.product.findUnique({ where: { id }, include: { category: true } });
  }

  findMany(ids: string[]): Promise<Product[]> {
    return this.prisma.product.findMany({ where: { id: { in: ids } } });
  }

  async slugTaken(slug: string): Promise<boolean> {
    return (await this.prisma.product.count({ where: { slug } })) > 0;
  }

  create(data: Prisma.ProductUncheckedCreateInput): Promise<ProductWithCategory> {
    return this.prisma.product.create({ data, include: { category: true } });
  }

  update(id: string, data: Prisma.ProductUncheckedUpdateInput): Promise<ProductWithCategory> {
    return this.prisma.product.update({ where: { id }, data, include: { category: true } });
  }

  setImageKey(id: string, imageKey: string | null): Promise<ProductWithCategory> {
    return this.prisma.product.update({ where: { id }, data: { imageKey }, include: { category: true } });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.product.delete({ where: { id } });
  }

  // Takes every line or none: a short line throws StockShortageError and the transaction rolls back
  reserveStock(lines: StockLine[]): Promise<ReservedLine[]> {
    return this.prisma.$transaction(async (tx) => {
      const reserved: ReservedLine[] = [];
      for (const line of lines) {
        const { count } = await tx.product.updateMany({
          where: { id: line.productId, active: true, stock: { gte: line.quantity } },
          data: { stock: { decrement: line.quantity } },
        });
        const product = await tx.product.findUnique({ where: { id: line.productId } });
        if (count === 0 || !product) {
          throw new StockShortageError(
            product?.active
              ? `Only ${product.stock} left of ${product.name}`
              : "A product in your cart is no longer sold",
          );
        }
        reserved.push({ ...line, name: product.name, priceCents: product.priceCents });
      }
      return reserved;
    });
  }

  // A deleted product has nothing to give stock back to
  async releaseStock(lines: StockLine[]): Promise<void> {
    for (const line of lines) {
      await this.prisma.product.updateMany({
        where: { id: line.productId },
        data: { stock: { increment: line.quantity } },
      });
    }
  }
}
