import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: false, // Disable for now

  eslint: {
    ignoreDuringBuilds: true,
  },

  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
