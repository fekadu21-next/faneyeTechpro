import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  typescript: {
    // ignoreBuildErrors: true, // you can enable this too if needed
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
