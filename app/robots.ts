import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    // 2026-10-10 SEO(#7630): /go/base/* は BASE への 302 中継（クリック計測用）。
    // クロールさせるとクリック数にクローラが混ざるため除外する（実リンクは rel="nofollow" も付与）。
    rules: { userAgent: "*", allow: "/", disallow: "/go/" },
    sitemap: "https://www.zukeplants.com/sitemap.xml",
  };
}
