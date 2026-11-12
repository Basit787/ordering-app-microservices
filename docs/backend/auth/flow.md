# Auth service — flow

1. **Register** — `POST /auth/register` checks the email is free (lowercased), stores the scrypt hash with role `user`, returns a signed-in reply.
2. **Login** — `POST /auth/login`; one `401 Invalid email or password` for both unknown email and wrong password.
3. **Session** — the web app stores the token in a cookie and calls `GET /auth/me` on load; `401` signs out.
4. **Admin seed** — `prisma db seed` creates `ADMIN_EMAIL` as admin if the email is free (on every `make up`, and `make seed`).
5. **Roles** — an admin promotes or demotes users (`PATCH /admin/users/:id/role`); nobody can remove their own admin role. The new role applies from the user's next sign-in (it lives in the token).
