import { createHmac, timingSafeEqual } from "node:crypto";
import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import Razorpay from "razorpay";

// Constant-time comparison of a hex HMAC-SHA256 with the signature Razorpay sent
const signatureMatches = (payload: string | Buffer, secret: string, signature: string) => {
  const expected = Buffer.from(createHmac("sha256", secret).update(payload).digest("hex"));
  const actual = Buffer.from(signature);
  return expected.length === actual.length && timingSafeEqual(expected, actual);
};

// Razorpay's Orders and Refunds APIs plus its signature checks; disabled until both keys are set
@Injectable()
export class RazorpayGateway {
  private readonly logger = new Logger(RazorpayGateway.name);
  private readonly client: Razorpay | null;
  readonly keyId: string;
  private readonly keySecret: string;
  private readonly webhookSecret: string;

  constructor(config: ConfigService) {
    this.keyId = config.getOrThrow<string>("RAZORPAY_KEY_ID");
    this.keySecret = config.getOrThrow<string>("RAZORPAY_KEY_SECRET");
    this.webhookSecret = config.getOrThrow<string>("RAZORPAY_WEBHOOK_SECRET");
    this.client =
      this.keyId && this.keySecret ? new Razorpay({ key_id: this.keyId, key_secret: this.keySecret }) : null;
    if (!this.client) this.logger.warn("RAZORPAY_KEY_ID / RAZORPAY_KEY_SECRET not set: payments use the mock gateway");
  }

  get enabled(): boolean {
    return this.client !== null;
  }

  // A Razorpay order the shopper pays in Checkout; `receipt` is our order id
  async createOrder(amountCents: number, currency: string, receipt: string): Promise<string> {
    const order = await this.razorpay().orders.create({ amount: amountCents, currency, receipt });
    return order.id;
  }

  async refund(razorpayPaymentId: string, amountCents: number): Promise<void> {
    await this.razorpay().payments.refund(razorpayPaymentId, { amount: amountCents });
  }

  // Checkout's success handler signs "<order_id>|<payment_id>" with the key secret
  verifyCheckout(razorpayOrderId: string, razorpayPaymentId: string, signature: string): boolean {
    return signatureMatches(`${razorpayOrderId}|${razorpayPaymentId}`, this.keySecret, signature);
  }

  // Webhooks sign the raw request body with the webhook secret
  verifyWebhook(rawBody: Buffer, signature: string): boolean {
    return Boolean(this.webhookSecret) && signatureMatches(rawBody, this.webhookSecret, signature);
  }

  private razorpay(): Razorpay {
    if (!this.client) throw new Error("Razorpay is not configured");
    return this.client;
  }
}
