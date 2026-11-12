export interface StockLine {
  productId: string;
  quantity: number;
}

export interface GetProductsPayload {
  ids: string[];
}

// One product as other services see it
export interface ProductSummary {
  id: string;
  name: string;
  priceCents: number;
  stock: number;
  imageUrl: string | null;
  active: boolean;
}

export interface ReserveStockPayload {
  items: StockLine[];
}

// A reserved line priced at the moment of the reservation
export interface ReservedLine extends StockLine {
  name: string;
  priceCents: number;
}

export interface ReserveStockReply {
  items: ReservedLine[];
}

export interface StockReleasedPayload {
  orderId: string;
  items: StockLine[];
}

export interface OrderPlacedPayload {
  orderId: string;
  userId: string;
  totalCents: number;
}

export interface OrderCancelledPayload {
  orderId: string;
}

export interface PaymentResultPayload {
  orderId: string;
  paymentId: string;
  // Set when the payment failed
  reason?: string;
}

// What a request-reply handler sends back when it fails (RpcException body); `code` lets the caller tell
// a business refusal (e.g. "out_of_stock") from a fault worth retrying
export interface RpcErrorBody {
  message: string;
  code?: "out_of_stock" | "unavailable";
}
