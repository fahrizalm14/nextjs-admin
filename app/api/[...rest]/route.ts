/* eslint-disable @typescript-eslint/no-unused-vars */
import { NotFoundError } from "@/libs/error/custom";
import { errorHandler } from "@/libs/error/handler";

export const GET = errorHandler(async (_req) => {
  throw new NotFoundError();
});

export const POST = errorHandler(async (_req) => {
  throw new NotFoundError();
});

export const PUT = errorHandler(async (_req) => {
  throw new NotFoundError();
});

export const DELETE = errorHandler(async (_req) => {
  throw new NotFoundError();
});
