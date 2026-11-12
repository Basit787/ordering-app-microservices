import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { type Page, PaginationQueryDto, toSkipTake } from "backend-common";
import { AuthUserDto } from "../auth/dto/auth-user.dto";
import { toAuthUserDto } from "../auth/utils/to-auth-user-dto";
import { UserRepository } from "./user.repository";

@Injectable()
export class UsersService {
  constructor(private readonly users: UserRepository) {}

  async list(query: PaginationQueryDto): Promise<Page<AuthUserDto>> {
    const { skip, take } = toSkipTake(query);
    const [users, total] = await this.users.list(skip, take);
    return { items: users.map(toAuthUserDto), total, page: query.page, pageSize: query.pageSize };
  }

  async setRole(actorId: string, userId: string, role: "user" | "admin"): Promise<AuthUserDto> {
    // An admin cannot demote themselves, so there is always one admin left
    if (actorId === userId && role !== "admin") throw new BadRequestException("You cannot remove your own admin role");
    if (!(await this.users.findById(userId))) throw new NotFoundException("User not found");
    return toAuthUserDto(await this.users.setRole(userId, role));
  }
}
