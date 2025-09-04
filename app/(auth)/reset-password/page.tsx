"use client";

import ResetPassword from "@/components/ResetPassword";
import { useSearchParams } from "next/navigation";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  return (
    <div className="grid md:grid-cols-2 min-h-screen">
      {/* Visual background section */}
      <div className="relative hidden md:flex items-center justify-center p-8 bg-auth-wave">
        <div className="text-center text-muted-foreground z-10 space-y-2">
          <h1 className="text-5xl font-extrabold tracking-tight">
            Reset Your Password
          </h1>
          <p className="text-lg font-medium">
            Create a new, strong password to secure your account.
          </p>
        </div>
      </div>
      <ResetPassword token={token} />
    </div>
  );
}
