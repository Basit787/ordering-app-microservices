import { Inject, Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma-db/orders";
import type { StockLine } from "backend-common";
import { PRISMA } from "backend-common";

// Data access for carts; a user without a cart has an empty one
@Injectable()
export class CartRepository {
  constructor(@Inject(PRISMA) private readonly prisma: PrismaClient) {}

  async items(userId: string): Promise<StockLine[]> {
    const cart = await this.prisma.cart.findUnique({ where: { userId } });
    return cart?.items ?? [];
  }

  async save(userId: string, items: StockLine[]): Promise<void> {
    await this.prisma.cart.upsert({ where: { userId }, create: { userId, items }, update: { items } });
  }
}
