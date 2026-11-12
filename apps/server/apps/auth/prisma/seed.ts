import { PrismaClient } from "@prisma-db/auth";
import { hashPassword } from "../src/auth/utils/hash-password";

const prisma = new PrismaClient();

// The first admin from ADMIN_NAME / ADMIN_EMAIL / ADMIN_PASSWORD; an existing account with that email is left alone
const main = async () => {
  const email = (process.env.ADMIN_EMAIL || "admin@oam.local").trim().toLowerCase();
  if (await prisma.user.findUnique({ where: { email } })) return;
  await prisma.user.create({
    data: {
      name: process.env.ADMIN_NAME || "Admin",
      email,
      passwordHash: await hashPassword(process.env.ADMIN_PASSWORD || "Admin123!"),
      role: "admin",
    },
  });
  console.log(`Created admin account ${email}`);
};

main().finally(() => prisma.$disconnect());
