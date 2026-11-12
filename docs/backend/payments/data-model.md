# Payments service — data model

MongoDB through Prisma 6 (`prisma/schema.prisma`, client in `node_modules/@prisma-db/payments`); `prisma db push` syncs indexes (no migrations on MongoDB).

`payments` (database `payments`):

| Field | Type | Notes |
| --- | --- | --- |
| `id`, `orderId` | ObjectId | one payment per order (`orderId` unique) |
| `userId` | ObjectId | the payer |
| `amountCents` | int | paise |
| `currency` | string | `INR` |
| `status` | `created` \| `succeeded` \| `failed` \| `refunded` | |
| `provider` | `razorpay` \| `mock` | |
| `razorpayOrderId`, `razorpayPaymentId` | string? | |
| `failureReason` | string? | last failure or why it closed |
