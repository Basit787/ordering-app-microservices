import { Inject, Injectable } from "@nestjs/common";
import { PrismaClient, type Role, type User } from "@prisma-db/auth";
import { PRISMA } from "backend-common";

type NewUser = Pick<User, "name" | "email" | "passwordHash" | "role">;

// Data access for accounts
@Injectable()
export class UserRepository {
  constructor(@Inject(PRISMA) private readonly prisma: PrismaClient) {}

  create(data: NewUser): Promise<User> {
    return this.prisma.user.create({ data: { ...data, email: data.email.trim().toLowerCase() } });
  }

  findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email: email.trim().toLowerCase() } });
  }

  list(skip: number, take: number): Promise<[User[], number]> {
    return this.prisma.$transaction([
      this.prisma.user.findMany({ orderBy: { createdAt: "desc" }, skip, take }),
      this.prisma.user.count(),
    ]);
  }

  setRole(id: string, role: Role): Promise<User> {
    return this.prisma.user.update({ where: { id }, data: { role } });
  }
}
