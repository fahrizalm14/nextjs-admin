import prisma from "@/libs/db/prisma";
import { BadRequestError } from "@/libs/error/custom";
import { errorHandler } from "@/libs/error/handler";
import { NextResponse } from "next/server";

export const GET = errorHandler(async (req) => {
  const url = new URL(req.url);
  const token = url.searchParams.get("token");

  if (!token) return new NextResponse("Token tidak valid", { status: 400 });

  const record = await prisma.emailVerification.findUnique({
    where: { token },
  });

  if (!record || record.used || record.expiresAt < new Date()) {
    throw new BadRequestError("Token sudah tidak berlaku atau digunakan");
  }

  // tandai token sudah digunakan
  await prisma.emailVerification.update({
    where: { token },
    data: { used: true },
  });

  // aktifkan user
  await prisma.user.update({
    where: { id: record.userId },
    data: { isVerified: true },
  });

  return new NextResponse("Email berhasil diverifikasi!", { status: 200 });
});
