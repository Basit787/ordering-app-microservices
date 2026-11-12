import { timingSafeEqual } from "node:crypto";
import { scryptAsync } from "./hash-password";

export const verifyPassword = async (password: string, stored: string): Promise<boolean> => {
  const [scheme, saltHex, hashHex] = stored.split(":");
  if (scheme !== "scrypt" || !saltHex || !hashHex) return false;
  const expected = Buffer.from(hashHex, "hex");
  const actual = await scryptAsync(password, Buffer.from(saltHex, "hex"), expected.length);
  return timingSafeEqual(actual, expected);
};
