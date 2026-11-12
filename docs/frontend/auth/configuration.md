# Auth app (home) — configuration

- Port `3000` (`PORTS.auth.frontend` in `packages/ports`), set in `vite.config.ts` with `defineAppConfig`.
- Proxies: `/auth-api` → the services; `<SERVICE>_PROXY_TARGET` overrides a target (compose points them at the containers, e.g. `ORDERS_PROXY_TARGET=http://orders:3022`).
- `CHOKIDAR_USEPOLLING=true` in Docker so file changes reach the dev server on macOS.
