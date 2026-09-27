import { FAQS } from "./HomeFaq";
import { PRODUCTS } from "@/app/lib/products";

// SEO: 構造化データ（Organization / WebSite / FAQPage / 商品ItemList）。
// 商品情報は Products.tsx の掲載内容と一致させること（乖離すると リッチリザルト不適合）。
// 2026-09-28 SEO: 商品リストは products.ts（BASEと同期）から生成し、手書きの乖離をなくす
const SITE_URL = "https://www.zukeplants.com";
const products = PRODUCTS.map((p) => ({
  name: p.fullName,
  price: p.price,
  url: `${SITE_URL}/products/${p.slug}`,
  image: `${SITE_URL}${p.image}`,
  description: p.summary,
}));

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.zukeplants.com/#org",
      name: "ZUKE",
      url: "https://www.zukeplants.com",
      logo: "https://www.zukeplants.com/icon.svg",
      description: "\"魅せる\"園芸支柱ブランド。観葉植物・蔓性植物をインテリアに馴染むように仕立てる PLANTS POLE を展開。",
    },
    {
      "@type": "WebSite",
      "@id": "https://www.zukeplants.com/#site",
      name: "ZUKE｜\"魅せる\"園芸支柱 PLANTS POLE",
      url: "https://www.zukeplants.com",
      publisher: { "@id": "https://www.zukeplants.com/#org" },
      inLanguage: "ja",
    },
    {
      // 2026-09-20 SEO: トップのFAQをリッチリザルト対象にする（本文と内容を一致させること）
      "@type": "FAQPage",
      "@id": "https://www.zukeplants.com/#faq",
      mainEntity: FAQS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    {
      "@type": "ItemList",
      name: "PLANTS POLE 商品ラインナップ",
      itemListElement: products.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "Product",
          name: p.name,
          image: p.image,
          description: p.description,
          brand: { "@id": "https://www.zukeplants.com/#org" },
          offers: {
            "@type": "Offer",
            price: p.price,
            priceCurrency: "JPY",
            availability: "https://schema.org/InStock",
            url: p.url,
          },
        },
      })),
    },
  ],
};

export function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
