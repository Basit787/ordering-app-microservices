# Admin app — architecture

React + Vite + TanStack Router app on port `3004`; calls auth, products, orders, payments through `/<service>-api` (Vite proxy). UI from `oamui`, session, shared screens and types from `frontend-common`.

## Routes

- `/` — `(dashboard)/`: orders to ship, awaiting payment, successful payments, products, users.
- `/products` — `products/`: `OamUiDataTable` with filters; create / edit dialog (price in rupees, category, picture upload or URL, visibility), hide/show, delete.
- `/categories` — `categories/`: create, rename, delete.
- `/orders` — `orders/`: status filter, details dialog (with the payment), ship, deliver, cancel (refunds a paid order).
- `/payments` — `payments/`: every payment with status and Razorpay reference.
- `/users` — `users/`: promote to admin / remove admin.

Tables load up to 100 rows (the API page limit) and filter in the browser.

## Layout

- `src/App.tsx` — `AppProviders` (theme, React Query, auth session, toasts) around the router; `src/routes/__root.tsx` adds the devtools in dev; `AuthGate requiredRole="admin"` and `AdminLayout` (sidebar) there cover every page.
- `src/lib/` — app-wide code: `api-client.ts` (the app's one API client, plus `paymentsApi` and `ADMIN_PAGE_SIZE`), `auth-client.ts`, `query-client.ts`, `components/admin-layout.tsx`, `components/page-header.tsx`.
- `src/routes/<route>/` — one folder per route (TanStack file routes; `(name)` folders add no path). The route file holds the page; its own code sits next to it in `_lib/` (ignored by the router):
  - `_lib/api/api.ts` — requests on the API client with plain string URLs (`"/orders-api/cart"`), each in try/catch rethrowing `toApiError(error, "<message>")`.
  - `_lib/api/hook.ts` — the TanStack Query hooks over those requests.
  - `_lib/components/` — components used by that route; `_lib/utils/` when needed.
