"use client";

import { useToast } from "@/hooks/provider/ToastProvider";
import { useFetch } from "@/hooks/useFetch";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  const { loading, call, error } = useFetch();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Buat payload sesuai format yang diminta
    const payload = {
      name,
      email,
      password,
    };

    const response = await call({
      url: "/api/register", // Ganti dengan endpoint API pendaftaran Anda
      method: "POST",
      data: payload,
    });

    if (response) {
      toast("Pendaftaran berhasil! Silakan login.", "success");
      // Arahkan ke halaman login setelah pendaftaran berhasil
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } else {
      // useFetch akan otomatis menampilkan error, tapi bisa ditangani di sini juga
      if (error) {
        toast(error, "error");
      }
    }
  };

  return (
    <div className="grid md:grid-cols-2 min-h-screen">
      {/* Visual background section */}
      <div className="relative hidden md:flex items-center justify-center p-8 bg-auth-wave">
        <div className="text-center text-muted-foreground z-10 space-y-2">
          <h1 className="text-5xl font-extrabold tracking-tight">
            Start Your Journey
          </h1>
          <p className="text-lg font-medium">
            Join thousands of users for free.
          </p>
        </div>
      </div>

      {/* Form section */}
      <div className="flex items-center justify-center p-8 lg:p-12 bg-card text-card-foreground">
        <div className="w-full max-w-sm space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold">Create an Account</h1>
            <p className="mt-2 text-muted-foreground">
              Join us and manage your files with ease.
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-muted-foreground"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="John Doe"
                className="mt-1 block w-full rounded-md border-0 py-2 px-3 text-card-foreground shadow-sm ring-1 ring-inset ring-muted focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 bg-muted/50"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
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
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-muted-foreground"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="••••••••"
                className="mt-1 block w-full rounded-md border-0 py-2 px-3 text-card-foreground shadow-sm ring-1 ring-inset ring-muted focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 bg-muted/50"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full justify-center rounded-md bg-primary py-2 px-4 text-sm font-semibold text-foreground shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              disabled={loading}
            >
              {loading ? "Memproses..." : "Sign up"}
            </button>
          </form>

          {error && (
            <p className="mt-4 text-center text-sm text-destructive">{error}</p>
          )}

          <p className="mt-4 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-primary hover:text-primary/80"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
