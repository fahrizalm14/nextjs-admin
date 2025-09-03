// layout.tsx

import { ToastProvider } from "@/hooks/provider/ToastProvider";
import { UserProvider } from "@/hooks/provider/UserProvider";
import type { Metadata } from "next";
import { Josefin_Sans } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const josefin = Josefin_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jagad Cloud",
  description: "A simple file management application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={josefin.className}>
        <Providers>
          <UserProvider>
            <ToastProvider>{children}</ToastProvider>
          </UserProvider>
        </Providers>
      </body>
    </html>
  );
}
