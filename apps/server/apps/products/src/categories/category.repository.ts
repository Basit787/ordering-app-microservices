import { Inject, Injectable } from "@nestjs/common";
import { type Category, PrismaClient } from "@prisma-db/products";
import { PRISMA } from "backend-common";

// Data access for categories
@Injectable()
export class CategoryRepository {
  constructor(@Inject(PRISMA) private readonly prisma: PrismaClient) {}

  list(): Promise<Category[]> {
    return this.prisma.category.findMany({ orderBy: { name: "asc" } });
  }

  findById(id: string): Promise<Category | null> {
    return this.prisma.category.findUnique({ where: { id } });
  }

  async slugTaken(slug: string): Promise<boolean> {
    return (await this.prisma.category.count({ where: { slug } })) > 0;
  }

  create(data: { name: string; slug: string }): Promise<Category> {
    return this.prisma.category.create({ data });
  }

  rename(id: string, name: string): Promise<Category> {
    return this.prisma.category.update({ where: { id }, data: { name } });
  }

  // Products in it keep existing with no category (onDelete: SetNull)
  async delete(id: string): Promise<void> {
    await this.prisma.category.delete({ where: { id } });
  }
}
