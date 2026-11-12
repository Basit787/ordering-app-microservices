import { Controller, Get, Param, Query, type StreamableFile } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { ParseObjectIdPipe, Public } from "backend-common";
import { ListProductsQueryDto } from "./dto/list-products-query.dto";
import { ProductDto } from "./dto/product.dto";
import { ProductsService } from "./products.service";

// The store catalogue: active products only, no sign-in needed
@ApiTags("Products")
@Public()
@Controller("products")
export class ProductsController {
  constructor(private readonly products: ProductsService) {}

  @Get()
  list(@Query() query: ListProductsQueryDto) {
    return this.products.list(query, true);
  }

  @Get(":id/image")
  image(@Param("id", ParseObjectIdPipe) id: string): Promise<StreamableFile> {
    return this.products.streamImage(id);
  }

  @Get(":id")
  @ApiOkResponse({ type: ProductDto })
  get(@Param("id", ParseObjectIdPipe) id: string): Promise<ProductDto> {
    return this.products.get(id, true);
  }
}
