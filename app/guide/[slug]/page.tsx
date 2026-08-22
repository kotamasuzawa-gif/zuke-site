import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import SiteHeader from "@/app/components/SiteHeader";
import SiteFooter from "@/app/components/SiteFooter";
import { GUIDES, guideBySlug } from "@/app/lib/guides";
import { productBySlug, yen } from "@/app/lib/products";

const SITE = "https://www.zukeplants.com";

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
      type: "article",
      title: `${g.metaTitle}｜ZUKE`,
      description: g.description,
      url: `/guide/${g.slug}`,
      images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "ZUKE" }],
    },
  };
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const g = guideBySlug(slug);
  if (!g) notFound();

  const related = g.related.map(productBySlug).filter((p): p is NonNullable<typeof p> => !!p);
  const others = GUIDES.filter((x) => x.slug !== g.slug);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: g.title,
      description: g.description,
      image: `${SITE}/og.jpg`,
      inLanguage: "ja",
      author: { "@type": "Organization", name: "ZUKE" },
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

  return (
    <div className="min-h-screen bg-white text-[#222] flex flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
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
            </section>
          ))}
        </article>

        {related.length > 0 && (
          <section className="mt-20 pt-12 border-t border-gray-100">
            <h2 className="text-base font-bold">この記事で紹介した PLANTS POLE</h2>
            <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-6">
              {related.map((p) => (
                <Link key={p.slug} href={`/products/${p.slug}`} className="block group">
                  <div className="relative aspect-square bg-[#fbfbfb]">
                    <Image src={p.image} alt={p.fullName} fill className="object-contain group-hover:opacity-90 transition-opacity" sizes="(max-width: 768px) 50vw, 33vw" />
                  </div>
                  <p className="mt-3 text-[13px] leading-relaxed line-clamp-2">{p.name}</p>
                  <p className="mt-1 text-[13px] text-gray-500">高さ {p.height}</p>
                  <p className="mt-1 text-[13px] font-bold">{yen(p.price)}</p>
                </Link>
              ))}
            </div>
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
