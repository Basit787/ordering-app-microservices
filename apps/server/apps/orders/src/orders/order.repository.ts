import { Inject, Injectable } from "@nestjs/common";
import { type Order, type OrderStatus, type Prisma, PrismaClient } from "@prisma-db/orders";
import { PRISMA } from "backend-common";

// Data access for orders
@Injectable()
export class OrderRepository {
  constructor(@Inject(PRISMA) private readonly prisma: PrismaClient) {}

  create(data: Prisma.OrderCreateInput): Promise<Order> {
    return this.prisma.order.create({ data });
  }

  findById(id: string): Promise<Order | null> {
    return this.prisma.order.findUnique({ where: { id } });
  }

  list(where: Prisma.OrderWhereInput, skip: number, take: number): Promise<[Order[], number]> {
    return this.prisma.$transaction([
      this.prisma.order.findMany({ where, orderBy: { createdAt: "desc" }, skip, take }),
      this.prisma.order.count({ where }),
    ]);
  }

  // Moves the order only if it is still in `from`, so two updates cannot both win; null when it was not
  async move(
    id: string,
    from: OrderStatus,
    data: Prisma.OrderUpdateManyMutationInput & { status: OrderStatus },
  ): Promise<Order | null> {
    const { count } = await this.prisma.order.updateMany({ where: { id, status: from }, data });
    return count ? this.findById(id) : null;
  }
}
