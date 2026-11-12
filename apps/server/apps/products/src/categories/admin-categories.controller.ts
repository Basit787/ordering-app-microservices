import { Body, Controller, Delete, HttpCode, Param, Patch, Post } from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { ParseObjectIdPipe, Roles } from "backend-common";
import { CategoriesService } from "./categories.service";
import { CategoryDto } from "./dto/category.dto";
import { SaveCategoryDto } from "./dto/save-category.dto";

@ApiTags("Admin: categories")
@ApiBearerAuth()
@Roles("admin")
@Controller("admin/categories")
export class AdminCategoriesController {
  constructor(private readonly categories: CategoriesService) {}

  @Post()
  @ApiOkResponse({ type: CategoryDto })
  create(@Body() { name }: SaveCategoryDto): Promise<CategoryDto> {
    return this.categories.create(name);
  }

  @Patch(":id")
  @ApiOkResponse({ type: CategoryDto })
  rename(@Param("id", ParseObjectIdPipe) id: string, @Body() { name }: SaveCategoryDto): Promise<CategoryDto> {
    return this.categories.rename(id, name);
  }

  @Delete(":id")
  @HttpCode(204)
  delete(@Param("id", ParseObjectIdPipe) id: string): Promise<void> {
    return this.categories.delete(id);
  }
}
