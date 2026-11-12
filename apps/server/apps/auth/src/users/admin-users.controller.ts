import { Body, Controller, Get, Param, Patch, Query } from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { type AuthUser, CurrentUser, PaginationQueryDto, ParseObjectIdPipe, Roles } from "backend-common";
import { AuthUserDto } from "../auth/dto/auth-user.dto";
import { SetRoleDto } from "./dto/set-role.dto";
import { UsersService } from "./users.service";

@ApiTags("Admin: users")
@ApiBearerAuth()
@Roles("admin")
@Controller("admin/users")
export class AdminUsersController {
  constructor(private readonly users: UsersService) {}

  @Get()
  list(@Query() query: PaginationQueryDto) {
    return this.users.list(query);
  }

  @Patch(":id/role")
  @ApiOkResponse({ type: AuthUserDto })
  setRole(
    @CurrentUser() actor: AuthUser,
    @Param("id", ParseObjectIdPipe) id: string,
    @Body() { role }: SetRoleDto,
  ): Promise<AuthUserDto> {
    return this.users.setRole(actor.id, id, role);
  }
}
