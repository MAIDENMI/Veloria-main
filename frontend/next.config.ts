import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'standalone',
  outputFileTracingRoot: process.env.NODE_ENV === 'production' ? '/app' : undefined,
};

export default nextConfig;
