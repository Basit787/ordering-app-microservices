# Shared packages

Code shared by more than one app lives in `packages/*`, is built with tsup to `dist/` and is consumed through its
`exports` only. Each package has a single `src/index.ts` that exports everything; rebuild after a change
(`pnpm turbo run build --filter=<package>`). Versions of third-party dependencies are pinned once, in the root
`package.json`; packages list them as `"*"`.

## `backend-common` (Nest services)

| Folder | Gives |
| --- | --- |
| `auth/` | `signAccessToken`, `verifyAccessToken`, `bearerToken`, `AuthGuard`, `JwtAuthModule`, `AuthUser`, `Role` |
| `decorators/` | `@Public()` and `@Roles(...)` (`SetMetadata` on `IS_PUBLIC` / `ROLES`), `@CurrentUser()` (`createParamDecorator`), `@AckMessage()` |
| `rmq/` | `RmqModule.register({ name })`, `RmqService.getOptions(queue)`, `RmqAckInterceptor` |
| `messaging/` | `PATTERNS`, payload types, service tokens, `rpcErrorMessage`, `rpcErrorCode` |
| `queue/` | `createJobQueue` (BullMQ: `add`, `addAt`, `every`, `start`, `close`), `redisConnection` |
| `storage/` | `ObjectStorageModule`, `ObjectStorageService`, `createUploadOptions`, `entityObjectKey`, `uniqueObjectKey` |
| `db/` | `PrismaModule.forRoot(PrismaClient)`, `PRISMA` token |
| `setup/` | `bootstrapService` (helmet, CORS, validation, error filter, Swagger, queue), `setupSwagger`, `securityHeaders`, `RequestLoggerMiddleware` |
| `errors/` | `ApiExceptionFilter` (`{ error, details? }`), `httpValidationPipe`, `HttpError` |
| `config/`, `cors/`, `dto/`, `pipes/` | `configSchema`, `databaseUrl`, `queueName`; `corsOriginCallback`; `PaginationQueryDto`, `Page<T>`; `ParseObjectIdPipe` |

Built without decorator metadata, so its providers inject with explicit `@Inject(...)`. Ships ESM and CJS (the Nest
server is CommonJS).

## `frontend-common` (web apps)

API client (`createAppApiClient`, `apiCall`, `toApiError`), auth client and React pieces (`createAuthClient`,
`AuthProvider`, `useAuth`, `AuthGate` with `requiredRole`, `LoginScreen`), `AppProviders`, `AppHeader`, `UserMenu`,
`ProfileScreen`, payments (`createPaymentsApi`, `usePayment`, `PayButton`, Razorpay Checkout), status badges,
`useAddressStore`, `useDebouncedValue`, formatting (`formatMoney`, `toCents`, dates), `frontendUrl`, `signInUrl`,
`resolveImageUrl`, and types mirroring the service DTOs.

## `oamui`

shadcn/ui primitives (`src/ui`), `OamUi*` wrappers (`src/components`: buttons, inputs, `useAppForm` forms, dialogs,
`OamUiDataTable`, `OamUiSidebarLayout`, …), theme (`ThemeProvider`, `ModeToggle`) and `oamui/globals.css`, a calm
low-contrast palette for light and dark.

## Config packages

`ports` (every port), `vite-config` (`defineAppConfig({ port, apis })`: React, TanStack Router, Tailwind, a
`/<service>-api` proxy per service), `tsconfig` (`base`, `node`, `react-app`, `react-library`), `biome-config`
(the root `biome.json` extends it).
