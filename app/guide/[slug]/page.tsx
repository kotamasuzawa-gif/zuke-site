import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import SiteHeader from "@/app/components/SiteHeader";
import SiteFooter from "@/app/components/SiteFooter";
import { GUIDES, GUIDE_PUBLISHED, guideBySlug, type GuideImage } from "@/app/lib/guides";
import { CATEGORIES, productBySlug, yen, withUtm } from "@/app/lib/products";
import { SITE, OG_BASE, jsonLdHtml } from "@/app/lib/seo";

export const dynamicParams = false;
// 2026-10-15 SEO: 期間限定クーポン告知（Section.notice）の期間判定をビルド時に固定しないため、
// 商品ページ（app/products/[slug]/page.tsx）と同じく1時間ごとに再生成する
export const revalidate = 3600;

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
  // 2026-10-15 SEO: 期間限定クーポンの告知段落は失効日を過ぎたら出さない（商品ページと同じ JST 判定）
  const todayJst = new Date(Date.now() + 9 * 60 * 60 * 1000).toISOString().slice(0, 10);
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
  // 2026-10-15 SEO(#9782 EC店長): 本文中のCTAが全部 utm_content=guide_inline で、1記事に5〜6本あっても
  // BASECLICK ログからは「何節目のCTAが押されたか」を分けられなかった。節ごとに guide_sec1, guide_sec2…
  // を振って、11/12 の「sec1 のCTAがクリックの何%を取ったか」を数えられるようにする。
  // 2026-10-15 SEO(#10022 EC店長): sub=true は「2本目」のCTA（330〜380円のパーツ）。
  // 第一CTA（高単価）を目立たせるため、2本目は細字・1行下げで出す
  // 2026-10-16 SEO(#10075): 第一CTAの文言A/B（labelB があればそれを出し utm_content 末尾に c を付けて分けて数える）。
  // 2026-10-26 SEO(#13855 EC店長): A/B は打ち切り。計測そのものを 10/17 に見送って base-clicks が
  // 9/29〜10/26 で total=0 ＝勝敗の出ない指標になったため、実際に表示されていた labelB（悩み解決型）の文言を
  // 単一 label に畳んで labelB の型ごと外した（型が残ると次に触る人がA/Bが生きていると読むため）。
  const ctaLink = (c: { product: string; label: string } | undefined, content: string, sub = false) => {
    const p = c && productBySlug(c.product);
    if (!c || !p) return null;
    const label = c.label;
    const key = content;
    return (
      <p className={sub ? "mt-3 text-[14px]" : "mt-6 text-[15px]"}>
        <a href={baseLink(p.baseUrl, key)} target="_blank" rel="nofollow noopener noreferrer" className={`underline underline-offset-4 decoration-gray-400 hover:text-[#222]${sub ? "" : " font-bold"}`}>
          {label}（{yen(p.price)}）
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
  // 2026-10-14 オーナー指摘「写真が少なすぎて分かりづらい」: 本文中の任意位置に写真・説明図を差し込む。
  // 2枚以上は横2列（スマホは1列）。縦写真も h-auto で向きのまま出す（mistakes.md 2026-05-21）
  const figures = (imgs?: GuideImage[], priority = false) => {
    if (!imgs || imgs.length === 0) return null;
    const grid = imgs.length >= 2 ? "grid grid-cols-1 sm:grid-cols-2 gap-5" : "";
    return (
      <div className={`mt-7 ${grid}`}>
        {imgs.map((im) => (
          <figure key={im.src} className="m-0">
            <Image
              src={im.src}
              alt={im.alt}
              width={im.width}
              height={im.height}
              priority={priority}
              className="w-full h-auto bg-[#f4f4f4]"
              sizes={imgs.length >= 2 ? "(max-width: 640px) 100vw, 320px" : "(max-width: 768px) 100vw, 672px"}
            />
            {im.caption && <figcaption className="mt-2 text-[12px] leading-relaxed text-gray-500">{im.caption}</figcaption>}
          </figure>
        ))}
      </div>
    );
  };

  // 2026-10-30 SEO(#14726 note担当): 本文中の文脈リンク（記事→記事）。
  // それまでの記事間リンクは下の「ほかのガイド」＝全記事が全記事へ並ぶ定型リストだけで、アンカーテキストが
  // 記事タイトルで全ページ同一だった。body / points / FAQ の回答に出てくる語をそのままアンカーにして、
  // 同じ語を扱う記事へ本文の文脈から渡す。1ページで同じ行き先は最初の1か所だけ（張りすぎると薄まる）。
  const usedInlineLinks = new Set<string>();
  const inlineLinks = (g.inlineGuideLinks ?? []).filter(
    (l) => l.slug !== g.slug && GUIDES.some((x) => x.slug === l.slug),
  );
  // 2026-10-31: 本文中の /go/base リンク。c= と from= は上の baseLink（既存CTA）と同じ組み立て。
  const baseAnchors = (g.inlineBaseLinks ?? []).filter(
    (l) => l.text.length > 0 && /^\d+$/.test(l.itemId) && /^[A-Za-z0-9_-]{1,40}$/.test(l.content),
  );
  const linkClass = "underline underline-offset-4 decoration-gray-400 hover:text-[#222]";
  const linkify = (text: string) => {
    const candidates = [
      ...inlineLinks.map((l) => ({
        key: l.slug,
        text: l.text,
        external: false,
        href: `/guide/${l.slug}`,
      })),
      ...baseAnchors.map((l) => ({
        key: `base:${l.itemId}:${l.content}`,
        text: l.text,
        external: true,
        href: baseLink(`/items/${l.itemId}`, l.content),
      })),
    ].filter((l) => !usedInlineLinks.has(l.key) && text.includes(l.text));
    const hit = candidates.sort((a, b) => text.indexOf(a.text) - text.indexOf(b.text))[0];
    if (!hit) return text;
    usedInlineLinks.add(hit.key);
    const at = text.indexOf(hit.text);
    const link = hit.external ? (
      <a href={hit.href} target="_blank" rel="nofollow noopener noreferrer" className={linkClass}>
        {hit.text}
      </a>
    ) : (
      <Link href={hit.href} className={linkClass}>
        {hit.text}
      </Link>
    );
    return (
      <>
        {text.slice(0, at)}
        {link}
        {text.slice(at + hit.text.length)}
      </>
    );
  };
  const pointList = (items: string[], className = "mt-6") =>
    items.length === 0 ? null : (
      <ul className={`${className} flex flex-col gap-3`}>
        {items.map((pt) => (
          <li key={pt} className="flex gap-3 text-[15px] leading-relaxed text-gray-700">
            <span className="mt-2.5 w-1 h-1 rounded-full bg-[#222] shrink-0" />
            <span>{linkify(pt)}</span>
          </li>
        ))}
      </ul>
    );
  const prose = (items: string[] | undefined, prefix: string) =>
    (items ?? []).map((para, n) => (
      <p key={`${prefix}-${n}`} className="mt-5 text-[15px] leading-loose text-gray-700">
        {linkify(para)}
      </p>
    ));
  const renderPoints = (s: (typeof g.sections)[number]) => {
    if (!s.points) return null;
    const at = s.followPoint ? s.points.indexOf(s.followPoint.after) : -1;
    if (at < 0) {
      return (
        <>
          {pointList(s.points)}
          {prose(s.followPoint?.paragraphs, "follow")}
        </>
      );
    }
    return (
      <>
        {pointList(s.points.slice(0, at + 1))}
        {prose(s.followPoint?.paragraphs, "follow")}
        {pointList(s.points.slice(at + 1))}
      </>
    );
  };

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
      // 2026-10-11 SEO(#7905): Article の image が13記事すべて汎用 og.jpg だった。
      // 検索結果・Discover のサムネイルは構造化データの image も候補になるため、
      // OGタグだけカード型に差し替えても足りない。記事固有のOGを渡す。
      image: `${SITE}${g.ogImage ?? "/og.jpg"}`,
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
          {g.conclusion && (
            <div className="mt-8">
              <p className="text-[15px] font-bold leading-relaxed">{g.conclusion.heading}</p>
              {pointList(g.conclusion.points, "mt-4")}
              <p className="mt-5 text-[15px] leading-loose text-gray-700">{linkify(g.conclusion.closing)}</p>
            </div>
          )}
          {g.hero && figures([g.hero], true)}
          {/* 2026-10-27 SEO(朝会 #14072): 冒頭の購入リンク。hero の実写に写っている商品を指す記事だけ。
              第一CTA(guide_sec1)は節の末尾にあり、本番実測で記事先頭から約4.4KB下＝モバイルで2画面以上先だった */}
          {ctaLink(g.leadCta, "guide_lead")}
          {g.slug === "kanyoushokubutsu-taoreru" && (
            <p className="mt-2 text-xs text-gray-500 leading-relaxed">
              <Link href="/wholesale" className="underline underline-offset-4 decoration-gray-300 hover:text-[#222]">
                店舗・まとめ買いの方へ（卸売のご案内）はこちら
              </Link>
            </p>
          )}

          {g.sections.map((s, i) => (
            <section key={s.heading} className="mt-14">
              <h2 className="text-lg font-bold leading-relaxed border-l-2 border-[#222] pl-4">{s.heading}</h2>
              {s.body.map((para, i) => (
                <p key={i} className="mt-5 text-[15px] leading-loose text-gray-700">{linkify(para)}</p>
              ))}
              {s.notice && (todayJst <= s.notice.endDate || s.notice.textAfter) && (
                <p className="mt-5 text-[15px] leading-loose text-gray-700">
                  {todayJst <= s.notice.endDate ? s.notice.text : s.notice.textAfter}
                </p>
              )}
              {s.figuresPlacement !== "afterPoints" && figures(s.figures)}
              {renderPoints(s)}
              {prose(s.afterList, "after")}
              {s.figuresPlacement === "afterPoints" && figures(s.figures)}
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
              {/* 2026-10-20 SEO(#11663 EC店長): 自社ホスト動画を節のリンク・CTAの直上に置く。
                  受注5点が全点リール投稿24h以内＝動きを見た人だけが買っているため、検索の着地にも動きを置く */}
              {/* 2026-10-20 SEO(#11684 デザイナー): 縦型（720x1280）の動画が来たので、実寸を width/height に渡して
                  縦のときだけ枠を 360px に絞る。横型の枠に入れると黒帯が出る */}
              {s.video && (
                <figure className={`m-0 mt-8${(s.video.height ?? 1080) > (s.video.width ?? 1920) ? " max-w-[360px]" : ""}`}>
                  <div className="overflow-hidden bg-[#f4f4f4]">
                    <video
                      className="w-full h-auto block"
                      src={s.video.src}
                      poster={s.video.poster}
                      width={s.video.width ?? 1920}
                      height={s.video.height ?? 1080}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      aria-label={s.video.label}
                    />
                  </div>
                  {s.video.caption && (
                    <figcaption className="mt-2 text-[12px] leading-relaxed text-gray-500">{s.video.caption}</figcaption>
                  )}
                </figure>
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
              {ctaLink(s.cta, `guide_sec${i + 1}`)}
              {/* 2026-10-25 SEO(#13367 EC店長): 第一CTAのすぐ下の併せ買い1行（鉢ごとそろうセット）。
                  第一CTAを 880円→770円 に付け替えた3記事の客単価を戻すための枠。cta2 とは utm_content で分ける */}
              {ctaLink(s.ctaAddon, `guide_sec${i + 1}u`, true)}
              {/* 2026-10-15 SEO(#10022 EC店長): 2本目のCTA（330〜380円のパーツ）。第一CTAと分けて数える */}
              {ctaLink(s.cta2, `guide_sec${i + 1}b`, true)}
            </section>
          ))}

          {g.faq && g.faq.length > 0 && (
            <section className="mt-14" aria-labelledby="faq-heading">
              <h2 id="faq-heading" className="text-lg font-bold leading-relaxed border-l-2 border-[#222] pl-4">よくある質問</h2>
              <dl className="mt-6 flex flex-col gap-6">
                {g.faq.map((f) => (
                  <div key={f.q}>
                    <dt className="text-[15px] font-bold leading-relaxed">Q. {f.q}</dt>
                    {/* 2026-10-30 SEO(#14726): FAQ の回答も文脈リンクの対象。JSON-LD には素の文字列を渡すので構造化データは変わらない */}
                    <dd className="mt-2 text-[15px] leading-loose text-gray-700">{linkify(f.a)}</dd>
                  </div>
                ))}
              </dl>
              {ctaLink(g.faqCta, "guide_faq")}
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
                    {/* 2026-10-27 EC店長: d26d513 の対象外。ここは「BASEで購入する」が直リンクなので、
                        完売品が related に入ると押しても買えない BASE ページに落ちる。バッジと行き先で塞ぐ。 */}
                    <div className="relative aspect-square bg-[#fbfbfb] overflow-hidden">
                      <Image src={p.image} alt={p.fullName} fill className={`object-contain group-hover:opacity-90 transition-opacity${p.soldOut ? " opacity-40" : ""}`} sizes="(max-width: 768px) 50vw, 33vw" />
                      {p.soldOut && (
                        <span className="absolute top-2 left-2 bg-gray-500 text-white text-[10px] font-bold tracking-[0.15em] px-2 py-0.5">SOLD OUT</span>
                      )}
                    </div>
                    <p className="mt-3 text-[13px] leading-relaxed line-clamp-2">{p.name}</p>
                    <p className="mt-1 text-[13px] text-gray-500">高さ {p.height}</p>
                    <p className="mt-1 text-[13px] font-bold">{yen(p.price)}</p>
                  </Link>
                  {/* 2026-10-28 SEO(#14595 EC店長): 全色0（soldOut）ではないが一部の色だけ在庫がある商品の但し書き。
                      hex3 は黒0・白2で、売れているのは黒＝カードから黒目的の読者を落とさないため色を先に出す。 */}
                  {!p.soldOut && p.stockNote && (
                    <p className="mt-1 text-[12px] text-gray-500">{p.stockNote}</p>
                  )}
                  {p.soldOut ? (
                    <Link
                      href={p.soldOutAlt?.href ?? `/products/${p.slug}`}
                      className="mt-2 flex items-center justify-center w-full py-2 bg-gray-500 text-white text-[11px] tracking-[0.1em] hover:opacity-85 transition-opacity"
                    >
                      いま買えるものを見る
                    </Link>
                  ) : (
                    <a
                      href={baseLink(p.baseUrl, "guide")}
                      target="_blank"
                      rel="nofollow noopener noreferrer"
                      className="mt-2 flex items-center justify-center w-full py-2 bg-[#222] text-white text-[11px] tracking-[0.1em] hover:opacity-85 transition-opacity"
                    >
                      BASEで購入する
                    </a>
                  )}
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
