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
      // 植欲マップのフォームは専用サイトへ分離済み。旧URLからの転送。
      {
        source: "/entry",
        destination: "https://shokuyoku-map.vercel.app/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
