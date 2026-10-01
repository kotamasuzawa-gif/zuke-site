import { FAQS } from "./HomeFaq";
import { PRODUCTS } from "@/app/lib/products";
import { WHOLESALE_EMAIL } from "@/app/lib/contact";
import { SITE as SITE_URL, jsonLdHtml } from "@/app/lib/seo";

// SEO: 構造化データ（Organization / WebSite / FAQPage / 商品ItemList）。
// 2026-09-28 SEO: 商品リストは products.ts（BASEと同期）から生成し、手書きの乖離をなくす
// 2026-09-29 SEO R4:
//   - Organization.logo が /icon.svg（本番404）を指していたため /icon.png（512x512）に修正。sameAs・卸売の contactPoint を追加
//   - WebSite.name はブランド名そのものに（Google のサイト名表示の推奨）
//   - ItemList は ListItem に url だけを持たせる形に（Product の詳細は各商品ページの JSON-LD が正。二重定義をなくす）
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#org`,
      name: "ZUKE",
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/icon.png`, width: 512, height: 512 },
      description: "\"魅せる\"園芸支柱ブランド。観葉植物・蔓性植物をインテリアに馴染むように仕立てる PLANTS POLE を展開。",
      sameAs: [
        "https://www.instagram.com/zuke.plantspole/",
        "https://note.com/zuke_plantspole",
        "https://shop.zukeplants.com",
      ],
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "sales",
          description: "卸売のお問い合わせ",
          email: WHOLESALE_EMAIL,
          areaServed: "JP",
          availableLanguage: "ja",
          url: `${SITE_URL}/wholesale`,
        },
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#site`,
      name: "ZUKE",
      alternateName: ["ズーケ", "ZUKE PLANTS POLE"],
      url: SITE_URL,
      publisher: { "@id": `${SITE_URL}/#org` },
      inLanguage: "ja",
    },
    {
      // 2026-09-20 SEO: トップのFAQをリッチリザルト対象にする（本文と内容を一致させること）
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq`,
      mainEntity: FAQS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    {
      "@type": "ItemList",
      name: "PLANTS POLE 商品ラインナップ",
      itemListElement: PRODUCTS.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${SITE_URL}/products/${p.slug}`,
        name: p.fullName,
      })),
    },
  ],
};

export function JsonLd() {
  return <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdHtml(jsonLd)} />;
}
