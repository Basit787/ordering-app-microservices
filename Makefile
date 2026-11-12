.PHONY: up build down rebuild logs ps seed api-docs typecheck test install clean
.DEFAULT_GOAL := up

DEV = docker compose

# Starts MongoDB, RabbitMQ, every service and every web app; API docs at http://localhost:<port>/docs
up: .env
	$(DEV) up -d --build --remove-orphans
	@echo "Shop: http://localhost:3000 (home) | :3002 products | :3003 orders | :3004 admin"
	@echo "API docs: http://localhost:3001/docs (auth) | :3021/docs products | :3022/docs orders | :3023/docs payments"
	@echo "RabbitMQ: http://localhost:15672 (guest/guest)"

build: .env
	$(DEV) build

down:
	$(DEV) down

rebuild: .env
	$(DEV) build --no-cache
	$(DEV) up -d --remove-orphans --renew-anon-volumes

# OpenAPI specs from the running services into docs/api (Swagger UI stays at http://localhost:<port>/docs)
api-docs:
	curl -sf http://localhost:3001/docs/openapi.json | jq . > docs/api/auth.openapi.json
	curl -sf http://localhost:3021/docs/openapi.json | jq . > docs/api/products.openapi.json
	curl -sf http://localhost:3022/docs/openapi.json | jq . > docs/api/orders.openapi.json
	curl -sf http://localhost:3023/docs/openapi.json | jq . > docs/api/payments.openapi.json

# TypeScript across the workspace; turbo builds packages first
typecheck:
	pnpm turbo run typecheck

test:
	pnpm --filter server test

install:
	pnpm install && pnpm build

clean:
	find . -type d \( -name node_modules -o -name dist -o -name .turbo -o -name .tanstack \) -prune -exec rm -rf {} +
	find . -name "*.tsbuildinfo" -delete
