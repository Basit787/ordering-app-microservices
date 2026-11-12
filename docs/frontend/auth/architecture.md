# Auth app (landing and sign-in) — architecture

React + Vite + TanStack Router app on port `3000`; calls products through `/<service>-api` (Vite proxy). UI from `oamui`, session, shared screens and types from `frontend-common`.

## Routes

- `/` — `(home)/`: the public landing page and common entry point — header (Shop, My orders, sign-in or the account menu), hero, signed-in shortcuts (Admin for admins), categories, featured products (products API), how it works, footer.
- `/sign-in` — `sign-in/`: the shared `LoginScreen` (sign in or register); afterwards back to `?next=` when it is on this host (another app sent the shopper), else the landing page.
- `/profile` — `profile/`: `ProfileScreen` (account, theme, sign out).

## Layout

- `src/App.tsx` — `AppProviders` (theme, React Query, auth session, toasts) around the router; `src/routes/__root.tsx` adds the devtools in dev.
- `src/lib/` — app-wide code: `api-client.ts` (the app's one API client), `auth-client.ts`, `query-client.ts`, `components/brand-logo.tsx`.
- `src/routes/<route>/` — one folder per route (TanStack file routes; `(name)` folders add no path). The route file holds the page; its own code sits next to it in `_lib/` (ignored by the router):
  - `_lib/api/api.ts` — requests on the API client with plain string URLs (`"/orders-api/cart"`), each in try/catch rethrowing `toApiError(error, "<message>")`.
  - `_lib/api/hook.ts` — the TanStack Query hooks over those requests.
  - `_lib/components/` — components used by that route; `_lib/utils/` when needed.
