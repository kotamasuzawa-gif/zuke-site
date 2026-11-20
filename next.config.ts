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
      // 2026-11-20 廃盤5商品。permanent: true は 308 になるため statusCode: 301 を使う。
      // 近い残商品: 1連樹脂→2連樹脂、丸鉢スタンド→六角鉢セット（3連）、2本セット→アイアン「5つの六角形」。
      // 拡張パーツ・留め具に近い商品は無く、カテゴリ「支柱の拡張」も空になるので商品一覧へ。
      { source: "/products/pole1pla", destination: "/products/pole2pla", statusCode: 301 },
      { source: "/products/marupot-stand", destination: "/products/hexpot-set", statusCode: 301 },
      { source: "/products/hex-set-2pcs", destination: "/products/hex5", statusCode: 301 },
      { source: "/products/hexparts", destination: "/products", statusCode: 301 },
      { source: "/products/hexclip5", destination: "/products", statusCode: 301 },
      { source: "/collections/extension", destination: "/products", statusCode: 301 },
    ];
  },
};

export default nextConfig;
