# Auth service — API

Base URL `http://localhost:3001` (from a web app: `/auth-api`). Swagger UI at `http://localhost:3001/docs`, the spec in [`docs/api/auth.openapi.json`](../../api/auth.openapi.json) (`make api-docs` refreshes it). Protected routes take `Authorization: Bearer <token>` from `POST /auth/login`; errors are `{ error, details? }`.

## Endpoints

| Method | Path | Who | Body | Success |
| --- | --- | --- | --- | --- |
| POST | `/auth/register` | public | `RegisterDto` | 201 `SignInReplyDto` |
| POST | `/auth/login` | public | `LoginDto` | 200 `SignInReplyDto` |
| GET | `/auth/me` | signed in | — | 200 `AuthUserDto` |
| GET | `/admin/users` `?page?&pageSize?` | admin | — | 200 |
| PATCH | `/admin/users/{id}/role` | admin | `SetRoleDto` | 200 `AuthUserDto` |

## Schemas

- `RegisterDto` — `name`, `email`, `password`
- `AuthUserDto` — `id`, `name`, `email`, `role`, `createdAt`
- `SignInReplyDto` — `user`, `token`, `expiresAt`
- `LoginDto` — `email`, `password`
- `SetRoleDto` — `role`
