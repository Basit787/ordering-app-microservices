// 49900 paise → "₹499.00"; amounts are kept in the smallest currency unit everywhere
export const formatMoney = (cents: number, currency = "INR") =>
  (cents / 100).toLocaleString("en-IN", { style: "currency", currency });

// "499.5" (rupees, as typed) → 49950 paise; null when it is not a non-negative amount
export const toCents = (value: string): number | null => {
  const amount = Number(value.trim());
  return value.trim() && Number.isFinite(amount) && amount >= 0 ? Math.round(amount * 100) : null;
};

// "2026-11-11T10:00:00Z" → "11 Nov 2026"
export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

// "2026-11-11T10:00:00Z" → "11 Nov 2026, 3:30 pm"
export const formatDateTime = (iso: string) =>
  new Date(iso).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" });
