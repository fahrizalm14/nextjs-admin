"use client";

import { useToast } from "@/hooks/provider/ToastProvider";
import { useFetch } from "@/hooks/useFetch";
import { RiEyeLine, RiEyeOffLine } from "@remixicon/react"; // Import ikon mata
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  token?: string | null;
}

const ResetPassword: React.FC<Props> = ({ token }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State untuk mengintip password
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State untuk konfirmasi password
  const router = useRouter();
  const { loading, call, error } = useFetch();

  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast("Kata sandi tidak cocok.", "error");
      return;
    }

    if (!token) {
      toast("Token tidak valid.", "error");
      return;
    }

    const response = await call({
      url: "/api/reset-password",
      method: "POST",
      data: { token, newPassword: password },
    });

    if (response) {
      toast(response.message, "success");
      setTimeout(() => {
        router.push("/login");
      }, 1000);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="flex items-center justify-center p-8 lg:p-12 bg-card text-card-foreground">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Reset Password</h1>
          <p className="mt-2 text-muted-foreground">
            Masukkan kata sandi baru Anda.
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Input Kata Sandi Baru */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-muted-foreground"
            >
              Kata Sandi Baru
            </label>
            <div className="relative mt-1">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="••••••••"
                className="block w-full rounded-md border-0 py-2 px-3 pr-10 text-card-foreground shadow-sm ring-1 ring-inset ring-muted focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 bg-muted/50"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <RiEyeOffLine size={18} className="text-muted-foreground" />
                ) : (
                  <RiEyeLine size={18} className="text-muted-foreground" />
                )}
              </span>
            </div>
          </div>

          {/* Input Konfirmasi Kata Sandi */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-muted-foreground"
            >
              Konfirmasi Kata Sandi
            </label>
            <div className="relative mt-1">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                placeholder="••••••••"
                className="block w-full rounded-md border-0 py-2 px-3 pr-10 text-card-foreground shadow-sm ring-1 ring-inset ring-muted focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 bg-muted/50"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <span
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                onClick={toggleConfirmPasswordVisibility}
              >
                {showConfirmPassword ? (
                  <RiEyeOffLine size={18} className="text-muted-foreground" />
                ) : (
                  <RiEyeLine size={18} className="text-muted-foreground" />
                )}
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full justify-center rounded-md bg-primary py-2 px-4 text-sm font-semibold text-foreground shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            disabled={loading}
          >
            {loading ? "Memproses..." : "Ubah Kata Sandi"}
          </button>
        </form>

        {error && (
          <p className="mt-4 text-center text-sm text-destructive">{error}</p>
        )}

        <p className="mt-4 text-center text-sm text-muted-foreground">
          Kembali ke{" "}
          <Link
            href="/login"
            className="font-medium text-primary hover:text-primary/80"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
