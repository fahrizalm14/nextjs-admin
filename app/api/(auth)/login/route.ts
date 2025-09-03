import { BadRequestError } from "@/libs/error/custom";
import { errorHandler } from "@/libs/error/handler";
import { loginUser } from "@/services/authServices";
import { ILoginRes } from "@/types/auth";
import { NextResponse } from "next/server";

export const POST = errorHandler(async (req) => {
  const { email, password, deviceId } = await req.json();

  const ua = req.headers.get("user-agent") || "unknown";

  if (!email || !password)
    throw new BadRequestError("Email dan password wajib diisi!");
  const { accessToken, serializedCookie, user } = await loginUser(
    email,
    password,
    ua,
    deviceId
  );

  const data: ILoginRes = { accessToken, user };

  // buat response dan set cookie
  const res = NextResponse.json(
    { message: "Login berhasil!", data },
    { status: 200 }
  );

  res.headers.set("Set-Cookie", serializedCookie);

  return res;
});
