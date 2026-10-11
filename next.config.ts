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
      // 2026-10-11 増澤さん指示「六角花瓶は不要」: 花瓶（hexvase）と花瓶カテゴリを廃止。鉢・セットへ転送
      { source: "/products/hexvase", destination: "/collections/pot", permanent: true },
      { source: "/collections/vase", destination: "/collections/pot", permanent: true },
    ];
  },
};

export default nextConfig;
