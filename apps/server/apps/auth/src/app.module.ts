import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PrismaClient } from "@prisma-db/auth";
import { configSchema, databaseUrl, JwtAuthModule, PrismaModule } from "backend-common";
import joi from "joi";
import { AuthController } from "./auth/auth.controller";
import { AuthService } from "./auth/auth.service";
import { AdminUsersController } from "./users/admin-users.controller";
import { UserRepository } from "./users/user.repository";
import { UsersService } from "./users/users.service";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: "apps/auth/.env",
      validationSchema: configSchema("auth", {
        DATABASE_URL: databaseUrl("auth"),
        JWT_TTL_SECONDS: joi.number().default(24 * 60 * 60),
      }),
    }),
    JwtAuthModule,
    PrismaModule.forRoot(PrismaClient),
  ],
  controllers: [AuthController, AdminUsersController],
  providers: [AuthService, UsersService, UserRepository],
})
export class AppModule {}
