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
  async redirects() {
    return [
      // 旧植欲マップ申込フォームのURL。フォームは廃止済みなので植欲マップ本体へ転送。
      {
        source: "/entry",
        destination: "https://shokuyoku-map.com/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
