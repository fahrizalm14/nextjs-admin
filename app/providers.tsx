// app/providers.tsx
"use client";

import { RiLoader4Fill } from "@remixicon/react";
import { ThemeProvider } from "next-themes";
import { ReactNode, useEffect, useState } from "react";

export default function Providers({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Tampilkan fallback UI yang sesuai dengan tema
    return (
      <div className="bg-background text-foreground flex items-center justify-center min-h-screen">
        <RiLoader4Fill size={48} className="animate-spin text-primary" />
      </div>
    );
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      {children}
    </ThemeProvider>
  );
}
