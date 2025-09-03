// app/api/logout/route.ts
import { errorHandler } from "@/libs/error/handler";
import { logoutUser } from "@/services/authServices";
import { NextResponse } from "next/server";

export const POST = errorHandler(async (req) => {
  const refreshToken = req.cookies.get("refreshToken")?.value;

  if (refreshToken) {
    await logoutUser(refreshToken);
  }

  const res = NextResponse.json(
    { message: "Logout successful" },
    { status: 200 }
  );

  // Hapus semua cookie yang ada
  const cookieList = req.cookies.getAll(); // [{ name, value }]
  for (const cookie of cookieList) {
    res.cookies.delete(cookie.name); // harus string
  }

  return res;
});
