import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import SiteHeader from "@/app/components/SiteHeader";
import SiteFooter from "@/app/components/SiteFooter";
import { GUIDES, GUIDE_PUBLISHED, guideBySlug } from "@/app/lib/guides";
import { CATEGORIES, productBySlug, yen, withUtm } from "@/app/lib/products";
import { SITE, OG_BASE, jsonLdHtml } from "@/app/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const g = guideBySlug(slug);
  if (!g) return {};
  return {
    title: g.metaTitle,
    description: g.description,
    keywords: g.keywords,
    alternates: { canonical: `/guide/${g.slug}` },
    openGraph: {
      ...OG_BASE,
      type: "article",
      title: `${g.metaTitle}｜ZUKE`,
      description: g.description,
      url: `/guide/${g.slug}`,
      images: [{ url: g.ogImage ?? "/og.jpg", width: 1200, height: 630, alt: g.ogImage ? g.title : "ZUKE" }],
    },
  };
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const g = guideBySlug(slug);
  if (!g) notFound();

  const related = g.related.map(productBySlug).filter((p): p is NonNullable<typeof p> => !!p);
  const others = GUIDES.filter((x) => x.slug !== g.slug);
  // 2026-09-29 SEO R4: 紹介した商品のカテゴリページへもリンクする（カテゴリページへの内部リンクが少なかった）
  // 2026-10-09 SEO: 本文中の BASE 購入リンク（節の直下・FAQ末尾）
  // 2026-10-10 SEO(#6541): trackFrom がある記事は BASE リンクに &from= を足して記事経由の流入を実数で数える
  // 2026-10-10 SEO(#7630 EC店長): BASE 側に UTM も from も残らず注文APIにも流入元の項目が無いため、
  // 記事からの購入リンクは自社ドメインの 302 中継（/go/base/<item_id>）を通してクリックをログに出す。
  // item_id が取れない商品（ショップトップ等）は従来どおり直リンク。
  const baseLink = (url: string, content: string) => {
    const u = withUtm(url, content);
    const withFrom = g.trackFrom ? `${u}&from=${g.trackFrom}` : u;
    const itemId = url.match(/\/items\/(\d+)$/)?.[1];
    if (!itemId) return withFrom;
    const q = new URLSearchParams({ c: content });
    if (g.trackFrom) q.set("from", g.trackFrom);
    return `/go/base/${itemId}?${q.toString()}`;
  };
  const ctaLink = (c?: { product: string; label: string }) => {
    const p = c && productBySlug(c.product);
    if (!c || !p) return null;
    return (
      <p className="mt-6 text-[15px]">
        <a href={baseLink(p.baseUrl, "guide_inline")} target="_blank" rel="nofollow noopener noreferrer" className="underline underline-offset-4 decoration-gray-400 hover:text-[#222] font-bold">
          {c.label}（{yen(p.price)}）
        </a>
      </p>
    );
  };
  // 2026-10-10 SEO(#7602): 節の直下のサイト内リンク（商品ページへ）。公開中の商品だけを引く
  const sectionLinks = (links?: { product: string; label: string }[]) =>
    (links ?? [])
      .map((l) => ({ p: productBySlug(l.product), label: l.label }))
      .filter((x): x is { p: NonNullable<ReturnType<typeof productBySlug>>; label: string } => !!x.p);
  const relatedCategories = CATEGORIES.filter((c) => related.some((p) => p.category === c.key));
  // 2026-10-10 SEO(#6896): 2本使いの提案ブロック（商品リンクの直前）。公開中の商品だけを引く
  const bundleItems = (g.bundle?.items ?? [])
    .map((it) => ({ p: productBySlug(it.product), note: it.note }))
    .filter((x): x is { p: NonNullable<ReturnType<typeof productBySlug>>; note: string } => !!x.p);
  const bundleTotal = bundleItems.reduce((sum, { p }) => sum + p.price, 0);

  const jsonLd: object[] = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: g.title,
      description: g.description,
      image: `${SITE}/og.jpg`,
      inLanguage: "ja",
      ...(GUIDE_PUBLISHED[g.slug] && { datePublished: GUIDE_PUBLISHED[g.slug] }),
      author: { "@type": "Organization", name: "ZUKE", url: SITE },
      publisher: { "@type": "Organization", name: "ZUKE", url: SITE },
      mainEntityOfPage: `${SITE}/guide/${g.slug}`,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "ホーム", item: SITE },
        { "@type": "ListItem", position: 2, name: "ガイド", item: `${SITE}/guide` },
        { "@type": "ListItem", position: 3, name: g.metaTitle, item: `${SITE}/guide/${g.slug}` },
      ],
    },
  ];
  // 2026-09-30 SEO R5: FAQ がある記事は FAQPage を追加（本文に同じ Q&A を表示する）
  if (g.faq && g.faq.length > 0) {
    jsonLd.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: g.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    });
  }

  return (
    <div className="min-h-screen bg-white text-[#222] flex flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdHtml(jsonLd)} />
      <SiteHeader />
      <main className="flex-1 max-w-2xl mx-auto px-6 w-full pt-14 md:pt-20">
        <nav aria-label="パンくず" className="text-xs text-gray-500 mb-8 flex flex-wrap items-center gap-2">
          <Link href="/" className="hover:text-[#222]">ホーム</Link>
          <span>/</span>
          <Link href="/guide" className="hover:text-[#222]">ガイド</Link>
          <span>/</span>
          <span className="text-[#222] line-clamp-1">{g.metaTitle}</span>
        </nav>

        <article>
          <h1 className="text-2xl md:text-[28px] font-bold leading-relaxed">{g.title}</h1>
          <p className="mt-6 text-[15px] leading-loose text-gray-700">{g.lead}</p>
          {g.slug === "kanyoushokubutsu-taoreru" && (
            <p className="mt-2 text-xs text-gray-500 leading-relaxed">
              <Link href="/wholesale" className="underline underline-offset-4 decoration-gray-300 hover:text-[#222]">
                店舗・まとめ買いの方へ（卸売のご案内）はこちら
              </Link>
            </p>
          )}

          {g.sections.map((s) => (
            <section key={s.heading} className="mt-14">
              <h2 className="text-lg font-bold leading-relaxed border-l-2 border-[#222] pl-4">{s.heading}</h2>
              {s.body.map((para, i) => (
                <p key={i} className="mt-5 text-[15px] leading-loose text-gray-700">{para}</p>
              ))}
              {s.points && (
                <ul className="mt-6 flex flex-col gap-3">
                  {s.points.map((pt) => (
                    <li key={pt} className="flex gap-3 text-[15px] leading-relaxed text-gray-700">
                      <span className="mt-2.5 w-1 h-1 rounded-full bg-[#222] shrink-0" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              )}
              {s.image && (
                <Image
                  src={s.image.src}
                  alt={s.image.alt}
                  width={s.image.width}
                  height={s.image.height}
                  className="mt-8 w-full h-auto"
                  sizes="(max-width: 768px) 100vw, 672px"
                />
              )}
              {sectionLinks(s.links).length > 0 && (
                <ul className="mt-6 flex flex-col gap-3">
                  {sectionLinks(s.links).map(({ p, label }) => (
                    <li key={p.slug} className="text-[15px] leading-relaxed">
                      <Link href={`/products/${p.slug}`} className="underline underline-offset-4 decoration-gray-400 hover:text-[#222]">
                        {label}
                      </Link>
                      <span className="text-gray-500">（{yen(p.price)}）</span>
                    </li>
                  ))}
                </ul>
              )}
              {ctaLink(s.cta)}
            </section>
          ))}

          {g.faq && g.faq.length > 0 && (
            <section className="mt-14" aria-labelledby="faq-heading">
              <h2 id="faq-heading" className="text-lg font-bold leading-relaxed border-l-2 border-[#222] pl-4">よくある質問</h2>
              <dl className="mt-6 flex flex-col gap-6">
                {g.faq.map((f) => (
                  <div key={f.q}>
                    <dt className="text-[15px] font-bold leading-relaxed">Q. {f.q}</dt>
                    <dd className="mt-2 text-[15px] leading-loose text-gray-700">{f.a}</dd>
                  </div>
                ))}
              </dl>
              {ctaLink(g.faqCta)}
            </section>
          )}
        </article>

        {/* 2026-10-10 SEO(#6896): 商品リンクの直前に「高さ違いの2本使い」を写真付きで提案して客単価を上げる */}
        {bundleItems.length > 0 && g.bundle && (
          <section className="mt-20 pt-12 border-t border-gray-100">
            <h2 className="text-base font-bold">{g.bundle.heading}</h2>
            {g.bundle.body.map((para, i) => (
              <p key={i} className="mt-5 text-[15px] leading-loose text-gray-700">{para}</p>
            ))}
            {g.bundle.image && (
              <Image
                src={g.bundle.image.src}
                alt={g.bundle.image.alt}
                width={g.bundle.image.width}
                height={g.bundle.image.height}
                className="mt-8 w-full h-auto"
                sizes="(max-width: 768px) 100vw, 672px"
              />
            )}
            <div className="mt-8 grid grid-cols-2 gap-6">
              {bundleItems.map(({ p, note }) => (
                <div key={p.slug}>
                  <Link href={`/products/${p.slug}`} className="block group">
                    <p className="text-[13px] leading-relaxed line-clamp-2 underline underline-offset-4 decoration-gray-300 group-hover:decoration-[#222]">{p.name}</p>
                    <p className="mt-1 text-[13px] text-gray-500">高さ {p.height}</p>
                    <p className="mt-1 text-[13px] font-bold">{yen(p.price)}</p>
                  </Link>
                  <p className="mt-2 text-[13px] leading-relaxed text-gray-600">{note}</p>
                  <a
                    href={baseLink(p.baseUrl, "guide_bundle")}
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    className="mt-3 flex items-center justify-center w-full py-2 bg-[#222] text-white text-[11px] tracking-[0.1em] hover:opacity-85 transition-opacity"
                  >
                    BASEで購入する
                  </a>
                </div>
              ))}
            </div>
            <p className="mt-6 text-[14px] leading-relaxed">
              2本合わせて <span className="font-bold">{yen(bundleTotal)}</span>
              {g.bundle.footnote && <span className="text-gray-600">（{g.bundle.footnote.replace(/。$/, "")}）</span>}
            </p>
          </section>
        )}

        {related.length > 0 && (
          <section className="mt-20 pt-12 border-t border-gray-100">
            <h2 className="text-base font-bold">この記事で紹介した PLANTS POLE</h2>
            <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-6">
              {related.map((p) => (
                <div key={p.slug}>
                  <Link href={`/products/${p.slug}`} className="block group">
                    <div className="relative aspect-square bg-[#fbfbfb]">
                      <Image src={p.image} alt={p.fullName} fill className="object-contain group-hover:opacity-90 transition-opacity" sizes="(max-width: 768px) 50vw, 33vw" />
                    </div>
                    <p className="mt-3 text-[13px] leading-relaxed line-clamp-2">{p.name}</p>
                    <p className="mt-1 text-[13px] text-gray-500">高さ {p.height}</p>
                    <p className="mt-1 text-[13px] font-bold">{yen(p.price)}</p>
                  </Link>
                  <a
                    href={baseLink(p.baseUrl, "guide")}
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    className="mt-2 flex items-center justify-center w-full py-2 bg-[#222] text-white text-[11px] tracking-[0.1em] hover:opacity-85 transition-opacity"
                  >
                    BASEで購入する
                  </a>
                </div>
              ))}
            </div>
            {relatedCategories.length > 0 && (
              <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[14px]">
                {relatedCategories.map((c) => (
                  <li key={c.key}>
                    <Link href={`/collections/${c.key}`} className="text-gray-700 hover:text-[#222] underline underline-offset-4 decoration-gray-300">
                      {c.label}の一覧を見る
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </section>
        )}

        <section className="mt-16">
          <h2 className="text-base font-bold">ほかのガイド</h2>
          <ul className="mt-4 flex flex-col gap-3">
            {others.map((o) => (
              <li key={o.slug}>
                <Link href={`/guide/${o.slug}`} className="text-[15px] text-gray-700 hover:text-[#222] underline underline-offset-4 decoration-gray-300">
                  {o.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
