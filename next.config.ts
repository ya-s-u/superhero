import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL('https://screenshotone.com/**')],
  },
};

export default nextConfig;
