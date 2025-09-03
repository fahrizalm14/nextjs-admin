/* /libs/cookies.ts */
export const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
};

export const serializeCookie = (
  name: string,
  value: string,
  maxAgeSeconds: number
) => {
  const secure = cookieOptions.secure ? "; Secure" : "";
  return `${name}=${value}; Path=${cookieOptions.path}; HttpOnly; SameSite=${cookieOptions.sameSite}; Max-Age=${maxAgeSeconds}${secure}`;
};
