import { Controller, Get } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { Public } from "backend-common";
import { CategoriesService } from "./categories.service";
import { CategoryDto } from "./dto/category.dto";

@ApiTags("Categories")
@Public()
@Controller("categories")
export class CategoriesController {
  constructor(private readonly categories: CategoriesService) {}

  @Get()
  @ApiOkResponse({ type: [CategoryDto] })
  list(): Promise<CategoryDto[]> {
    return this.categories.list();
  }
}
