import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/app/components/SiteHeader";
import SiteFooter from "@/app/components/SiteFooter";
import { PRODUCTS, CATEGORIES, yen } from "@/app/lib/products";
import CollectionNav from "@/app/components/CollectionNav";
import ProductColorGrid from "@/app/components/ProductColorGrid";
import { SITE, OG_BASE, jsonLdHtml } from "@/app/lib/seo";

// 2026-09-29 SEO R4: 「全4型・素材はアイアンのみ・¥770から」の旧文言が、実際の13商品（PLA樹脂の支柱・鉢・パーツ・花瓶）と
// 矛盾していたため修正。title も支柱カテゴリページと取り合わないよう、鉢・花瓶を含む全商品一覧として付け直した。
export const metadata: Metadata = {
  title: "PLANTS POLE 全商品一覧｜園芸支柱・六角鉢・花瓶",
  description:
    "ZUKE の PLANTS POLE 全商品一覧。アイアンスチール製の園芸支柱4型、3Dプリント樹脂版の支柱と拡張パーツ、支柱が差せる六角鉢・セット、六角形の花瓶。モンステラ・ポトス・ホヤ・亀甲竜などの観葉植物に。",
  alternates: { canonical: "/products" },
  openGraph: {
    ...OG_BASE,
    title: "PLANTS POLE 商品一覧｜ZUKE",
    description: "観葉植物をインテリアに馴染むように仕立てる園芸支柱と、支柱が差せる六角鉢・花瓶。",
    url: "/products",
    // 2026-10-11 design/SEO(#7916): 汎用 og.jpg だったので商品一覧専用のカード型OGに
    images: [{ url: "/og/og-products.jpg", width: 1200, height: 630, alt: "PLANTS POLE 全商品一覧｜園芸支柱・六角鉢・花瓶" }],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "ホーム", item: SITE },
    { "@type": "ListItem", position: 2, name: "商品一覧", item: `${SITE}/products` },
  ],
};

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-white text-[#222] flex flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdHtml(jsonLd)} />
      <SiteHeader />
      <main className="flex-1 max-w-5xl mx-auto px-6 w-full pt-14 md:pt-20">
        <nav aria-label="パンくず" className="text-xs text-gray-500 mb-6 flex items-center gap-2">
          <Link href="/" className="hover:text-[#222]">ホーム</Link>
          <span>/</span>
          <span className="text-[#222]">商品一覧</span>
        </nav>

        <h1 className="text-2xl md:text-3xl font-bold leading-relaxed">
          PLANTS POLE 商品一覧
        </h1>
        <p className="mt-4 text-[15px] leading-loose text-gray-700 max-w-2xl">
          ZUKE の PLANTS POLE は、&ldquo;魅せる&rdquo;園芸支柱です。植物を支えるという実用性に、六角形のデザインを加えました。
          アイアン支柱はアイアンスチール製で、高さ約19.5cm の小鉢向けから約39cm の主役サイズまで4型。ほかに、PLA樹脂を3Dプリントした樹脂版の支柱・拡張パーツ、支柱が差せる六角鉢と受け皿、六角形の花瓶を展開しています。
          モンステラ・ポトス・ホヤ・亀甲竜など蔓性の観葉植物を、インテリアグリーンとして美しく仕立てられます。
        </p>

        <div className="mt-10"><CollectionNav /></div>

        {/* 2026-09-26 増澤さん指示: 全商品一覧も見出しでカテゴリ分け（支柱はアイアン→PLAの順）。色切替は一覧の直上に1つ */}
        <div className="mt-14">
          <ProductColorGrid
            groups={CATEGORIES.map((c) => ({
              key: c.key,
              title: c.label,
              moreHref: `/collections/${c.key}`,
              items: PRODUCTS.filter((p) => p.category === c.key)
                .sort((x, y) => (x.kind === y.kind ? 0 : x.kind === "iron" ? -1 : 1))
                .map((p) => ({ slug: p.slug, name: p.name, fullName: p.fullName, price: yen(p.price), sub: p.kind === "iron" ? "アイアン" : "PLA樹脂", href: `/products/${p.slug}` })),
            })).filter((g) => g.items.length > 0)}
          />
        </div>

        <p className="mt-12 text-[13px] text-gray-500">
          ※ 価格は税込。送料は地域・サイズにより ¥940〜（ヤマト宅急便）、¥5,500以上のご注文で国内送料無料です（BASE 本店の記載に準じます）。
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}
