import { BadRequestError } from "@/libs/error/custom";
import { errorHandler } from "@/libs/error/handler";
import { validateEmail } from "@/libs/validation";
import { forgotPassword } from "@/services/authServices";
import { NextResponse } from "next/server";

export const POST = errorHandler(async (req) => {
  const { email } = await req.json();
  if (!validateEmail(email)) throw new BadRequestError("Email tidak valid!");

  await forgotPassword(email);

  return NextResponse.json(
    { message: "Berhasil mengajukan lupa password!", data: email },
    { status: 200 }
  );
});
