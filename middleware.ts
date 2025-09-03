// /middleware.ts

/**
 * Middleware Next.js untuk autentikasi dan otorisasi berbasis JWT.
 *
 * - Mengecek token JWT pada header `Authorization: Bearer <token>`
 * - Memverifikasi payload token dan mengambil `role` serta `userId`
 * - Melakukan role-based access control (RBAC) berdasarkan `ROLES_CONFIG`
 * - Melakukan validasi granular permission sesuai method HTTP:
 *   - GET    → read
 *   - POST   → create
 *   - PUT    → update
 *   - PATCH  → update
 *   - DELETE → delete
 *
 * Jika token tidak ada atau tidak valid → redirect ke `/login`
 * Jika role tidak dikenali → response 403
 * Jika role tidak memiliki izin pada endpoint → lempar `ForbiddenError`
 */

import {type NextRequest, NextResponse} from "next/server";
import {verifyAccessToken, verifyRefreshToken} from "./libs/tokens";
import {Role, ROLES_CONFIG} from "./types/auth";

/**
 * Handler untuk JWT authentication & role-based authorization
 */
const handleJwtAuth = async (request: NextRequest) => {
    const authHeader = request.headers.get("authorization");
    const token = authHeader?.split(" ")[1];

    // Jika tidak ada token → redirect ke login
    if (!token) {
        return NextResponse.json({message: `Akses tidak ditemukan!`}, {status: 403});
    }

    try {
        // Verifikasi token JWT dan ambil payload
        const payload = await verifyAccessToken(token);
        
        const role = payload.role as Role;

        // Ambil konfigurasi role dari ROLES_CONFIG
        const roleConfig = ROLES_CONFIG[role];
        if (!roleConfig) {
            return NextResponse.json({message: `Role  tidak ditemukan!`}, {status: 403})
        }

        // Cek endpoint yang diakses user
        const pathname = request.nextUrl.pathname;
        const endpoint = roleConfig.endpoints.find((e) =>
            pathname.startsWith(e.path)
        );

        if (endpoint) {
            // Mapping method HTTP ke permission
            const method = request.method;
            const methodToPermission: Record<string, string> = {
                GET: "read",
                POST: "create",
                PUT: "update",
                PATCH: "update",
                DELETE: "delete",
            };

            const requiredPermission = methodToPermission[method];

            // Validasi apakah role punya permission sesuai method
            if (
                requiredPermission &&
                !endpoint.permissions.includes(requiredPermission)
            ) {
                return NextResponse.json({message: `Role ${role} tidak punya izin ${requiredPermission} di ${endpoint.path}`}, {status: 403})
            }

            // ✅ akses diizinkan
            return null;
        }

        // Endpoint tidak terdaftar di role → Forbidden
        return NextResponse.json({message: "Akses ditolak"}, {status: 403})
    } catch (err) {
        console.error("JWT invalid:", err);
        return NextResponse.json({message: "JWT invalid"}, {status: 403})
    }
};

const handleUiAuth = async (request: NextRequest) => {
    const token = request.cookies.get("refreshToken")?.value;
    const {pathname} = request.nextUrl;

    // Halaman login/register
    if (["/login", "/register"].includes(pathname)) {
        if (token) {
            try {
                const payload = await verifyRefreshToken(token);
                if (ROLES_CONFIG[payload.role]) {
                    return NextResponse.redirect(new URL("/analytic", request.url));
                }
            } catch {
                // Token invalid → tetap di halaman login
                return NextResponse.next();
            }
        }
        return NextResponse.next();
    }

    // Halaman proteksi
    const protectedRoutes = ["/analytic", "/myfiles"];
    if (protectedRoutes.some((p) => pathname.startsWith(p))) {
        if (!token) {
            // Tidak ada token → redirect ke login
            return NextResponse.redirect(new URL("/login", request.url));
        }

        try {
            const payload = await verifyRefreshToken(token);
            const role = payload.role;

            // Cek apakah role terdaftar di ROLES_CONFIG
            const roleConfig = ROLES_CONFIG[role];
            if (!roleConfig) {
                // Role tidak dikenal → forbidden
                return NextResponse.json(
                    {error: "Role tidak dikenali"},
                    {status: 403}
                );
            }

            // TODO validasi children menu

            // Optional: cek akses ke halaman berdasarkan menu
            const menuMatch = roleConfig.menus.some((menu) => menu.href === pathname);

            if (!menuMatch) {
                // Kalau menu tidak ada → bisa redirect atau forbidden
                return NextResponse.json(
                    {error: "Akses ke halaman ini dilarang"},
                    {status: 403}
                );
            }

            // ✅ akses diizinkan
            return NextResponse.next();
        } catch {
            // Token invalid → hapus cookie dan redirect ke login
            const res = NextResponse.redirect(new URL("/login", request.url));
            res.cookies.delete("refreshToken");
            return res;
        }
    }

    // Halaman publik
    return NextResponse.next();
};

// Daftar handler middleware untuk path tertentu
const middlewareMap = [
    {handler: handleJwtAuth, paths: ["/api/analytic"]},
    {
        handler: handleUiAuth,
        paths: ["/analytic", "/login", "/register", "/myfiles"],
    },
];

/**
 * Middleware utama
 * - Melakukan iterasi ke semua handler berdasarkan path
 * - Jika ada handler match → jalankan validasi
 * - Jika tidak ada match → teruskan request (NextResponse.next)
 */
export async function middleware(request: NextRequest) {
    const {pathname} = request.nextUrl;

    for (const item of middlewareMap) {
        const isMatch = item.paths.some((path) => pathname.startsWith(path));
        if (isMatch) {
            const response = await item.handler(request);
            if (response) {
                return response;
            }
        }
    }

    return NextResponse.next();
}

// Konfigurasi matcher Next.js middleware
// Pastikan daftar path di sini sesuai dengan `middlewareMap`
export const config = {
    matcher: ["/analytic", "/login", "/register", "/myfiles", "/api/analytic"],
};
