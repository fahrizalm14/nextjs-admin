"use client";

import { useToast } from "@/hooks/provider/ToastProvider";
import { useUser } from "@/hooks/provider/UserProvider";
import { useFetch } from "@/hooks/useFetch";
import { ILoginRes } from "@/types/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [deviceId, setDeviceId] = useState<string | null>(null);
  const [cooldown, setCooldown] = useState(0);
  const { toast } = useToast();
  const { saveLogin, removeLogin } = useUser();

  const { call, loading, error, errorCode } = useFetch<ILoginRes>();

  useEffect(() => {
    let deviceId = localStorage.getItem("device_id");
    if (!deviceId) {
      deviceId = `device-${Date.now()}-${Math.floor(
        Math.random() * 1_000_000
      )}`;
      localStorage.setItem("device_id", deviceId);
    }
    setDeviceId(deviceId);
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (cooldown > 0) {
      timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [cooldown]);

  const handleResendVerification = () => {
    // TODO: Panggil API untuk kirim ulang verifikasi email
    toast("Verification email has been resent", "info");
    setCooldown(60);
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = String(formData.get("email") || "").trim();
    const password = String(formData.get("password") || "").trim();

    // Validasi sederhana
    if (!email) {
      toast("Email is required", "warning");
      return;
    }
    if (!password) {
      toast("Password is required", "warning");
      return;
    }
    if (password.length < 6) {
      toast("Password must be at least 6 characters", "warning");
      return;
    }

    const res = await call({
      url: "/api/login",
      method: "POST",
      data: { email, password, deviceId },
    });

    if (res) {
      toast(res.message || "Login successful", "success");

      saveLogin(res.data.user, res.data.accessToken);

      // Redirect ke analytic
      router.push("/analytic");
    } else {
      toast("Invalid email or password", "error");
    }
  };

  return (
    <div className="grid md:grid-cols-2 min-h-screen w-full">
      {/* Visual background section */}
      <div className="relative hidden md:flex items-center justify-center p-8 bg-auth-wave">
        <div className="text-center text-muted-foreground z-10 space-y-2">
          <h1 className="text-5xl font-extrabold tracking-tight">
            Seamless File Management
          </h1>
          <p className="text-lg font-medium">
            Your data, your way, with confidence.
          </p>
        </div>
      </div>

      {/* Form section */}
      <div className="flex items-center justify-center p-8 lg:p-12 bg-card text-card-foreground">
        <div className="w-full max-w-sm space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold">Welcome Back</h1>
            <p className="mt-2 text-muted-foreground">
              Please sign in to your account.
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleLogin}>
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
                name="email"
                placeholder="you@example.com"
                className="mt-1 block w-full rounded-md border-0 py-2 px-3 text-card-foreground shadow-sm ring-1 ring-inset ring-muted focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 bg-muted/50"
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
                name="password"
                placeholder="••••••••"
                className="mt-1 block w-full rounded-md border-0 py-2 px-3 text-card-foreground shadow-sm ring-1 ring-inset ring-muted focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 bg-muted/50"
              />
            </div>
            <p className="text-sm text-red-500">{error}</p>
            <div className="flex items-center justify-between text-sm">
              {/* <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-muted text-primary focus:ring-primary bg-muted/50"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 text-muted-foreground"
                >
                  Remember me
                </label>
              </div> */}
              <Link
                href="/forgot-password"
                className="font-medium text-primary hover:text-primary/80"
              >
                Forgot Password?
              </Link>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full justify-center rounded-md bg-primary py-2 px-4 text-sm font-semibold text-foreground shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          {errorCode === 403 && (
            <div className="mt-4 text-center space-y-2">
              <p className="text-sm text-red-500">
                Your email is not verified. Please verify to continue.
              </p>
              <button
                type="button"
                onClick={handleResendVerification}
                disabled={cooldown > 0}
                className="w-full justify-center rounded-md bg-secondary py-2 px-4 text-sm font-semibold text-foreground shadow-sm hover:bg-secondary/90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {cooldown > 0
                  ? `Resend verification in ${cooldown}s`
                  : "Resend Verification Email"}
              </button>
            </div>
          )}

          {/* <div className="relative mt-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-muted" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <button
            type="button"
            className="w-full inline-flex items-center justify-center gap-2 rounded-md border border-muted bg-card py-2 px-4 text-sm font-semibold text-card-foreground shadow-sm hover:bg-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-muted"
          >
            <RiGoogleFill size={18} />
            Google
          </button> */}

          <p className="mt-4 text-center text-sm text-muted-foreground">
            Dont have an account?{" "}
            <Link
              href="/register"
              className="font-medium text-primary hover:text-primary/80"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
