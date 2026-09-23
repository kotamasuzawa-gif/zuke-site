import { FAQS } from "./HomeFaq";

// SEO: 構造化データ（Organization / WebSite / FAQPage / 商品ItemList）。
// 商品情報は Products.tsx の掲載内容と一致させること（乖離すると リッチリザルト不適合）。
const products = [
  { name: 'PLANTS POLE "うねうね"', price: 1320, url: "https://zukeplants.base.shop/items/130117282", image: "https://baseec-img-mng.akamaized.net/images/item/origin/ae57f1835d16cb0c83c4dea585cdb1df.png", description: "横に広がる植物を矯正できる園芸支柱" },
  { name: 'PLANTS POLE "5つの六角形"', price: 1320, url: "https://zukeplants.base.shop/items/117375069", image: "https://baseec-img-mng.akamaized.net/images/item/origin/99d4b0564f5e6d6c2729f19eee010bc7.png", description: "蔓性植物をインテリアに馴染むように飾る六角形の園芸支柱" },
  { name: 'PLANTS POLE "3つの六角形"', price: 880, url: "https://zukeplants.base.shop/items/128906974", image: "https://baseec-img-mng.akamaized.net/images/item/origin/6973a4ba33d405fdeff104d2e5fa6d67.png", description: "蔓性植物をインテリアに馴染むように飾る六角形の園芸支柱" },
  { name: 'PLANTS POLE "2つの六角形"', price: 770, url: "https://zukeplants.base.shop/items/124680568", image: "https://baseec-img-mng.akamaized.net/images/item/origin/b7dd362adfcf4f97ebeb1728eaa73918.png", description: "蔓性植物をインテリアに馴染むように飾る六角形の園芸支柱" },
  { name: "PLANTS POLE 六角鉢セット", price: 1980, url: "https://www.zukeplants.com/products/hexpot-set", image: "https://www.zukeplants.com/products/product-hexpot-set-black.webp", description: "六角形の鉢・受け皿・支柱の3点セット。PLA樹脂・3Dプリント製" },
  { name: 'PLANTS POLE "3つの六角形" 樹脂版', price: 680, url: "https://www.zukeplants.com/products/pole3pla", image: "https://www.zukeplants.com/products/product-pole3pla-black.webp", description: "PLA樹脂・3Dプリント製の軽量な六角形3連支柱。3色展開" },
  { name: 'PLANTS POLE "2つの六角形" 樹脂版', price: 580, url: "https://www.zukeplants.com/products/pole2pla", image: "https://www.zukeplants.com/products/product-pole2pla-black.webp", description: "PLA樹脂・3Dプリント製の軽量な六角形2連支柱。3色展開" },
];

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
