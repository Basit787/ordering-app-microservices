import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { ParseObjectIdPipe, Roles, type UploadedFileData } from "backend-common";
import { CreateProductDto } from "./dto/create-product.dto";
import { ListProductsQueryDto } from "./dto/list-products-query.dto";
import { ProductDto } from "./dto/product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { ProductsService } from "./products.service";

// Catalogue management: every product, active or not
@ApiTags("Admin: products")
@ApiBearerAuth()
@Roles("admin")
@Controller("admin/products")
export class AdminProductsController {
  constructor(private readonly products: ProductsService) {}

  @Get()
  list(@Query() query: ListProductsQueryDto) {
    return this.products.list(query, false);
  }

  @Get(":id")
  @ApiOkResponse({ type: ProductDto })
  get(@Param("id", ParseObjectIdPipe) id: string): Promise<ProductDto> {
    return this.products.get(id, false);
  }

  @Post()
  @ApiOkResponse({ type: ProductDto })
  create(@Body() body: CreateProductDto): Promise<ProductDto> {
    return this.products.create(body);
  }

  @Patch(":id")
  @ApiOkResponse({ type: ProductDto })
  update(@Param("id", ParseObjectIdPipe) id: string, @Body() body: UpdateProductDto): Promise<ProductDto> {
    return this.products.update(id, body);
  }

  @Post(":id/image")
  @HttpCode(200)
  @UseInterceptors(FileInterceptor("image"))
  @ApiConsumes("multipart/form-data")
  @ApiBody({ schema: { type: "object", properties: { image: { type: "string", format: "binary" } } } })
  @ApiOkResponse({ type: ProductDto })
  uploadImage(
    @Param("id", ParseObjectIdPipe) id: string,
    @UploadedFile() file: UploadedFileData | undefined,
  ): Promise<ProductDto> {
    if (!file) throw new BadRequestException('No image uploaded (multipart field "image")');
    return this.products.uploadImage(id, file);
  }

  @Delete(":id/image")
  @ApiOkResponse({ type: ProductDto })
  removeImage(@Param("id", ParseObjectIdPipe) id: string): Promise<ProductDto> {
    return this.products.removeImage(id);
  }

  @Delete(":id")
  @HttpCode(204)
  delete(@Param("id", ParseObjectIdPipe) id: string): Promise<void> {
    return this.products.delete(id);
  }
}
