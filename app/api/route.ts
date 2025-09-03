import { errorHandler } from "@/libs/error/handler";
import { NextRequest, NextResponse } from "next/server";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const GET = errorHandler(async (_request: NextRequest) => {
  return NextResponse.json(
    { message: "Api working successfully", data: [] },
    { status: 200 }
  );
});
