import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { preload } from "react-dom";
import SiteHeader from "@/app/components/SiteHeader";
import SiteFooter from "@/app/components/SiteFooter";
import CollectionNav from "@/app/components/CollectionNav";
import ProductColorGrid from "@/app/components/ProductColorGrid";
import IronPriceTable from "@/app/components/IronPriceTable";
import { COLLECTIONS, collectionByKey, yen } from "@/app/lib/products";
import { productsForSurface } from "@/app/lib/live-product";
import { GUIDES } from "@/app/lib/guides";
import { SITE, OG_BASE, jsonLdHtml } from "@/app/lib/seo";

// 2026-09-26 増澤さん指示: 鉢・セットにはホームの組み立て動画、支柱の拡張には拡張動画を常時再生
// 2026-10-18 ホームのトップ動画でも使うので app/lib/videos.ts に移動
import { CATEGORY_VIDEOS as VIDEOS } from "@/app/lib/videos";

export const revalidate = 1800;

export function generateStaticParams() {
  return COLLECTIONS.map((c) => ({ key: c.key }));
}

export async function generateMetadata({ params }: { params: Promise<{ key: string }> }): Promise<Metadata> {
  const { key } = await params;
  const c = collectionByKey(key);
  if (!c) return {};
  // 2026-10-06 SEO: iron/pla/extension も同様に共有カードが汎用 og.jpg だったので代表商品画像に（デザイナー確認済み・既存実写を再利用）
  // 2026-10-11 SEO(#7905): 残り2ページ（pole/pot）も汎用 og.jpg だった。既存の横長OGを割り当て
  // （pole=うねうね・pot=六角鉢。iron/pla と別カットにしてサムネイルの見分けが付くようにする）
  // 2026-10-26 SEO(#13848 EC店長): iron の代表商品を hex5(117375069・10/29 に完全完売) から hex2(124680568・黒/白とも在庫あり) へ。
  // 共有カードの画像が完売品だと、SNS・チャットから来た人の着地が買えない商品になる。
  const OG_PRODUCT_SLUG: Record<string, string> = {
    iron: "hex2", pla: "hexpot-set", extension: "hexparts",
    pole: "uneune", pot: "hexpot",
  };
  // 2026-10-18 増澤さん「ハンギングのリンク画像が鉄支柱になる」: 対応表に無いカテゴリは汎用 og.jpg ではなく、そのカテゴリの先頭商品の画像にする
  const products = await productsForSurface("listing");
  const ogProduct = (OG_PRODUCT_SLUG[c.key] ? products.find((p) => p.slug === OG_PRODUCT_SLUG[c.key]) : undefined) ?? products.find(c.filter);
  const ogImages = ogProduct
    ? [{ url: ogProduct.ogImage ?? ogProduct.image, width: ogProduct.ogWidth ?? 1200, height: ogProduct.ogHeight ?? 1200, alt: ogProduct.fullName }]
    : [{ url: "/og.jpg", width: 1200, height: 630, alt: "ZUKE PLANTS POLE" }];
  return {
    // 2026-09-29 SEO R4: title はテンプレートの「｜ZUKE」と重複しないように。description は products.ts の COLLECTION_SEO
    title: c.seoTitle,
    description: c.seoDescription,
    alternates: { canonical: `/collections/${c.key}` },
    openGraph: { ...OG_BASE, title: `${c.seoTitle}｜ZUKE`, description: c.seoDescription, url: `/collections/${c.key}`, images: ogImages },
  };
}

export default async function CollectionPage({ params }: { params: Promise<{ key: string }> }) {
  const { key } = await params;
  const c = collectionByKey(key);
  if (!c) notFound();
  const products = await productsForSurface("listing");
  const items = products.filter(c.filter);
  // 2026-09-29 SEO R4: 掲載商品を紹介しているガイドへの内部リンク
  const relatedGuides = GUIDES.filter((g) => g.related.some((s) => items.some((p) => p.slug === s)));
  // 2026-09-29 SEO R4: 先頭の動画ポスター（LCP 候補）を優先読み込み
  if (VIDEOS[c.key]) preload(VIDEOS[c.key].poster, { as: "image", fetchPriority: "high" });
  const jsonLd = [{
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: c.seoTitle,
    description: c.seoDescription,
    url: `${SITE}/collections/${c.key}`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: items.map((p, i) => ({ "@type": "ListItem", position: i + 1, url: `${SITE}/products/${p.slug}`, name: p.fullName })),
    },
  }, {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "ホーム", item: SITE },
      { "@type": "ListItem", position: 2, name: "商品一覧", item: `${SITE}/products` },
      { "@type": "ListItem", position: 3, name: c.label, item: `${SITE}/collections/${c.key}` },
    ],
  }];
  return (
    <div className="min-h-screen bg-white text-[#222] flex flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdHtml(jsonLd)} />
      <SiteHeader />
      <main className="flex-1 max-w-5xl mx-auto px-6 w-full pt-14 md:pt-20">
        <nav aria-label="パンくず" className="text-xs text-gray-500 mb-6 flex items-center gap-2">
          <Link href="/" className="hover:text-[#222]">ホーム</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-[#222]">商品一覧</Link>
          <span>/</span>
          <span className="text-[#222]">{c.label}</span>
        </nav>
        <h1 className="text-2xl md:text-3xl font-bold leading-relaxed">{c.label}</h1>
        <p className="mt-3 text-[15px] leading-loose text-gray-700 max-w-2xl">{c.lead}</p>
        {/* 2026-10-23 SEO(#12563): アイアン支柱は4本の違いが高さと用途だけなので、冒頭で価格帯と一緒に比較できるようにする */}
        {c.key === "iron" && <IronPriceTable products={products} />}
        {/* 2026-09-27 増澤さん指示: 動画はタイトル・説明の下に */}
        {VIDEOS[c.key] && (
          <section aria-label={VIDEOS[c.key].label} className="mt-8 -mx-6 md:mx-0 bg-white">
            <video className="w-full h-auto block" src={VIDEOS[c.key].src} poster={VIDEOS[c.key].poster} autoPlay muted loop playsInline preload="metadata" aria-label={VIDEOS[c.key].label} />
          </section>
        )}
        <div className="mt-12">
          <ProductColorGrid items={items.map((p) => ({ slug: p.slug, name: p.name, fullName: p.fullName, price: yen(p.price), sub: p.material, isNew: p.isNew, soldOut: p.soldOut, href: `/products/${p.slug}` }))} />
        </div>
        {items.length === 0 && <p className="mt-12 text-gray-500">準備中です。</p>}
        {/* 2026-10-18 増澤さん指示: カテゴリボタンは商品一覧の下に */}
        <div className="mt-12">
          <CollectionNav current={c.key} compact />
        </div>
        {relatedGuides.length > 0 && (
          <section className="mt-20">
            <h2 className="text-base font-bold">関連するガイド</h2>
            <ul className="mt-4 flex flex-col gap-3">
              {relatedGuides.map((g) => (
                <li key={g.slug}>
                  <Link href={`/guide/${g.slug}`} className="text-[15px] text-gray-700 hover:text-[#222] underline underline-offset-4 decoration-gray-300">
                    {g.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
