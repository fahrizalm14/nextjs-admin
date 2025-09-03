import { errorHandler } from "@/libs/error/handler";
import { NextResponse } from "next/server";

export const GET = errorHandler(async (req) => {
  return NextResponse.json({ message: "Work" }, { status: 200 });
});
