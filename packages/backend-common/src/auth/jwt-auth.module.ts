import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "./auth.guard.js";

// Import once in a service's root module to protect every route with AuthGuard
@Module({ providers: [{ provide: APP_GUARD, useClass: AuthGuard }] })
export class JwtAuthModule {}
