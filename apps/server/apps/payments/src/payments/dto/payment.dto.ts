import { ApiProperty } from "@nestjs/swagger";

export const PAYMENT_STATUSES = ["created", "succeeded", "failed", "refunded"] as const;

// What the store passes to Razorpay Checkout
export class RazorpayCheckoutDto {
  @ApiProperty()
  keyId: string;

  @ApiProperty()
  razorpayOrderId: string;

  @ApiProperty({ description: "Smallest currency unit (paise)" })
  amount: number;

  @ApiProperty({ example: "INR" })
  currency: string;
}

export class PaymentDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  orderId: string;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  amountCents: number;

  @ApiProperty()
  currency: string;

  @ApiProperty({ enum: PAYMENT_STATUSES })
  status: (typeof PAYMENT_STATUSES)[number];

  @ApiProperty({ enum: ["razorpay", "mock"] })
  provider: string;

  @ApiProperty({ type: String, nullable: true })
  razorpayPaymentId: string | null;

  @ApiProperty({ type: String, nullable: true })
  failureReason: string | null;

  @ApiProperty({ type: RazorpayCheckoutDto, nullable: true, description: "Set while the payment waits for Checkout" })
  checkout: RazorpayCheckoutDto | null;

  @ApiProperty()
  createdAt: Date;
}
