# Infrastructure

`docker-compose.yaml` runs everything for development; `make up` is the entry point.

| Service | Image / build | Port | Purpose |
| --- | --- | --- | --- |
| `mongodb` | `mongo:7`, single-node replica set `rs0` | 27017 | One database per service (Prisma needs the replica set) |
| `rabbitmq` | `rabbitmq:3.13-management-alpine` | 5672, 15672 | Events and request-reply between services |
| `redis` | `redis:7.4-alpine` | 6379 | BullMQ job queues |
| `floci` | `floci/floci:2.3.0` | 4566 | Local S3 for product images |
| `auth`, `products`, `orders`, `payments` | `docker/server/Dockerfile` (`dev`) | 3001, 3021–3023 | Nest services in watch mode |
| `auth-web`, `products-web`, `orders-web`, `admin-web` | `docker/client/Dockerfile` (`dev`) | 3000, 3002–3004 | Vite dev servers |

## Images

- `docker/server/Dockerfile` — deps stage installs the workspace, builds `packages/*` and generates every Prisma
  client; `dev` (compose runs `prisma generate`, `db push`, `db seed`, `nest start --watch <service>`), `build`
  and `prod` (`SERVICE` build arg).
- `docker/client/Dockerfile` — same deps stage; `dev` runs the app's Vite server, `prod` builds and serves
  `vite preview` (`APP` build arg).

## Makefile

`make up`, `make down`, `make build`, `make rebuild`, `make api-docs` (refresh `docs/api/*.openapi.json` from the running services), `make typecheck`, `make test`, `make install`, `make clean`.

## Ports

One source: `packages/ports` (`PORTS`); compose repeats them.
