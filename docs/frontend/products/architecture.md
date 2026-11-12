# Products app (shop) — architecture

React + Vite + TanStack Router app on port `3002`; calls products, orders through `/<service>-api` (Vite proxy). UI from `oamui`, session, shared screens and types from `frontend-common`.

## Routes

- `/` — `(catalog)/`: category chips, debounced search, product grid, "Load more" (12 per page). Public.
- `/products/$productId` — `products/`: picture, price, stock, quantity, "Add to cart" (signed in) or "Sign in to buy" (to `/sign-in?next=` on the landing app).

## Layout

- `src/App.tsx` — `AppProviders` (theme, React Query, auth session, toasts) around the router; `src/routes/__root.tsx` adds the devtools in dev.
- `src/lib/` — app-wide code: `api-client.ts` (the app's one API client), `auth-client.ts`, `query-client.ts`; `lib/api/` (the cart, used by the header and the product page) and `lib/components/` (`shop-header`, `product-image`, `stock-label`).
- `src/routes/<route>/` — one folder per route (TanStack file routes; `(name)` folders add no path). The route file holds the page; its own code sits next to it in `_lib/` (ignored by the router):
  - `_lib/api/api.ts` — requests on the API client with plain string URLs (`"/orders-api/cart"`), each in try/catch rethrowing `toApiError(error, "<message>")`.
  - `_lib/api/hook.ts` — the TanStack Query hooks over those requests.
  - `_lib/components/` — components used by that route; `_lib/utils/` when needed.
