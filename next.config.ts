import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["i.pravatar.cc"], // daftar domain yang boleh dipakai untuk <Image />
  },
  distDir: "dist",
};

export default nextConfig;
