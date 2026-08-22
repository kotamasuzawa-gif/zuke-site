import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import SiteHeader from "@/app/components/SiteHeader";
import SiteFooter from "@/app/components/SiteFooter";
import { PRODUCTS, productBySlug, yen, SHIPPING } from "@/app/lib/products";
import { GUIDES } from "@/app/lib/guides";

const SITE = "https://www.zukeplants.com";

export const dynamicParams = false;

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = productBySlug(slug);
  if (!p) return {};
  return {
    title: `${p.name}｜観葉植物の園芸支柱`,
    description: p.summary,
    alternates: { canonical: `/products/${p.slug}` },
    openGraph: {
      title: `${p.name}｜ZUKE`,
      description: p.summary,
      url: `/products/${p.slug}`,
      images: [{ url: p.image, alt: p.fullName }],
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = productBySlug(slug);
  if (!p) notFound();

  const others = PRODUCTS.filter((x) => x.slug !== p.slug);
  const relatedGuides = GUIDES.filter((g) => g.related.includes(p.slug));

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Product",
      name: p.fullName,
      image: `${SITE}${p.image}`,
      description: p.summary,
      material: p.material,
      brand: { "@type": "Brand", name: "ZUKE" },
      offers: {
        "@type": "Offer",
        price: p.price,
        priceCurrency: "JPY",
        availability: "https://schema.org/InStock",
        url: p.baseUrl,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "ホーム", item: SITE },
        { "@type": "ListItem", position: 2, name: "商品一覧", item: `${SITE}/products` },
        { "@type": "ListItem", position: 3, name: p.name, item: `${SITE}/products/${p.slug}` },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white text-[#222] flex flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SiteHeader />
      <main className="flex-1 max-w-5xl mx-auto px-6 w-full pt-14 md:pt-20">
        <nav aria-label="パンくず" className="text-xs text-gray-500 mb-8 flex flex-wrap items-center gap-2">
          <Link href="/" className="hover:text-[#222]">ホーム</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-[#222]">商品一覧</Link>
          <span>/</span>
          <span className="text-[#222]">{p.name}</span>
        </nav>

        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
          <div className="relative aspect-square bg-[#fbfbfb]">
            <Image src={p.image} alt={p.fullName} fill priority className="object-contain" sizes="(max-width: 768px) 100vw, 50vw" />
          </div>

          <div>
            <h1 className="text-xl md:text-2xl font-bold leading-relaxed">{p.name}</h1>
            <p className="mt-2 text-[13px] text-gray-500 leading-relaxed">{p.fullName}</p>
            <p className="mt-5 text-2xl font-bold">{yen(p.price)}<span className="ml-2 text-xs font-normal text-gray-500">税込</span></p>

            <p className="mt-6 text-[15px] leading-loose text-gray-700">{p.lead}</p>

            <a
              href={p.baseUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 flex items-center justify-center w-full py-4 bg-[#222] text-white text-sm tracking-[0.15em] hover:opacity-85 transition-opacity"
            >
              オンラインストアで購入する
            </a>
            <p className="mt-3 text-xs text-gray-500 leading-relaxed">
              購入は BASE の ZUKE 公式ストアへ移動します。送料 全国一律 {yen(SHIPPING.fee)}、{yen(SHIPPING.freeOver)}以上で国内送料無料。
            </p>

            <dl className="mt-10 border-t border-gray-100 text-[14px]">
              <div className="flex gap-6 py-3 border-b border-gray-100">
                <dt className="w-24 shrink-0 text-gray-500">高さ</dt><dd>{p.height}</dd>
              </div>
              <div className="flex gap-6 py-3 border-b border-gray-100">
                <dt className="w-24 shrink-0 text-gray-500">幅</dt><dd>{p.width}</dd>
              </div>
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
