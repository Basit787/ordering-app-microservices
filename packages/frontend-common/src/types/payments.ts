import type { PageQuery } from "./page";

export type PaymentStatus = "created" | "succeeded" | "failed" | "refunded";

// Mirrors RazorpayCheckoutDto in apps/server/apps/payments/src/payments/dto/payment.dto.ts
export type RazorpayCheckout = {
  keyId: string;
  razorpayOrderId: string;
  amount: number;
  currency: string;
};

// Mirrors PaymentDto
export type Payment = {
  id: string;
  orderId: string;
  userId: string;
  amountCents: number;
  currency: string;
  status: PaymentStatus;
  provider: "razorpay" | "mock";
  razorpayPaymentId: string | null;
  failureReason: string | null;
  // Set while the payment waits for Razorpay Checkout
  checkout: RazorpayCheckout | null;
  createdAt: string;
};

// Mirrors VerifyPaymentDto: what Checkout's success handler returns
export type VerifyPaymentInput = {
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
};

export type PaymentQuery = PageQuery & { status?: PaymentStatus };
