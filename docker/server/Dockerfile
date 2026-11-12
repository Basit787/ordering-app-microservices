ARG NODE_IMAGE=node:24-alpine

# Base: Node with pnpm; openssl for the Prisma engines
FROM ${NODE_IMAGE} AS base
RUN apk add --no-cache openssl && corepack enable pnpm
ENV TURBO_TELEMETRY_DISABLED=1 COREPACK_ENABLE_DOWNLOAD_PROMPT=0
WORKDIR /repo

# Deps: download packages from the lockfile, install the workspace, build the shared packages, generate the Prisma clients
FROM base AS deps
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN --mount=type=cache,id=pnpm-store,target=/pnpm/store pnpm fetch --store-dir /pnpm/store
COPY . .
RUN --mount=type=cache,id=pnpm-store,target=/pnpm/store pnpm install --offline --frozen-lockfile --store-dir /pnpm/store
RUN pnpm turbo run build --filter="./packages/*"
RUN pnpm --filter server run prisma:generate

# Dev: compose picks the service and runs it in watch mode
FROM deps AS dev
WORKDIR /repo/apps/server

# Build: compile one service (SERVICE = auth | products | orders | payments)
FROM deps AS build
ARG SERVICE
WORKDIR /repo/apps/server
RUN pnpm exec nest build ${SERVICE}

# Prod: sync the service's indexes, then run the compiled service
FROM build AS prod
ARG SERVICE
ENV NODE_ENV=production SERVICE=${SERVICE}
CMD ["sh", "-c", "pnpm exec prisma db push --skip-generate --config apps/$SERVICE/prisma.config.ts && node dist/apps/$SERVICE/main.js"]
