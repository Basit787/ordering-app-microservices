import { randomBytes, scrypt } from "node:crypto";
import { promisify } from "node:util";

export const scryptAsync = promisify(scrypt) as (password: string, salt: Buffer, keylen: number) => Promise<Buffer>;

// "scrypt:<salt hex>:<hash hex>" with a random 16-byte salt per password
export const hashPassword = async (password: string): Promise<string> => {
  const salt = randomBytes(16);
  const hash = await scryptAsync(password, salt, 64);
  return `scrypt:${salt.toString("hex")}:${hash.toString("hex")}`;
};
