import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import SiteHeader from "@/app/components/SiteHeader";
import SiteFooter from "@/app/components/SiteFooter";
import { PRODUCTS, yen } from "@/app/lib/products";

const SITE = "https://www.zukeplants.com";

export const metadata: Metadata = {
  title: "PLANTS POLE 商品一覧｜観葉植物の園芸支柱",
  description:
    "ZUKE の園芸支柱 PLANTS POLE 全4型の一覧。高さ約19.5cm〜39cm、素材はアイアンスチール。モンステラ・ポトス・ホヤ・亀甲竜など、蔓性の観葉植物をインテリアグリーンとして仕立てられます。¥770から。",
  alternates: { canonical: "/products" },
  openGraph: {
    title: "PLANTS POLE 商品一覧｜ZUKE",
    description: "観葉植物をインテリアに馴染むように仕立てる園芸支柱、全4型。¥770から。",
    url: "/products",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "ZUKE PLANTS POLE" }],
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
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
          素材はすべてアイアンスチール。高さ約19.5cm の小鉢向けから、約39cm の主役サイズまで4型を展開しています。
          モンステラ・ポトス・ホヤ・亀甲竜など蔓性の観葉植物を、インテリアグリーンとして美しく仕立てられます。
        </p>

        <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
          {PRODUCTS.map((p) => (
            <Link key={p.slug} href={`/products/${p.slug}`} className="block group">
              <div className="relative aspect-square bg-[#fbfbfb] overflow-hidden">
                <Image src={p.image} alt={p.fullName} fill className="object-contain group-hover:opacity-90 transition-opacity" sizes="(max-width: 1024px) 50vw, 25vw" />
              </div>
              <h2 className="mt-4 text-[15px] leading-relaxed">{p.name}</h2>
              <p className="mt-1 text-[13px] text-gray-500">高さ {p.height}</p>
              <p className="mt-2 text-[15px] font-bold">{yen(p.price)}</p>
            </Link>
          ))}
        </div>

        <p className="mt-12 text-[13px] text-gray-500">
          ※ 価格は税込。送料は全国一律 ¥760、¥5,000以上のご注文で国内送料無料です（BASE 本店の記載に準じます）。
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}
