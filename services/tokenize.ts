import prisma from "@/libs/db/prisma";

export async function createEmailVerification(userId: string) {
  const token = `verify-${Date.now()}-${Math.floor(Math.random() * 1_000_000)}`;
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 jam

  await prisma.emailVerification.create({
    data: { userId, token, expiresAt },
  });

  return token;
}
