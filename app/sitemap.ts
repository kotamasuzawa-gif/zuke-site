import type { MetadataRoute } from "next";
import { PRODUCTS } from "@/app/lib/products";
import { GUIDES } from "@/app/lib/guides";

const SITE = "https://www.zukeplants.com";

// 2026-08-22 SEO強化 R1: 1URLのみだった sitemap を全ページ化。
// lastModified は実更新日を持たないため付けない（嘘の更新日は Google が lastmod を
// 信用しなくなる原因になる。省略が正）。
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE}/products`, changeFrequency: "weekly", priority: 0.9 },
    ...PRODUCTS.map((p) => ({
      url: `${SITE}/products/${p.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    { url: `${SITE}/guide`, changeFrequency: "monthly", priority: 0.8 },
    ...GUIDES.map((g) => ({
      url: `${SITE}/guide/${g.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    { url: `${SITE}/about`, changeFrequency: "monthly", priority: 0.6 },
  ];
}
