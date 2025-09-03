// services/authService.ts

import prisma from "@/libs/db/prisma";
import { sendVerificationEmail } from "@/libs/email";
import {
  BadRequestError,
  ConflictError,
  ForbiddenError,
  NotFoundError,
  UnauthorizedError,
} from "@/libs/error/custom";
import {
  createAccessToken,
  createRefreshToken,
  verifyRefreshToken,
} from "@/libs/tokens";
import { IUserInfo, TokenPayload } from "@/types/auth";
import bcrypt from "bcryptjs";
import { serialize } from "cookie";
import { createEmailVerification } from "./tokenize";

/**
 * @description Mendaftarkan pengguna baru.
 * @param {string} email - Email pengguna.
 * @param {string} password - Kata sandi pengguna.
 * @param {string} [name] - Nama pengguna (opsional).
 * @returns {Promise<object>} - Objek pengguna yang baru dibuat.
 * @throws {BadRequestError} Jika email atau password tidak disediakan.
 * @throws {ConflictError} Jika email sudah terdaftar.
 */
export const registerUser = async (
  email: string,
  password?: string,
  name?: string
): Promise<object> => {
  if (!email || !password) {
    throw new BadRequestError("Email and password are required.");
  }

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new ConflictError("Email already registered.");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  // buat token verifikasi
  const token = await createEmailVerification(newUser.id);

  // kirim email
  await sendVerificationEmail(newUser.email, token);

  // Hapus password dari objek sebelum dikembalikan
  const { password: _, ...userWithoutPassword } = newUser;
  return userWithoutPassword;
};

/**
 * @description Mengotentikasi pengguna dan membuat token.
 * @param {string} email - Email pengguna.
 * @param {string} password - Kata sandi pengguna.
 * @returns {Promise<object>} - Objek dengan accessToken, refreshToken, dan data pengguna.
 * @throws {UnauthorizedError} Jika email atau password tidak valid.
 */
export const loginUser = async (
  email: string,
  password: string,
  ua: string,
  deviceId?: string
): Promise<{
  accessToken: string;
  user: IUserInfo;
  serializedCookie: string;
}> => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user || !(await bcrypt.compare(password, user.password || ""))) {
    throw new UnauthorizedError("Invalid email or password.");
  }

  if (!user.isVerified) throw new ForbiddenError("Email belum terverifikasi!");

  const payload = { userId: user.id, role: user.role };
  const accessToken = await createAccessToken(payload as TokenPayload);
  const refreshToken = await createRefreshToken(payload as TokenPayload);

  // 1 detik = 1000 ms
  const ONE_SECOND = 1000;

  // Durasi
  const TOKEN_DURATION = 7 * 24 * 60 * 60; // dalam detik
  const TOKEN_DURATION_MS = TOKEN_DURATION * ONE_SECOND; // dalam milidetik

  const dateNow = new Date();

  const expiredAt = new Date(dateNow.getTime() + TOKEN_DURATION_MS);

  // simpan autentikasi
  await prisma.authentication.create({
    data: {
      deviceId: deviceId || "",
      expiredAt,
      refreshToken,
      ua,
      active: true,
    },
  });

  const serializedCookie = serialize("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "strict",
    maxAge: TOKEN_DURATION,
  });

  const {
    password: _,
    storageUsed: __,
    storageTotal: ___,
    ...userWithoutPassword
  } = user;
  return {
    accessToken,
    user: userWithoutPassword,
    serializedCookie,
  };
};

/**
 * @description Menghasilkan access token baru dari refresh token.
 * @param {string} refreshToken - Refresh token dari cookie.
 * @returns {Promise<{accessToken:string}>} - Objek dengan access token baru.
 * @throws {UnauthorizedError} Jika refresh token tidak valid atau kedaluwarsa.
 */
export const userRefreshToken = async (
  refreshToken: string
): Promise<{ accessToken: string }> => {
  try {
    const { role, userId } = await verifyRefreshToken(refreshToken);

    const authentication = await prisma.authentication.findUnique({
      where: {
        refreshToken,
      },
    });

    // cek apakah aktif ?
    if (!authentication) {
      throw new UnauthorizedError("Refresh token tidak ditemukan.");
    }

    if (!authentication.active) {
      throw new UnauthorizedError("Refresh token sudah tidak aktif.");
    }

    if (authentication.expiredAt < new Date()) {
      throw new UnauthorizedError("Refresh token sudah kadaluarsa.");
    }

    const newAccessToken = await createAccessToken({ userId, role });

    return { accessToken: newAccessToken };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    throw new UnauthorizedError("Invalid or expired refresh token.");
  }
};

/**
 * @description Mengirim email reset password.
 * @param {string} email - Email pengguna yang meminta reset.
 * @returns {Promise<void>}
 * @throws {NotFoundError} Jika email tidak ditemukan di database.
 */
export const forgotPassword = async (email: string): Promise<void> => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new NotFoundError("User not found with this email address.");
  }

  // TODO: Tambahkan logika untuk mengirim email reset password
  // Misalnya, buat token unik dan kirimkan ke email pengguna
  console.log(`Sending password reset link to ${email}...`);
  // Implementasi pengiriman email bisa menggunakan Nodemailer, SendGrid, dll.
  // Contoh:
  // const resetToken = createResetToken({ userId: user.id });
  // await sendPasswordResetEmail(user.email, resetToken);
};

/**
 * @description Logout user, hapus refresh token di DB dan cookie.
 * @param {string} refreshToken - Refresh token dari cookie.
 * @returns {Promise<void>}
 * @throws {UnauthorizedError} Jika token tidak valid atau tidak ditemukan.
 */
export const logoutUser = async (refreshToken: string): Promise<void> => {
  if (!refreshToken) {
    throw new UnauthorizedError("Refresh token not provided.");
  }

  // Cari autentikasi di DB
  const authentication = await prisma.authentication.findUnique({
    where: { refreshToken },
  });

  if (!authentication) {
    throw new UnauthorizedError("Refresh token not found.");
  }

  // Tandai token sebagai tidak aktif
  await prisma.authentication.update({
    where: { refreshToken },
    data: { active: false },
  });

  // Cookie dihapus di API route
};
