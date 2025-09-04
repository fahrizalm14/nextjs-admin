import { TokenPayload } from "@/types/auth";
import { JWTPayload, SignJWT, errors, jwtVerify } from "jose";
import { ForbiddenError } from "../error/custom";

// Gunakan fallback jika env variable tidak tersedia
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET ?? "your-super-secret-key"
);
const REFRESH_TOKEN_SECRET = new TextEncoder().encode(
  process.env.REFRESH_TOKEN_SECRET ?? "your-refresh-secret-key"
);

export const createAccessToken = async (
  payload: TokenPayload,
  expire = "15m"
) => {
  const jwtPayload: JWTPayload = { ...payload };
  return await new SignJWT(jwtPayload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(expire)
    .sign(JWT_SECRET);
};

export const createRefreshToken = async (payload: TokenPayload) => {
  const jwtPayload: JWTPayload = { ...payload };
  return await new SignJWT(jwtPayload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .sign(REFRESH_TOKEN_SECRET);
};

export const verifyAccessToken = async (
  token: string
): Promise<TokenPayload> => {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as unknown as TokenPayload; // ✅ convert ke unknown dulu
  } catch (err) {
    console.error("❌ Access token invalid:", err);
    throw new ForbiddenError("Invalid or expired access token");
  }
};

export const verifyRefreshToken = async (
  token: string
): Promise<TokenPayload> => {
  try {
    const { payload } = await jwtVerify(token, REFRESH_TOKEN_SECRET);
    return payload as unknown as TokenPayload;
  } catch (err) {
    if (err instanceof errors.JWTExpired) {
      console.error("⏰ Refresh token sudah expired");
    } else if (err instanceof errors.JOSEError) {
      console.error(
        "⚠️ Refresh token tidak valid (signature salah atau corrupt)"
      );
    } else {
      console.error("🚨 Error lain saat verifikasi refresh token:", err);
    }
    throw new ForbiddenError("Invalid or expired refresh token");
  }
};
