# Orders app — architecture

React + Vite + TanStack Router app on port `3003`; calls orders, products, payments through `/<service>-api` (Vite proxy). UI from `oamui`, session, shared screens and types from `frontend-common`.

## Routes

- `/` — `(orders)/`: my orders, newest first, "Load more".
- `/cart` — `cart/`: quantities, remove, availability warnings, subtotal.
- `/checkout` — `checkout/`: shipping address (`useAppForm`, prefilled from `useAddressStore`) and summary; the order is queued as `processing` and opens.
- `/orders/$orderId` — `orders/`: status (polled while `processing` / `pending_payment`), items, address, payment (`PayButton` → Razorpay Checkout → verify), cancel.

## Layout

- `src/App.tsx` — `AppProviders` (theme, React Query, auth session, toasts) around the router; `src/routes/__root.tsx` adds the devtools in dev; `AuthGate` there covers every page (carts and orders need an account).
- `src/lib/` — app-wide code: `api-client.ts` (the app's one API client, plus `paymentsApi` from `createPaymentsApi`), `auth-client.ts`, `query-client.ts`, `components/orders-header.tsx`.
- `src/routes/<route>/` — one folder per route (TanStack file routes; `(name)` folders add no path). The route file holds the page; its own code sits next to it in `_lib/` (ignored by the router):
  - `_lib/api/api.ts` — requests on the API client with plain string URLs (`"/orders-api/cart"`), each in try/catch rethrowing `toApiError(error, "<message>")`.
  - `_lib/api/hook.ts` — the TanStack Query hooks over those requests.
  - `_lib/components/` — components used by that route; `_lib/utils/` when needed.
