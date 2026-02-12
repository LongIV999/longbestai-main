import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ['@longbestai/shared'],

  // Cloudflare Pages optimization
  images: {
    unoptimized: true,  // Cloudflare handles image optimization
  },
};

export default nextConfig;
