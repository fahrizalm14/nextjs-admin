import { RiGoogleFill } from "@remixicon/react";
import Link from "next/link";

export default function RegisterPage() {
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

          <form className="space-y-4">
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
              />
            </div>
            <button
              type="submit"
              className="w-full justify-center rounded-md bg-primary py-2 px-4 text-sm font-semibold text-foreground shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Sign up
            </button>
          </form>

          <div className="relative mt-6">
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
          </button>

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
