import type { PageQuery } from "./page";

// processing: queued for placement (stock not reserved yet); rejected: placement refused, items back in the cart
export type OrderStatus =
  | "processing"
  | "rejected"
  | "pending_payment"
  | "paid"
  | "payment_failed"
  | "shipped"
  | "delivered"
  | "cancelled";

// Statuses an admin may set (UpdateOrderStatusDto)
export type AdminOrderStatus = "shipped" | "delivered" | "cancelled";

// Mirrors AddressDto in apps/server/apps/orders/src/orders/dto/address.dto.ts
export type Address = {
  fullName: string;
  phone: string;
  line1: string;
  line2?: string | null;
  city: string;
  state: string;
  postalCode: string;
  country: string;
};

// Mirrors OrderItemDto: name and price as bought
export type OrderItem = {
  productId: string;
  name: string;
  priceCents: number;
  quantity: number;
};

// Mirrors OrderDto in apps/server/apps/orders/src/orders/dto/order.dto.ts
export type Order = {
  id: string;
  userId: string;
  userName: string;
  items: OrderItem[];
  totalCents: number;
  status: OrderStatus;
  shippingAddress: Address;
  paymentId: string | null;
  failureReason: string | null;
  createdAt: string;
  updatedAt: string;
};

export type OrderQuery = PageQuery & { status?: OrderStatus };

// Mirrors CartLineDto in apps/server/apps/orders/src/cart/dto/cart.dto.ts
export type CartLine = {
  productId: string;
  name: string;
  priceCents: number;
  imageUrl: string | null;
  quantity: number;
  stock: number;
  available: boolean;
};

// Mirrors CartDto
export type Cart = {
  items: CartLine[];
  totalCents: number;
};
