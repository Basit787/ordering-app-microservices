import { randomBytes } from "node:crypto";

// "Blue Cotton T-Shirt" → "blue-cotton-t-shirt"
export const slugify = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "") || "item";

// The slug, or the slug plus a short random suffix when `taken` says it is in use
export const uniqueSlug = async (value: string, taken: (slug: string) => Promise<boolean>) => {
  const base = slugify(value);
  return (await taken(base)) ? `${base}-${randomBytes(3).toString("hex")}` : base;
};
