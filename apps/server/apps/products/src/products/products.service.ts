import { BadRequestException, Injectable, NotFoundException, type StreamableFile } from "@nestjs/common";
import {
  entityObjectKey,
  ObjectStorageService,
  type Page,
  type ProductSummary,
  type ReservedLine,
  type StockLine,
  toSkipTake,
  type UploadedFileData,
} from "backend-common";
import { CategoriesService } from "../categories/categories.service";
import { uniqueSlug } from "../utils/slugify";
import { CreateProductDto } from "./dto/create-product.dto";
import { ListProductsQueryDto } from "./dto/list-products-query.dto";
import { ProductDto } from "./dto/product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { ProductRepository } from "./product.repository";
import { type ProductWithCategory, productImageUrl, toProductDto } from "./utils/to-product-dto";

const IMAGE_FOLDER = "products";

// Same product twice in one request becomes one line
const mergeLines = (lines: StockLine[]): StockLine[] => {
  const quantities = new Map<string, number>();
  for (const { productId, quantity } of lines) quantities.set(productId, (quantities.get(productId) ?? 0) + quantity);
  return [...quantities].map(([productId, quantity]) => ({ productId, quantity }));
};

@Injectable()
export class ProductsService {
  constructor(
    private readonly products: ProductRepository,
    private readonly categories: CategoriesService,
    private readonly storage: ObjectStorageService,
  ) {}

  async list(query: ListProductsQueryDto, activeOnly: boolean): Promise<Page<ProductDto>> {
    const { skip, take } = toSkipTake(query);
    const filter = { search: query.search?.trim(), categoryId: query.categoryId, activeOnly };
    const [items, total] = await this.products.list(filter, skip, take);
    return { items: items.map(toProductDto), total, page: query.page, pageSize: query.pageSize };
  }

  // The store sees active products only; admins see every product
  async get(id: string, activeOnly: boolean): Promise<ProductDto> {
    const product = await this.products.findById(id);
    if (!product || (activeOnly && !product.active)) throw new NotFoundException("Product not found");
    return toProductDto(product);
  }

  async create(body: CreateProductDto): Promise<ProductDto> {
    await this.checkCategory(body.categoryId);
    const slug = await uniqueSlug(body.name, (s) => this.products.slugTaken(s));
    return toProductDto(await this.products.create({ ...body, name: body.name.trim(), slug }));
  }

  async update(id: string, body: UpdateProductDto): Promise<ProductDto> {
    await this.get(id, false);
    await this.checkCategory(body.categoryId);
    return toProductDto(await this.products.update(id, body));
  }

  async delete(id: string): Promise<void> {
    const product = await this.mustFind(id);
    await this.products.delete(id);
    if (product.imageKey) await this.storage.bucket.delete(product.imageKey);
  }

  // One object per product (products/<id>.<ext>); a new upload replaces the previous one
  async uploadImage(id: string, file: UploadedFileData): Promise<ProductDto> {
    const product = await this.mustFind(id);
    const key = entityObjectKey(IMAGE_FOLDER, id, file.originalname);
    await this.storage.bucket.put(key, file.buffer, file.mimetype);
    if (product.imageKey && product.imageKey !== key) await this.storage.bucket.delete(product.imageKey);
    return toProductDto(await this.products.setImageKey(id, key));
  }

  async removeImage(id: string): Promise<ProductDto> {
    const product = await this.mustFind(id);
    if (product.imageKey) await this.storage.bucket.delete(product.imageKey);
    return toProductDto(await this.products.setImageKey(id, null));
  }

  // The uploaded picture of any product (orders show pictures of products no longer sold)
  async streamImage(id: string): Promise<StreamableFile> {
    const product = await this.products.findById(id);
    if (!product?.imageKey) throw new NotFoundException("Image not found");
    return this.storage.streamFile(product.imageKey, { inline: true });
  }

  private async mustFind(id: string): Promise<ProductWithCategory> {
    const product = await this.products.findById(id);
    if (!product) throw new NotFoundException("Product not found");
    return product;
  }

  async summaries(ids: string[]): Promise<ProductSummary[]> {
    const products = await this.products.findMany([...new Set(ids)]);
    return products.map((product) => ({
      id: product.id,
      name: product.name,
      priceCents: product.priceCents,
      stock: product.stock,
      imageUrl: productImageUrl(product),
      active: product.active,
    }));
  }

  reserve(lines: StockLine[]): Promise<ReservedLine[]> {
    return this.products.reserveStock(mergeLines(lines));
  }

  release(lines: StockLine[]): Promise<void> {
    return this.products.releaseStock(mergeLines(lines));
  }

  private async checkCategory(categoryId: string | null | undefined) {
    if (!categoryId) return;
    try {
      await this.categories.mustExist(categoryId);
    } catch {
      throw new BadRequestException("Unknown category");
    }
  }
}
