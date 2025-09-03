# NextJS Admin Template

Template sistem admin modern dengan autentikasi dan otorisasi berbasis role menggunakan Next.js, TypeScript, dan JWT.

## 📋 Daftar Isi

- [Fitur Utama](#-fitur-utama)
- [Prasyarat Sistem](#-prasyarat-sistem)
- [Teknologi yang Digunakan](#-teknologi-yang-digunakan)
- [Struktur Proyek](#-struktur-proyek)
- [Memulai Cepat](#-memulai-cepat)
- [Autentikasi & Otorisasi](#-autentikasi--otorisasi)
- [Sistem Verifikasi Email](#-sistem-verifikasi-email)
- [Arsitektur Service Layer](#-arsitektur-service-layer)
- [Perlindungan Middleware](#-perlindungan-middleware)
- [Komponen UI](#-komponen-ui)
- [Kode Etik](#-kode-etik)
- [Panduan Kontribusi](#-panduan-kontribusi)
- [Pemecahan Masalah](#-pemecahan-masalah)
- [Dukungan](#-dukungan)
- [Lisensi](#-lisensi)

## ✨ Fitur Utama

- ✅ **Autentikasi JWT** dengan Access & Refresh Token
- ✅ **Role-Based Access Control (RBAC)** - Admin, User, Guest
- ✅ **Verifikasi Email** dengan SMTP (opsional)
- ✅ **Perlindungan Middleware** untuk API dan UI routes
- ✅ **Desain Responsif** dengan Tailwind CSS
- ✅ **Dukungan Tema Gelap/Terang**
- ✅ **Notifikasi Toast** dengan animasi
- ✅ **Arsitektur Service Layer** untuk kode yang bersih
- ✅ **TypeScript** untuk type safety
- ✅ **Prisma ORM** untuk manajemen database

## ⚙️ Prasyarat Sistem

- **Node.js**: versi 18.17.0 atau lebih tinggi
- **npm**: versi 9.0.0 atau lebih tinggi
- **Database**: PostgreSQL (atau database lain yang didukung Prisma)
- **Server SMTP**: Opsional (hanya jika verifikasi email diaktifkan)

## 🛠️ Teknologi yang Digunakan

- **Framework**: Next.js 15 (App Router)
- **Bahasa**: TypeScript
- **Database**: Prisma ORM
- **Styling**: Tailwind CSS
- **Autentikasi**: JWT (menggunakan library jose)
- **Email**: Nodemailer (opsional)
- **Ikon**: Remix Icons
- **Animasi**: Framer Motion
- **HTTP Client**: Axios

## 📁 Struktur Proyek

```
nextjs-admin/
├── app/
│   ├── api/
│   │   ├── (auth)/            # Endpoint autentikasi
│   │   │   ├── login/
│   │   │   ├── logout/
│   │   │   ├── refresh-token/
│   │   │   ├── register/
│   │   │   └── verify-email/
│   │   └── (protected)/       # Endpoint terproteksi
│   │       └── analytic/
│   ├── (auth)/                # Halaman autentikasi
│   │   ├── forgot-password/
│   │   ├── layout.tsx
│   │   ├── login/
│   │   └── register/
│   └── (private)/             # Halaman terproteksi
│       ├── analytic/
│       ├── layout.tsx
│       ├── myfiles/
│       ├── trash/
│       └── upgrade/
├── components/
│   ├── layout/
│   │   ├── DetailsPane.tsx
│   │   ├── SideBar.tsx
│   │   └── TopBar.tsx
│   └── MenusByRoles.tsx
├── hooks/
│   ├── provider/
│   │   ├── ToastProvider.tsx
│   │   └── UserProvider.tsx
│   └── useFetch.tsx
├── libs/
│   ├── auth/
│   ├── db/
│   ├── device/
│   ├── email/
│   ├── error/
│   └── tokens/
├── services/
│   ├── authService.ts
│   └── tokenize.ts
├── types/
│   ├── auth.ts
│   └── layout.ts
├── prisma/
│   ├── migrations/
│   └── schema.prisma
├── middleware.ts
└── public/
```

## 🚀 Memulai Cepat

### 1. Kloning dan Instalasi

```bash
git clone <repository-url>
cd nextjs-admin
npm install
```

### 2. Konfigurasi Environment

Buat file `.env` di root proyek:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/admin_template?schema=public"

# JWT Secrets
JWT_ACCESS_SECRET="your-super-secret-access-token-key-min-32-chars"
JWT_REFRESH_SECRET="your-super-secret-refresh-token-key-min-32-chars"

# App URL
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET="your-nextauth-secret"
```

### 3. Setup Database

```bash
# Generate Prisma client
npx prisma generate

# Jalankan migrasi
npx prisma migrate dev

# Opsional: Seed database
npx prisma db seed
```

### 4. Jalankan Server Development

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000/) di browser.

## 🔐 Autentikasi & Otorisasi

### Sistem JWT

Template menggunakan sistem autentikasi JWT dengan dual-token:

- **Access Token**: Token jangka pendek untuk autentikasi API (disimpan di localStorage)
- **Refresh Token**: Token jangka panjang untuk regenerasi access token (disimpan di httpOnly cookies)
- **Auto-refresh**: Otomatis refresh token saat access token expired
- **Token Rotation**: Sistem rotasi token untuk keamanan maksimal

**Keunggulan**:

- ✅ Keamanan yang ditingkatkan dengan sistem dual-token
- ✅ Pemulihan otomatis dari token yang kedaluwarsa
- ✅ Gangguan minimal bagi pengguna saat refresh token
- ✅ Perlindungan terhadap pencurian token

### Sistem Role

Template mendukung 3 role default:

- **admin**: Akses penuh ke semua fitur
- **user**: Akses terbatas sesuai konfigurasi
- **guest**: Akses minimal (read-only)

### Sistem Permission

Sistem permission berbasis HTTP method yang granular:

| HTTP Method | Permission | Deskripsi |
|-------------|------------|-----------|
| `GET` | `read` | Hak akses untuk membaca data |
| `POST` | `create` | Hak akses untuk membuat data baru |
| `PUT/PATCH` | `update` | Hak akses untuk memperbarui data |
| `DELETE` | `delete` | Hak akses untuk menghapus data |

**Contoh Konfigurasi**:

```typescript
export const ROLES_CONFIG: Record<Role, RolePermissions> = {
  user: {
    endpoints: [
      {
        path: "/api/analytic",
        permissions: ["read"],
      },
      {
        path: "/api/users",
        permissions: ["read", "update"],
      }
    ],
    menus: menusByRole.user,
  },
};
```

**Keunggulan**:

- ✅ Kontrol permission yang detail
- ✅ Validasi keamanan level method
- ✅ Mudah dikonfigurasi dan dipelihara
- ✅ Definisi role yang fleksibel

### Menambahkan Role Baru

1. **Perbarui Definisi Type** (`types/auth.ts`):

```typescript
export type Role = "admin" | "user" | "guest" | "manager" | "editor";
```

2. **Tambahkan Konfigurasi Role** (`types/auth.ts`):

```typescript
manager: {
  endpoints: [
    {
      path: "/api/reports",
      permissions: ["read", "create", "update"],
    }
  ],
  menus: menusByRole.manager,
},
```

3. **Tambahkan Menu untuk Role** (`components/MenusByRoles.tsx`):

```typescript
manager: [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: <RiDashboardLine />,
  }
],
```

4. **Perbarui Schema Database** (jika diperlukan):

```prisma
model User {
  role String @default("user")
}
```

## 📧 Sistem Verifikasi Email

### Status Saat Ini: Nonaktif (Auto-Activate)

Sistem verifikasi email saat ini **dinonaktifkan secara default**. Pengguna langsung aktif setelah registrasi tanpa perlu verifikasi email.

### Mengaktifkan Verifikasi Email

1. **Edit Service Registrasi** (`services/authService.ts`):

```typescript
import { sendVerificationEmail } from "@/libs/email";
import { createEmailVerification } from "./tokenize";

export const registerUser = async (email: string, password?: string, name?: string) => {
  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      isVerified: false, // Set false untuk verifikasi email
    },
  });

  const token = await createEmailVerification(newUser.id);
  await sendVerificationEmail(newUser.email, token);
};
```

2. **Edit Service Login** (`services/authService.ts`):

```typescript
export const loginUser = async (email: string, password: string) => {
  if (!user.isVerified) {
    throw new ForbiddenError("Email belum terverifikasi!");
  }
};
```

3. **Setup Environment Variables**:

```env
SMTP_HOST=your-smtp-host.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=your-email@domain.com
SMTP_PASS="your-password"
JWT_EMAIL_VERIFICATION_SECRET="your-email-verification-secret"
ENABLE_EMAIL_VERIFICATION=true
```

### Konfigurasi SMTP

**Untuk Gmail**:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS="your-app-password"
```

**SMTP Kustom**:

```env
SMTP_HOST=your-smtp-server.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=your-email@domain.com
SMTP_PASS="your-password"
```

## 🏗️ Arsitektur Service Layer

Template menggunakan arsitektur service layer untuk memisahkan business logic dari API routes.

**Keunggulan Arsitektur**:

1. **Kejelasan**: Logika bisnis terpusat di satu tempat
2. **Testabilitas**: Fungsi service dapat diuji secara terpisah
3. **Reusability**: Fungsi dapat digunakan di multiple endpoints
4. **Maintainability**: Perubahan logic hanya di satu tempat
5. **Separation of Concerns**: Pemisahan antara HTTP handling dan business logic

### Contoh Service

```typescript
// services/authService.ts
export const registerUser = async (email: string, password?: string, name?: string) => {
  // Business logic untuk registrasi user
  // - Validasi input
  // - Hash password
  // - Simpan ke database
};

export const loginUser = async (email: string, password: string) => {
  // Business logic untuk login
  // - Verifikasi kredensial
  // - Generate tokens
};
```

### Penggunaan di API Route

```typescript
// app/api/(auth)/register/route.ts
import { registerUser } from "@/services/authService";

export const POST = async (request: NextRequest) => {
  const { email, password, name } = await request.json();
  const user = await registerUser(email, password, name);
  
  return NextResponse.json({
    message: "User registered successfully",
    data: user
  });
};
```

## 🔒 Perlindungan Middleware

Middleware Next.js melindungi berbagai jenis routes:

- **API Routes**: `/api/*` - Validasi JWT token dan permission checking
- **UI Routes**: `/analytic`, `/myfiles` - Validasi cookie & role-based access
- **Public Routes**: `/login`, `/register` - Accessible tanpa authentication

**Keunggulan**:

- ✅ Manajemen keamanan terpusat
- ✅ Kontrol akses granular per HTTP method
- ✅ Pengalaman pengguna yang mulus dengan redirect otomatis
- ✅ Perlindungan terhadap akses API yang tidak sah

### Konfigurasi Middleware

```typescript
// middleware.ts
const middlewareMap = [
  { handler: handleJwtAuth, paths: ["/api/analytic"] },
  { handler: handleUiAuth, paths: ["/analytic", "/myfiles"] },
];
```

## 🎨 Komponen UI

### Notifikasi Toast

```typescript
import { useToast } from "@/hooks/provider/ToastProvider";

const { toast } = useToast();

// Success toast
toast("Operasi berhasil!", "success");

// Error toast
toast("Terjadi kesalahan!", "error");

// Custom position and duration
toast("Pesan kustom", "info", "bottom-left", 6000);
```

### User Context

```typescript
import { useUser } from "@/hooks/provider/UserProvider";

const { user, saveLogin, removeLogin } = useUser();

// Simpan user setelah login
saveLogin(userData, accessToken);

// Logout
removeLogin();
```

### HTTP Client (useFetch)

```typescript
import { useFetch } from "@/hooks/useFetch";

const { data, loading, error, call } = useFetch();

// Public API call
const result = await call({
  url: "/api/public-data",
  method: "GET"
});

// Protected API call
const result = await call({
  url: "/api/protected-data",
  method: "POST",
  data: { key: "value" }
}, true); // withAuth = true
```

## 📜 Kode Etik

### Komitmen Kami

Sebagai kontributor dan maintainer proyek ini, kami berkomitmen untuk menciptakan lingkungan yang terbuka, ramah, dan bebas dari pelecehan bagi semua orang, terlepas dari:

- Latar belakang dan pengalaman
- Identitas dan orientasi seksual
- Gender dan ekspresi gender
- Penampilan fisik dan ukuran tubuh
- Etnis, kebangsaan, dan ras
- Usia dan kemampuan teknis
- Agama dan keyakinan

### Standar Perilaku

Perilaku yang berkontribusi menciptakan lingkungan positif:

- Menggunakan bahasa yang welas asih dan inklusif
- Menghormati perbedaan pandangan dan pengalaman
- Menerima kritik konstruktif dengan baik
- Berfokus pada yang terbaik untuk komunitas
- Menunjukkan empati terhadap anggota komunitas lain

Perilaku yang tidak dapat diterima:

- Komentar seksual, kekerasan, atau diskriminatif
- Pelecehan dalam bentuk apapun
- Komentar pribadi atau politik yang menyerang
- Publikasi informasi pribadi tanpa izin
- Perilaku tidak pantas lainnya secara profesional

### Penegakan Kode Etik

Pelanggaran terhadap kode etik dapat dilaporkan kepada tim maintainer melalui [email/contact yang disediakan]. Semua keluhan akan ditinjau dan diselidiki secara adil dan tepat waktu.

## 🤝 Panduan Kontribusi

### Cara Berkontribusi

1. **Fork Repository**

   ```bash
   git fork https://github.com/your-username/nextjs-admin.git
   ```

2. **Buat Branch Fitur**

   ```bash
   git checkout -b feature/nama-fitur-baru
   ```

3. **Commit Changes**

   ```bash
   git commit -m "feat: tambahkan fitur baru"
   ```

4. **Push ke Branch**

   ```bash
   git push origin feature/nama-fitur-baru
   ```

5. **Buat Pull Request**

### Konvensi Commit

Gunakan konvensi commit berikut:

- `feat`: Penambahan fitur baru
- `fix`: Perbaikan bug
- `docs`: Perubahan dokumentasi
- `style`: Perubahan format (tidak mempengaruhi kode)
- `refactor`: Perubahan kode yang tidak mempengaruhi fungsionalitas
- `test`: Penambahan atau perbaikan test
- `chore`: Perubahan pada build process atau tools

### Panduan Kode

1. **TypeScript**: Gunakan type annotations yang jelas
2. **ESLint**: Ikuti aturan linting yang telah ditetapkan
3. **Prettier**: Format kode sesuai konfigurasi
4. **Testing**: Tambahkan test untuk fitur baru
5. **Dokumentasi**: Update dokumentasi untuk perubahan yang relevan

### Proses Review

1. **Code Review**: Semua PR akan direview oleh minimal 1 maintainer
2. **Testing**: Pastikan semua test pass
3. **Dokumentasi**: Update README dan dokumentasi terkait
4. **Merge**: Setelah approve, PR akan di-merge oleh maintainer

## 🐛 Pemecahan Masalah

### Masalah Umum

1. **Error Koneksi Database**
   - Pastikan service PostgreSQL berjalan
   - Periksa DATABASE_URL di .env
   - Verifikasi kredensial database

2. **Error JWT Token**
   - Pastikan JWT_ACCESS_SECRET dan JWT_REFRESH_SECRET sudah di-set
   - Secret harus minimal 32 karakter
   - Periksa konfigurasi expiration token

3. **Akses Role Ditolak**
   - Periksa konfigurasi ROLES_CONFIG
   - Pastikan user memiliki role yang benar
   - Verifikasi konfigurasi permission endpoint

4. **Masalah Middleware**
   - Pastikan semua protected routes terdaftar di middleware
   - Periksa konfigurasi CORS untuk cross-origin requests

### Mode Debug

Aktifkan mode debug dengan menambahkan di .env:

```env
DEBUG="true"
NODE_ENV=development
LOG_LEVEL="debug"
```

## 📞 Dukungan

Untuk pertanyaan dan masalah:

1. Periksa dokumentasi terlebih dahulu
2. Cek bagian pemecahan masalah di atas
3. Buat issue di repository GitHub dengan detail lengkap
4. Sertakan pesan error dan langkah reproduksi
5. Hubungi tim development untuk masalah urgent

## 📄 Lisensi

Proprietary - Untuk penggunaan internal saja.

---

**Catatan**: Dokumentasi ini akan terus diperbarui sesuai perkembangan proyek. Selalu merujuk ke versi terbaru untuk informasi paling akurat.
