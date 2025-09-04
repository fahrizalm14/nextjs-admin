import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["i.pravatar.cc"], // daftar domain yang boleh dipakai untuk <Image />
  },
  build: {
    env: {
      NEXT_OUTPUT_DIRECTORY: "dist",
    },
  },
};

export default nextConfig;
