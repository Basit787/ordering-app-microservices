# Documentation

OAM Shop: an e-commerce app on NestJS microservices (RabbitMQ events, Redis job queues, MongoDB through Prisma,
S3 file storage, Razorpay payments) and React + Vite web apps. Start with [getting started](getting-started.md).

## Workspace

- [Getting started](getting-started.md) — run the stack, URLs, accounts, Razorpay keys
- [Architecture](architecture.md) — services, web apps and how they talk
- [Events and queues](events-and-queues.md) — RabbitMQ messages, BullMQ jobs, the order flow
- [File uploads](file-uploads.md) — S3 storage and how to upload a product image
- [Infrastructure](infrastructure.md) — Docker, compose services, ports, Makefile
- [Shared packages](shared-packages.md) — `backend-common`, `frontend-common`, `oamui` and the config packages
- [API specs](api/) — OpenAPI JSON per service (`make api-docs`); Swagger UI at `/docs` on every service

## Backend services

- Auth — [architecture](backend/auth/architecture.md), [flow](backend/auth/flow.md), [API](backend/auth/api.md), [data model](backend/auth/data-model.md), [configuration](backend/auth/configuration.md)
- Products — [architecture](backend/products/architecture.md), [flow](backend/products/flow.md), [API](backend/products/api.md), [data model](backend/products/data-model.md), [configuration](backend/products/configuration.md)
- Orders — [architecture](backend/orders/architecture.md), [flow](backend/orders/flow.md), [API](backend/orders/api.md), [data model](backend/orders/data-model.md), [configuration](backend/orders/configuration.md)
- Payments — [architecture](backend/payments/architecture.md), [flow](backend/payments/flow.md), [API](backend/payments/api.md), [data model](backend/payments/data-model.md), [configuration](backend/payments/configuration.md)

## Web apps

- Auth (landing, sign-in) — [architecture](frontend/auth/architecture.md), [configuration](frontend/auth/configuration.md)
- Products (shop) — [architecture](frontend/products/architecture.md), [configuration](frontend/products/configuration.md)
- Orders — [architecture](frontend/orders/architecture.md), [configuration](frontend/orders/configuration.md)
- Admin — [architecture](frontend/admin/architecture.md), [configuration](frontend/admin/configuration.md)

## Adding docs

Each folder can hold more pages (`decisions.md`, `troubleshooting.md`, …); add them to this index.
