// The part of a Razorpay payment webhook this service reads (payment.captured, payment.failed)
export interface RazorpayWebhookEvent {
  event: string;
  payload?: {
    payment?: {
      entity?: {
        id: string;
        order_id: string;
        error_description?: string | null;
      };
    };
  };
}
