// app/page.tsx
"use client"; // Diperlukan untuk menggunakan hooks seperti useState

import ThemeToggle from "@/components/ThemeToggle";
import {
  RiCloseLine,
  RiLock2Line,
  RiMenuLine,
  RiRocket2Line,
  RiShieldLine,
  RiUploadCloud2Line,
  RiUploadCloudLine,
} from "@remixicon/react";
import Link from "next/link";
import { useState } from "react";

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="bg-background text-foreground min-h-screen">
      {/* Sticky Header */}
      <header className="fixed top-0 left-0 w-full z-50 bg-card/90 backdrop-blur-sm border-b border-muted py-4">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link
            href="/"
            className="text-2xl font-bold text-primary hover:text-primary/90 transition-colors flex items-center gap-2"
            onClick={() => setIsMenuOpen(false)} // Tutup menu saat klik logo
          >
            <RiUploadCloud2Line size={28} />
            StasiunFile
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <Link
              href="/login"
              className="px-4 py-2 rounded-md font-medium text-primary hover:text-primary/80 transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="px-4 py-2 rounded-md font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Sign Up
            </Link>
            <ThemeToggle />
          </nav>

          {/* Mobile Menu & Theme Toggle */}
          <div className="flex md:hidden items-center gap-4">
            <ThemeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-foreground hover:bg-muted"
              aria-label="Toggle navigation menu"
            >
              {isMenuOpen ? (
                <RiCloseLine size={24} />
              ) : (
                <RiMenuLine size={24} />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Dropdown Menu */}
      <div
        className={`fixed top-16 left-0 w-full bg-card/95 backdrop-blur-sm z-40 md:hidden transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "transform translate-y-0" : "transform -translate-y-full"
        }`}
      >
        <nav className="flex flex-col items-center py-6 space-y-4">
          <Link
            href="/login"
            className="w-full text-center py-3 rounded-md font-medium text-primary hover:bg-muted transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Sign In
          </Link>
          <Link
            href="/register"
            className="w-full text-center py-3 rounded-md font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Sign Up
          </Link>
        </nav>
      </div>

      <main className="pt-24">
        {/* Hero & Upload Section */}
        <section className="container mx-auto px-4 py-8 grid md:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <div className="space-y-6 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
              Solusi <span className="text-primary">Modern</span> untuk Data
              Anda.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Kelola, simpan, dan bagikan file Anda dengan aman. Platform kami
              dirancang untuk kecepatan dan kemudahan penggunaan.
            </p>
            <div className="flex justify-center md:justify-start space-x-4">
              <Link
                href="/register"
                className="px-8 py-3 rounded-md font-semibold text-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Mulai Sekarang
              </Link>
              <Link
                href="#"
                className="px-8 py-3 rounded-md font-semibold text-lg border border-muted-foreground text-foreground hover:bg-muted transition-colors"
              >
                Pelajari Lebih Lanjut
              </Link>
            </div>
          </div>

          {/* File Upload Section */}
          <div className="max-w-md mx-auto w-full p-8 rounded-xl bg-card text-card-foreground shadow-2xl">
            <h2 className="text-2xl font-bold text-center mb-4">
              Unggah File Anda
            </h2>
            <p className="text-muted-foreground text-center mb-6">
              Cukup seret & lepas file Anda di sini atau klik untuk memilih.
            </p>
            <label
              htmlFor="file-upload"
              className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-muted rounded-xl cursor-pointer bg-muted/20 hover:bg-muted/40 transition-colors p-6"
            >
              <RiUploadCloudLine size={48} className="text-primary" />
              <span className="mt-2 text-lg font-medium text-muted-foreground">
                Seret & Lepas File Anda
              </span>
              <span className="text-sm text-muted-foreground">
                atau Klik untuk Memilih
              </span>
              <input id="file-upload" type="file" className="hidden" />
            </label>
          </div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-4 py-16 space-y-12">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold">Mengapa Memilih StasiunFile?</h2>
            <p className="text-muted-foreground">
              Kami menyediakan alat-alat yang Anda butuhkan untuk produktivitas
              yang lebih baik.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <article className="text-center p-6 rounded-lg bg-card text-card-foreground shadow-lg space-y-4 transition-transform transform hover:scale-105 duration-300">
              <RiRocket2Line size={48} className="mx-auto text-primary" />
              <h3 className="text-xl font-bold">Performa Super Cepat</h3>
              <p className="text-muted-foreground">
                Unggah dan kelola file Anda dalam sekejap dengan infrastruktur
                cloud kami yang dioptimalkan.
              </p>
            </article>
            {/* Feature 2 */}
            <article className="text-center p-6 rounded-lg bg-card text-card-foreground shadow-lg space-y-4 transition-transform transform hover:scale-105 duration-300">
              <RiShieldLine size={48} className="mx-auto text-primary" />
              <h3 className="text-xl font-bold">Keamanan Terjamin</h3>
              <p className="text-muted-foreground">
                Data Anda dilindungi dengan enkripsi end-to-end dan sistem
                keamanan canggih kami.
              </p>
            </article>
            {/* Feature 3 */}
            <article className="text-center p-6 rounded-lg bg-card text-card-foreground shadow-lg space-y-4 transition-transform transform hover:scale-105 duration-300">
              <RiLock2Line size={48} className="mx-auto text-primary" />
              <h3 className="text-xl font-bold">Kontrol Penuh</h3>
              <p className="text-muted-foreground">
                Anda memiliki kendali penuh atas siapa yang dapat mengakses file
                Anda dengan fitur perizinan yang fleksibel.
              </p>
            </article>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-16 text-center space-y-4">
          <h2 className="text-3xl font-bold">Siap untuk Memulai?</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Daftar sekarang dan rasakan sendiri kemudahan mengelola data Anda.
            Tidak ada kartu kredit yang diperlukan.
          </p>
          <Link
            href="/register"
            className="inline-block px-8 py-3 rounded-md font-semibold text-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Buat Akun Gratis
          </Link>
        </section>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 text-center text-muted-foreground border-t border-muted">
        <p>&copy; 2024 StasiunFile. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
