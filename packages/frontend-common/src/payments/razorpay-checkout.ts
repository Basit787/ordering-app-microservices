import type { RazorpayCheckout, VerifyPaymentInput } from "../types/payments";

const CHECKOUT_SCRIPT = "https://checkout.razorpay.com/v1/checkout.js";

// The parts of Razorpay's checkout.js used here
type RazorpaySuccess = { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string };
type RazorpayInstance = {
  open: () => void;
  on: (event: "payment.failed", handler: (response: unknown) => void) => void;
};
type RazorpayConstructor = new (options: Record<string, unknown>) => RazorpayInstance;

declare global {
  interface Window {
    Razorpay?: RazorpayConstructor;
  }
}

let scriptLoading: Promise<RazorpayConstructor> | null = null;

// Loads checkout.js once per page
const loadCheckout = () => {
  scriptLoading ??= new Promise<RazorpayConstructor>((resolve, reject) => {
    if (window.Razorpay) return resolve(window.Razorpay);
    const script = document.createElement("script");
    script.src = CHECKOUT_SCRIPT;
    script.onload = () => (window.Razorpay ? resolve(window.Razorpay) : reject(new Error("Razorpay did not load")));
    script.onerror = () => {
      scriptLoading = null;
      reject(new Error("Could not load Razorpay Checkout"));
    };
    document.body.appendChild(script);
  });
  return scriptLoading;
};

export type CheckoutOptions = {
  checkout: RazorpayCheckout;
  // Shown in the Checkout header
  name: string;
  description?: string;
  prefill?: { name?: string; email?: string; contact?: string };
};

// Opens Razorpay Checkout; resolves with the values to verify, rejects when the shopper closes it
export const openRazorpayCheckout = async ({
  checkout,
  name,
  description,
  prefill,
}: CheckoutOptions): Promise<VerifyPaymentInput> => {
  const Razorpay = await loadCheckout();
  return new Promise((resolve, reject) => {
    const razorpay = new Razorpay({
      key: checkout.keyId,
      order_id: checkout.razorpayOrderId,
      amount: checkout.amount,
      currency: checkout.currency,
      name,
      description,
      prefill,
      theme: { color: "#4f8a83" },
      handler: (response: RazorpaySuccess) =>
        resolve({
          razorpayOrderId: response.razorpay_order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpaySignature: response.razorpay_signature,
        }),
      modal: { ondismiss: () => reject(new Error("Payment was not completed")) },
    });
    razorpay.open();
  });
};
