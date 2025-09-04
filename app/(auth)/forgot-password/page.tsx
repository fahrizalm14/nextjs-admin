"use client";

import { useToast } from "@/hooks/provider/ToastProvider";
import { useFetch } from "@/hooks/useFetch";
import Link from "next/link";
import { useRef, useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [cooldown, setCooldown] = useState(0); // State untuk hitungan mundur
  const cooldownTimer = useRef<NodeJS.Timeout | null>(null);

  const { loading, call, error } = useFetch();
  const { toast } = useToast();

  const startCooldown = () => {
    setCooldown(30); // Mulai hitungan mundur dari 30 detik
    cooldownTimer.current = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(cooldownTimer.current as NodeJS.Timeout);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (cooldown > 0) {
      toast(`Tunggu ${cooldown} detik sebelum mencoba lagi.`, "warning");
      return;
    }

    // Asumsi: API untuk forgot password ada di /api/forgot-password
    const response = await call({
      url: "/api/forgot-password",
      method: "POST",
      data: { email },
    });

    // Respons API biasanya tidak mengungkapkan apakah email terdaftar atau tidak untuk alasan keamanan.
    if (response) {
      toast("Jika email Anda terdaftar, tautan reset akan dikirim.", "success");
      startCooldown(); // Panggil fungsi cooldown setelah berhasil
    } else {
      // Jika ada error, tetap beri pesan yang sama untuk keamanan
      toast("Terjadi kesalahan. Silakan coba lagi nanti.", "error");
    }
  };

  const buttonText =
    cooldown > 0 ? `Tunggu ${cooldown}s` : "Kirim Tautan Reset";

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-background text-foreground">
      <div className="w-full max-w-md p-8 space-y-6 rounded-xl shadow-lg bg-card text-card-foreground">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Lupa Kata Sandi?</h1>
          <p className="mt-2 text-muted-foreground">
            Masukkan email Anda untuk menerima tautan reset kata sandi.
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-muted-foreground"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="you@example.com"
              className="mt-1 block w-full rounded-md border-0 py-2 px-3 text-card-foreground shadow-sm ring-1 ring-inset ring-muted focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 bg-muted/50"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full justify-center rounded-md bg-primary py-2 px-4 text-sm font-semibold text-foreground shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            disabled={loading || cooldown > 0}
          >
            {loading ? "Memproses..." : buttonText}
          </button>
        </form>

        {error && (
          <p className="mt-4 text-center text-sm text-destructive">{error}</p>
        )}

        <p className="mt-4 text-center text-sm text-muted-foreground">
          Ingat kata sandi Anda?{" "}
          <Link
            href="/login"
            className="font-medium text-primary hover:text-primary/80"
          >
            Masuk
          </Link>
        </p>
      </div>
    </div>
  );
}
