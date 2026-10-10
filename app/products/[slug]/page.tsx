import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import SiteHeader from "@/app/components/SiteHeader";
import SiteFooter from "@/app/components/SiteFooter";
import { PRODUCTS, CATEGORIES, PAIRINGS, productBySlug, yen, SHIPPING, withUtm, type CategoryKey } from "@/app/lib/products";
import { GUIDES } from "@/app/lib/guides";
import ProductColorImage from "@/app/components/ProductColorImage";
import { soldColors, colorLabel, productImage, baseImage, type ColorKey } from "@/app/lib/colors";
import { SITE, OG_BASE, jsonLdHtml } from "@/app/lib/seo";

// 2026-09-29 SEO R4: title の後半を固定の「観葉植物の園芸支柱」にしていたため、花瓶・鉢・留め具のページでも
// 「六角花瓶｜観葉植物の園芸支柱」のように中身と違う title になっていた。カテゴリで切り替える（商品名は変えない）
const TITLE_SUFFIX: Record<CategoryKey, string> = {
  pole: "観葉植物の園芸支柱",
  pot: "支柱が差せる六角鉢",
  extension: "樹脂版支柱の拡張パーツ",
  // 2026-10-02 SEO: 10/5 note（一輪挿し切り口）に合わせて「一輪挿し」を title に入れる
  vase: "一輪挿しにも使える3Dプリントの花瓶",
};

