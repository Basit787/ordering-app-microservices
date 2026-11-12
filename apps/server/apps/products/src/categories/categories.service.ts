import { Injectable, NotFoundException } from "@nestjs/common";
import type { Category } from "@prisma-db/products";
import { uniqueSlug } from "../utils/slugify";
import { CategoryRepository } from "./category.repository";
import { CategoryDto } from "./dto/category.dto";

const toCategoryDto = ({ id, name, slug }: Category): CategoryDto => ({ id, name, slug });

@Injectable()
export class CategoriesService {
  constructor(private readonly categories: CategoryRepository) {}

  async list(): Promise<CategoryDto[]> {
    return (await this.categories.list()).map(toCategoryDto);
  }

  async create(name: string): Promise<CategoryDto> {
    const slug = await uniqueSlug(name, (s) => this.categories.slugTaken(s));
    return toCategoryDto(await this.categories.create({ name: name.trim(), slug }));
  }

  // The slug stays, so links to the category keep working
  async rename(id: string, name: string): Promise<CategoryDto> {
    await this.mustExist(id);
    return toCategoryDto(await this.categories.rename(id, name.trim()));
  }

  async delete(id: string): Promise<void> {
    await this.mustExist(id);
    await this.categories.delete(id);
  }

  async mustExist(id: string): Promise<void> {
    if (!(await this.categories.findById(id))) throw new NotFoundException("Category not found");
  }
}
