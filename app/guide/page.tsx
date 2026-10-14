import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import SiteHeader from "@/app/components/SiteHeader";
import SiteFooter from "@/app/components/SiteFooter";
import { GUIDES } from "@/app/lib/guides";
import { SITE, OG_BASE, jsonLdHtml } from "@/app/lib/seo";

export const metadata: Metadata = {
  title: "インテリアグリーンのガイド｜観葉植物の飾り方・仕立て方",
  description:
    "観葉植物をインテリアグリーンとして飾るためのガイド。部屋に合う植物の選び方、モンステラ・ポトスの支柱と誘引、家具に合わせた鉢と支柱のコーディネートまで、ZUKE がまとめています。",
  alternates: { canonical: "/guide" },
  openGraph: {
    ...OG_BASE,
    title: "インテリアグリーンのガイド｜ZUKE",
    description: "観葉植物の選び方・飾り方・仕立て方。インテリアに馴染ませるための実践ガイド。",
    url: "/guide",
    // 2026-10-11 design/SEO(#7916): 汎用 og.jpg だったのでガイド一覧専用のカード型OGに
    images: [{ url: "/og/og-guide-index.jpg", width: 1200, height: 630, alt: "インテリアグリーンのガイド｜ZUKE" }],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "ホーム", item: SITE },
    { "@type": "ListItem", position: 2, name: "ガイド", item: `${SITE}/guide` },
  ],
};

export default function GuideIndexPage() {
  return (
    <div className="min-h-screen bg-white text-[#222] flex flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdHtml(jsonLd)} />
      <SiteHeader />
      <main className="flex-1 max-w-3xl mx-auto px-6 w-full pt-14 md:pt-20">
        <nav aria-label="パンくず" className="text-xs text-gray-500 mb-6 flex items-center gap-2">
          <Link href="/" className="hover:text-[#222]">ホーム</Link>
          <span>/</span>
          <span className="text-[#222]">ガイド</span>
        </nav>

        <h1 className="text-2xl md:text-3xl font-bold leading-relaxed">
          インテリアグリーンのガイド
        </h1>
        <p className="mt-4 text-[15px] leading-loose text-gray-700">
          観葉植物は、置くだけでは部屋に馴染みません。植物の選び方、鉢と家具の合わせ方、蔓の仕立て方——
          少しの工夫で、同じ株がインテリアの主役になります。&ldquo;魅せる&rdquo;園芸支柱をつくる ZUKE が、
          植物をインテリアグリーンとして楽しむための実践的な方法をまとめました。
        </p>

        <ul className="mt-14 flex flex-col divide-y divide-gray-100 border-t border-gray-100">
          {GUIDES.map((g) => (
            <li key={g.slug}>
              {/* 2026-10-14 オーナー指摘: 一覧にも実写サムネイル（記事冒頭の hero を流用） */}
              <Link href={`/guide/${g.slug}`} className="flex gap-5 py-7 group">
                {g.hero && (
                  <div className="shrink-0 w-24 h-24 md:w-32 md:h-32 overflow-hidden bg-[#f4f4f4]">
                    <Image
                      src={g.hero.src}
                      alt={g.hero.alt}
                      width={256}
                      height={256}
                      className="w-full h-full object-cover"
                      sizes="128px"
                    />
                  </div>
                )}
                <div className="min-w-0">
                  <h2 className="text-[17px] font-bold leading-relaxed group-hover:opacity-60 transition-opacity">
                    {g.title}
                  </h2>
                  <p className="mt-2 text-[14px] leading-relaxed text-gray-600">{g.excerpt}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </main>
      <SiteFooter />
    </div>
  );
}
