import { ApiProperty } from "@nestjs/swagger";
import { IsString, MaxLength } from "class-validator";

// The three values Razorpay Checkout's success handler returns
export class VerifyPaymentDto {
  @ApiProperty({ example: "order_Ok3QbhB9dNJx2q" })
  @IsString()
  @MaxLength(64)
  razorpayOrderId: string;

  @ApiProperty({ example: "pay_Ok3RCXfkM1sR9a" })
  @IsString()
  @MaxLength(64)
  razorpayPaymentId: string;

  @ApiProperty()
  @IsString()
  @MaxLength(256)
  razorpaySignature: string;
}