export const dynamicParams = false;
// キャンペーン表示の期間判定(todayJst)をビルド時に固定しないため、1時間ごとに再生成
export const revalidate = 3600;

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = productBySlug(slug);
  if (!p) return {};
  // 2026-10-10 SEO: shortTitle に `{price}` と書くと products.ts の price から埋める。
  // 価格はEC店長が所有する数字なので、タイトルに数字を二重で持たせない（price を直せばtitleも追従）
  const title = (p.shortTitle ?? `${p.name}｜${TITLE_SUFFIX[p.category]}`).replace(
    "{price}",
    `${p.price.toLocaleString("ja-JP")}円`,
  );
  return {
    title,
    description: p.summary,
    alternates: { canonical: `/products/${p.slug}` },
    openGraph: {
      ...OG_BASE,
      title: `${p.name}｜ZUKE`,
      description: p.summary,
      url: `/products/${p.slug}`,
      images: [
        { url: p.ogImage ?? p.image, width: p.ogWidth ?? 1200, height: p.ogHeight ?? 1200, alt: p.fullName },
        ...(p.ogImageSquare ? [{ url: p.ogImageSquare, width: 1200, height: 1200, alt: p.fullName }] : []),
      ],
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = productBySlug(slug);
  if (!p) notFound();

  const pairings = (PAIRINGS[p.slug] ?? [])
    .map((x) => ({ ...x, product: productBySlug(x.slug) }))
    .filter((x): x is typeof x & { product: NonNullable<typeof x.product> } => !!x.product);
  const others = PRODUCTS.filter((x) => x.slug !== p.slug);
  const relatedGuides = GUIDES.filter((g) => g.related.includes(p.slug));
  const category = CATEGORIES.find((c) => c.key === p.category);
  const sold = soldColors(p.slug);
  // JST日付で期間判定（サーバーのタイムゾーンに依らずOffsetで計算）
  const todayJst = new Date(Date.now() + 9 * 60 * 60 * 1000).toISOString().slice(0, 10);
  const activeCampaign = p.campaigns?.find((c) => todayJst >= c.startDate && todayJst <= c.endDate);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Product",
      name: p.fullName,
      // 2026-09-28 SEO: 色違い画像もすべて登録（画像検索・リッチリザルト）
      // 2026-09-29 SEO R4: 手書きの条件式をやめ、BASE で実際に選べる色（soldColors）に合わせる
      // 2026-10-06 SEO: 色ボタンを出さない商品（丸鉢スタンドセット等・sold が空）は image が [] になりリッチリザルト対象外だった → BASE の1枚目で補う
      image: sold.length ? sold.map((c) => `${SITE}${productImage(p.slug, c)}`) : [`${SITE}${baseImage(p.slug)}`],
      description: p.summary,
      sku: p.slug,
      url: `${SITE}/products/${p.slug}`,
      material: p.material,
      color: sold.length ? sold.map(colorLabel).join(" / ") : undefined,
      category: p.kind === "iron" ? "園芸支柱（アイアン）" : "3Dプリント園芸用品（PLA樹脂）",
      brand: { "@type": "Brand", name: "ZUKE" },
      offers: {
        "@type": "Offer",
        price: p.price,
        priceCurrency: "JPY",
        availability: "https://schema.org/InStock",
        // 2026-09-29 SEO R4: 販売者リスティングの推奨項目。返品ポリシー・送料は表し方をオーナー確認後に追加する
        itemCondition: "https://schema.org/NewCondition",
        seller: { "@type": "Organization", name: "ZUKE", url: SITE },
        url: p.baseUrl,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "ホーム", item: SITE },
        { "@type": "ListItem", position: 2, name: "商品一覧", item: `${SITE}/products` },
        // 2026-09-29 SEO R4: カテゴリページを経由させる（カテゴリページへの内部リンクを増やす）
        ...(category ? [{ "@type": "ListItem", position: 3, name: category.label, item: `${SITE}/collections/${category.key}` }] : []),
        { "@type": "ListItem", position: category ? 4 : 3, name: p.name, item: `${SITE}/products/${p.slug}` },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white text-[#222] flex flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdHtml(jsonLd)} />
      <SiteHeader />
      <main className="flex-1 max-w-5xl mx-auto px-6 w-full pt-14 md:pt-20">
        <nav aria-label="パンくず" className="text-xs text-gray-500 mb-8 flex flex-wrap items-center gap-2">
          <Link href="/" className="hover:text-[#222]">ホーム</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-[#222]">商品一覧</Link>
          <span>/</span>
          {category && (
            <>
              <Link href={`/collections/${category.key}`} className="hover:text-[#222]">{category.label}</Link>
              <span>/</span>
            </>
          )}
          <span className="text-[#222]">{p.name}</span>
        </nav>

        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
          <ProductColorImage
            slug={p.slug}
            name={p.fullName}
            colors={sold}
            initial={(p.image.match(/-(black|white|orange|lightgray)\.webp$/)?.[1] as ColorKey | undefined) ?? sold[0]}
          />

          <div>
            <h1 className="text-xl md:text-2xl font-bold leading-relaxed">{p.name}</h1>
            <p className="mt-2 text-[13px] text-gray-500 leading-relaxed">{p.fullName}</p>
            <p className="mt-5 text-2xl font-bold">{yen(p.price)}<span className="ml-2 text-xs font-normal text-gray-500">税込</span></p>

            {activeCampaign && (
              <p className="mt-4 text-xs font-bold text-white bg-[#c0392b] inline-block px-3 py-1.5 rounded">
                期間限定（{activeCampaign.startDate.slice(5).replace("-", "/")}〜{activeCampaign.endDate.slice(5).replace("-", "/")}）{activeCampaign.label}：クーポン「{activeCampaign.code}」
                {activeCampaign.note ? `（${activeCampaign.note}）` : ""}
              </p>
            )}

            <p className="mt-6 text-[15px] leading-loose text-gray-700">{p.lead}</p>

            <a
              href={withUtm(p.baseUrl)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 flex items-center justify-center w-full py-4 bg-[#222] text-white text-sm tracking-[0.15em] hover:opacity-85 transition-opacity"
            >
              オンラインストアで購入する
            </a>
            <p className="mt-3 text-xs text-gray-500 leading-relaxed">
              購入は BASE の ZUKE 公式ストアへ移動します。送料は地域・サイズにより {yen(SHIPPING.feeFrom)}〜（ヤマト宅急便）、{yen(SHIPPING.freeOver)}以上のご注文で国内送料無料。
            </p>
            {/* 2026-09-29 増澤さん指示: 卸売の案内への導線 */}
            <p className="mt-2 text-xs text-gray-500 leading-relaxed">
              <Link href="/wholesale" className="underline underline-offset-4 decoration-gray-300 hover:text-[#222]">
                店舗での取り扱い（卸売）をご検討の方はこちら
              </Link>
            </p>

            <dl className="mt-10 border-t border-gray-100 text-[14px]">
              <div className="flex gap-6 py-3 border-b border-gray-100">
                <dt className="w-24 shrink-0 text-gray-500">高さ</dt><dd>{p.height}</dd>
              </div>
              {p.width && (
                <div className="flex gap-6 py-3 border-b border-gray-100">
                  <dt className="w-24 shrink-0 text-gray-500">幅</dt><dd>{p.width}</dd>
                </div>
              )}
              {p.weight && (
                <div className="flex gap-6 py-3 border-b border-gray-100">
                  <dt className="w-24 shrink-0 text-gray-500">重さ</dt><dd>{p.weight}</dd>
                </div>
              )}
              <div className="flex gap-6 py-3 border-b border-gray-100">
                <dt className="w-24 shrink-0 text-gray-500">素材</dt><dd>{p.material}</dd>
              </div>
            </dl>
          </div>
        </div>

        {/* 2026-10-10 SEO #7590(EC店長): ヒーローが商品単体カットだと「何に使う物か」がLP上で1枚も分からない。
            ヒーロー直下に使用イメージ1枚＋キャプションで補う（サイズ図と同じく遅延読み込み・LCPには載せない） */}
        {p.usageImage && (
          <section className="mt-20">
            <h2 className="text-base font-bold">使用イメージ</h2>
            <div className="mt-6 max-w-md">
              <Image
                src={p.usageImage.src}
                alt={p.usageImage.alt}
                width={p.usageImage.width}
                height={p.usageImage.height}
                sizes="(min-width: 768px) 28rem, 100vw"
                className="w-full h-auto"
              />
              {p.usageImage.caption && (
                <p className="mt-3 text-[13px] leading-relaxed text-gray-500">{p.usageImage.caption}</p>
              )}
            </div>
          </section>
        )}

        {/* 2026-10-10 SEO #6730: 数字だけでは大きさが伝わらないので実寸カットでも示す。
            ファーストビューより下なので next/image の既定どおり遅延読み込み（priority は付けない＝LCPに影響させない） */}
        {p.sizeImage && (
          <section className="mt-20">
            <h2 className="text-base font-bold">サイズ</h2>
            <div className="mt-6 max-w-md">
              <Image
                src={p.sizeImage.src}
                alt={p.sizeImage.alt}
                width={p.sizeImage.width}
                height={p.sizeImage.height}
                sizes="(min-width: 768px) 28rem, 100vw"
                className="w-full h-auto"
              />
              {p.sizeImage.caption && (
                <p className="mt-3 text-[13px] leading-relaxed text-gray-500">{p.sizeImage.caption}</p>
              )}
            </div>
          </section>
        )}

        <section className="mt-20 grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-base font-bold">相性のよい植物</h2>
            <ul className="mt-4 flex flex-col gap-2 text-[15px] leading-relaxed text-gray-700">
              {p.plants.map((x) => (
                <li key={x} className="flex gap-3"><span className="mt-2 w-1 h-1 rounded-full bg-[#222] shrink-0" />{x}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-base font-bold">インテリアでの使いどころ</h2>
            <ul className="mt-4 flex flex-col gap-2 text-[15px] leading-relaxed text-gray-700">
              {p.scenes.map((x) => (
                <li key={x} className="flex gap-3"><span className="mt-2 w-1 h-1 rounded-full bg-[#222] shrink-0" />{x}</li>
              ))}
            </ul>
          </div>
        </section>

        {pairings.length > 0 && (
          <section className="mt-20">
            <h2 className="text-base font-bold">組み合わせて使う</h2>
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-6">
              {pairings.map(({ product: o, note }) => (
                <Link key={o.slug} href={`/products/${o.slug}`} className="block group">
                  <div className="relative aspect-square bg-[#fbfbfb]">
                    <Image src={o.image} alt={o.fullName} fill className="object-contain group-hover:opacity-90 transition-opacity" sizes="(min-width: 768px) 25vw, 50vw" />
                  </div>
                  <p className="mt-3 text-[13px] leading-relaxed line-clamp-2">{o.name}</p>
                  <p className="mt-1 text-[12px] leading-relaxed text-gray-500">{note}</p>
                  <p className="mt-1 text-[13px] font-bold">{yen(o.price)}</p>
                </Link>
              ))}
            </div>
            <p className="mt-4 text-[12px] text-gray-500">{yen(SHIPPING.freeOver)}以上のご注文で送料無料です。</p>
          </section>
        )}

        {relatedGuides.length > 0 && (
          <section className="mt-20">
            <h2 className="text-base font-bold">この支柱の使い方がわかるガイド</h2>
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

        <section className="mt-20">
          <h2 className="text-base font-bold">ほかの PLANTS POLE</h2>
          <div className="mt-6 grid grid-cols-3 gap-6">
            {others.map((o) => (
              <Link key={o.slug} href={`/products/${o.slug}`} className="block group">
                <div className="relative aspect-square bg-[#fbfbfb]">
                  <Image src={o.image} alt={o.fullName} fill className="object-contain group-hover:opacity-90 transition-opacity" sizes="33vw" />
                </div>
                <p className="mt-3 text-[13px] leading-relaxed line-clamp-2">{o.name}</p>
                <p className="mt-1 text-[13px] font-bold">{yen(o.price)}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
