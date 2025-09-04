import { BadRequestError } from "@/libs/error/custom";
import { errorHandler } from "@/libs/error/handler";
import { validatePassword } from "@/libs/validation";
import { resetPassword } from "@/services/authServices";
import { NextResponse } from "next/server";

export const POST = errorHandler(async (req) => {
  const { token, newPassword } = await req.json();
  if (!token || !newPassword) throw new BadRequestError("Payload valid!");

  const validation = validatePassword(newPassword);

  if (validation) throw new BadRequestError(validation);

  await resetPassword(token, newPassword);

  return NextResponse.json(
    { message: "Berhasil reset password!", data: [] },
    { status: 200 }
  );
});
