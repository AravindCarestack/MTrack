import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    PROJECT_URL:process.env.PROJECT_URL
  }
};

export default nextConfig;
