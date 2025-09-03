import { BadRequestError } from "@/libs/error/custom";
import { errorHandler } from "@/libs/error/handler";
import { registerUser } from "@/services/authServices";
import { NextResponse } from "next/server";

export const POST = errorHandler(async (req) => {
  const { email, password, name } = await req.json();

  if (!email || !password)
    throw new BadRequestError("Email dan password wajib diisi!");
  if (!name) throw new BadRequestError("Nama wajib diisi!");

  const data = await registerUser(email, password, name);
  const safeData = JSON.parse(
    JSON.stringify(data, (_key, value) =>
      typeof value === "bigint" ? value.toString() : value
    )
  );
  return NextResponse.json(
    { message: "Berhasil registrasi!", data: safeData },
    { status: 201 }
  );
});
