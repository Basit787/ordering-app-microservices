import { ApiProperty } from "@nestjs/swagger";
import { AddressDto } from "./address.dto";

export const ORDER_STATUSES = [
  "processing",
  "rejected",
  "pending_payment",
  "paid",
  "payment_failed",
  "shipped",
  "delivered",
  "cancelled",
] as const;
export type OrderStatusValue = (typeof ORDER_STATUSES)[number];

export class OrderItemDto {
  @ApiProperty()
  productId: string;

  @ApiProperty()
  name: string;

  @ApiProperty({ description: "Price paid, smallest currency unit" })
  priceCents: number;

  @ApiProperty()
  quantity: number;
}

export class OrderDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  userName: string;

  @ApiProperty({ type: [OrderItemDto] })
  items: OrderItemDto[];

  @ApiProperty()
  totalCents: number;

  @ApiProperty({ enum: ORDER_STATUSES })
  status: OrderStatusValue;

  @ApiProperty({ type: AddressDto })
  shippingAddress: AddressDto;

  @ApiProperty({ type: String, nullable: true })
  paymentId: string | null;

  @ApiProperty({ type: String, nullable: true })
  failureReason: string | null;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
