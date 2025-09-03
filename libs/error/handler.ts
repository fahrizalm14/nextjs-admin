export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { ApiError } from "./custom";

/**
 * @description Mendefinisikan tipe fungsi untuk API route handler.
 * Handler ini menerima NextRequest dan argumen tambahan, dan harus mengembalikan Promise yang berisi NextResponse atau void.
 * @template T
 * @param {NextRequest} req - Objek permintaan Next.js.
 * @param {...unknown[]} args - Argumen tambahan.
 * @returns {Promise<NextResponse | void>}
 */
type ApiHandler = (
  req: NextRequest,
  ...args: unknown[]
) => Promise<NextResponse | void>;

/**
 * @description Fungsi wrapper untuk menangani kesalahan (error handler).
 * Ini membungkus handler API dan menangkap kesalahan yang dilempar, lalu mengembalikan respons JSON yang diformat dengan baik.
 * @param {ApiHandler} handler - Handler API yang akan dibungkus dan dilindungi dari kesalahan.
 * @returns {(req: NextRequest, ...args: unknown[]) => Promise<NextResponse | void>} - Handler API yang telah disempurnakan.
 */
export const errorHandler = (handler: ApiHandler) => {
  return async (req: NextRequest, ...args: unknown[]) => {
    try {
      // Menjalankan handler API asli di dalam blok try untuk menangkap kesalahan.
      return await handler(req, ...args);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      // console.error("API Error Caught:", error.status);

      // Memeriksa apakah kesalahan adalah instance dari kelas ApiError kustom.
      // Ini memungkinkan kita untuk mengembalikan pesan dan status yang spesifik.
      if (error instanceof ApiError) {
        return NextResponse.json(
          { message: error.message },
          { status: error.status }
        );
      }

      // Jika kesalahan bukan dari kelas kustom, itu adalah kesalahan tak terduga.
      // Kita mengasumsikan ini adalah Internal Server Error (500) untuk keamanan.
      return NextResponse.json(
        { message: "Internal Server Error" },
        { status: 500 }
      );
    }
  };
};
