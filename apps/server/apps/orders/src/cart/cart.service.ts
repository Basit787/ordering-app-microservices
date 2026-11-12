import { BadRequestException, Injectable } from "@nestjs/common";
import type { StockLine } from "backend-common";
import { ProductsClient } from "../clients/products.client";
import { CartRepository } from "./cart.repository";
import { CartDto, CartLineDto } from "./dto/cart.dto";

@Injectable()
export class CartService {
  constructor(
    private readonly carts: CartRepository,
    private readonly products: ProductsClient,
  ) {}

  // The cart with live names, prices and stock; products deleted since they were added drop out
  async get(userId: string): Promise<CartDto> {
    const items = await this.carts.items(userId);
    const summaries = new Map((await this.products.summaries(items.map((i) => i.productId))).map((p) => [p.id, p]));
    const lines: CartLineDto[] = items.flatMap(({ productId, quantity }) => {
      const product = summaries.get(productId);
      if (!product) return [];
      const { name, priceCents, imageUrl, stock, active } = product;
      return [{ productId, name, priceCents, imageUrl, quantity, stock, available: active && stock >= quantity }];
    });
    const totalCents = lines.filter((l) => l.available).reduce((sum, l) => sum + l.priceCents * l.quantity, 0);
    return { items: lines, totalCents };
  }

  async setItem(userId: string, { productId, quantity }: StockLine): Promise<CartDto> {
    if (quantity > 0) {
      const [product] = await this.products.summaries([productId]);
      if (!product?.active) throw new BadRequestException("This product is not available");
      if (product.stock < quantity) throw new BadRequestException(`Only ${product.stock} left of ${product.name}`);
    }
    const others = (await this.carts.items(userId)).filter((i) => i.productId !== productId);
    await this.carts.save(userId, quantity > 0 ? [...others, { productId, quantity }] : others);
    return this.get(userId);
  }

  // Puts lines back (a rejected order), on top of what the shopper added since
  async restore(userId: string, lines: StockLine[]): Promise<void> {
    const current = await this.carts.items(userId);
    const merged = new Map(current.map((line) => [line.productId, line.quantity]));
    for (const { productId, quantity } of lines) merged.set(productId, (merged.get(productId) ?? 0) + quantity);
    await this.carts.save(
      userId,
      [...merged].map(([productId, quantity]) => ({ productId, quantity })),
    );
  }

  async clear(userId: string): Promise<void> {
    await this.carts.save(userId, []);
  }

  items(userId: string): Promise<StockLine[]> {
    return this.carts.items(userId);
  }
}
