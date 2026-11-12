# Auth service — architecture

NestJS service on port `3001` (Swagger at `/docs`) that owns accounts and sign-in for every app.

## Layout

- `src/auth/` — `AuthController` (`POST /auth/register`, `POST /auth/login`, `GET /auth/me`), `AuthService` (register, login, token signing), DTOs, `utils/` (scrypt `hashPassword` / `verifyPassword`, `toAuthUserDto`).
- `src/users/` — `AdminUsersController` (`GET /admin/users`, `PATCH /admin/users/:id/role`, admins only), `UsersService`, `UserRepository`.
- `prisma/schema.prisma` (users), `prisma/seed.ts` (the first admin), `prisma.config.ts`.
- `src/app.module.ts` — `ConfigModule` (`configSchema("auth")`), `JwtAuthModule`, `PrismaModule.forRoot(PrismaClient)`.

## Tokens

- Register and login return `{ user, token, expiresAt }`: an HS256 JWT (`signAccessToken`) with `sub`, `name`, `email`, `role`, valid `JWT_TTL_SECONDS`.
- Every service verifies it locally with the same `JWT_SECRET`; none calls auth per request.
- Web apps keep it in the `access_token` cookie, so one sign-in covers every app on the host.

## Passwords

`scrypt:<salt>:<hash>` with a random 16-byte salt; an unknown email is hashed anyway so it answers as slowly as a wrong password.

## Interfaces

- Endpoints: [api.md](api.md)
- Flow: [flow.md](flow.md)
- Data: [data-model.md](data-model.md)
- Environment: [configuration.md](configuration.md)
