// Message names between services: events are past tense, request-reply commands are imperative
export const PATTERNS = {
  // orders → products, request-reply: product summaries by id
  getProducts: "get_products",
  // orders → products, request-reply: take stock for an order, or fail without taking any
  reserveStock: "reserve_stock",
  // orders → products, event: put stock back after a failed payment or a cancellation
  stockReleased: "stock_released",
  // orders → payments, event: the order-placement worker reserved the stock; the order waits for payment
  orderPlaced: "order_placed",
  // orders → payments, event: a paid order was cancelled, refund it
  orderCancelled: "order_cancelled",
  // payments → orders, events: the payment outcome
  paymentSucceeded: "payment_succeeded",
  paymentFailed: "payment_failed",
} as const;
