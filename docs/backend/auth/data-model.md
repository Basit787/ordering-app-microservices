# Auth service — data model

MongoDB through Prisma 6 (`prisma/schema.prisma`, client in `node_modules/@prisma-db/auth`); `prisma db push` syncs indexes (no migrations on MongoDB).

`users` (database `auth`):

| Field | Type | Notes |
| --- | --- | --- |
| `id` | ObjectId | |
| `name` | string | |
| `email` | string | unique, lowercased |
| `passwordHash` | string | scrypt, never returned |
| `role` | `user` \| `admin` | default `user` |
| `createdAt`, `updatedAt` | date | |
