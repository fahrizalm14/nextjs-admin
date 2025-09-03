import { errorHandler } from "@/libs/error/handler";
import { userRefreshToken } from "@/services/authServices";
import { NextResponse } from "next/server";

export const POST = errorHandler(async (req) => {
  const token = req.cookies.get("refreshToken")?.value;

  const data = await userRefreshToken(token!);
  return NextResponse.json(
    { message: "Access token berhasil dibuat!", data },
    { status: 200 }
  );
});
