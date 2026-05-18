import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "baseec-img-mng.akamaized.net",
      },
    ],
  },
};

export default nextConfig;
