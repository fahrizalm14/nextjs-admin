// app/forgot-password/page.tsx
import Link from "next/link";

export default function ForgotPasswordPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-background text-foreground">
      <div className="w-full max-w-md p-8 space-y-6 rounded-xl shadow-lg bg-card text-card-foreground">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Forgot Password?</h1>
          <p className="mt-2 text-muted-foreground">
            Enter your email to receive a password reset link.
          </p>
        </div>

        <form className="space-y-4">
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
            />
          </div>
          <button
            type="submit"
            className="w-full justify-center rounded-md bg-primary py-2 px-4 text-sm font-semibold text-foreground shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Send Reset Link
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-muted-foreground">
          Remember your password?{" "}
          <Link
            href="/login"
            className="font-medium text-primary hover:text-primary/80"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
