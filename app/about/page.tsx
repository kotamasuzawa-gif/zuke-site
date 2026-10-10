import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import SiteHeader from "@/app/components/SiteHeader";
import SiteFooter from "@/app/components/SiteFooter";
import { PRODUCTS, yen } from "@/app/lib/products";
import { SITE, OG_BASE, jsonLdHtml } from "@/app/lib/seo";

export const metadata: Metadata = {
  title: "ブランドについて｜インテリアに馴染む園芸支柱をつくる",
  description:
    "ZUKE（ズーケ）は「インテリアに馴染む」「生活に馴染む」をコンセプトに、機能性とデザイン性を両立した園芸支柱 PLANTS POLE をつくるブランドです。植物と家具が心地よく共存する暮らしを提案します。",
  alternates: { canonical: "/about" },
  openGraph: {
    ...OG_BASE,
    title: "ブランドについて｜ZUKE",
    description: "インテリアに馴染む園芸支柱 PLANTS POLE をつくるブランド、ZUKE。",
    url: "/about",
    // 2026-10-11 design/SEO(#7916): 汎用 og.jpg だったのでブランドカード型OGに（トップと共用）
    images: [{ url: "/og/og-brand.jpg", width: 1200, height: 630, alt: "インテリアに馴染む園芸支柱をつくるブランド ZUKE" }],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "ホーム", item: SITE },
    { "@type": "ListItem", position: 2, name: "ブランドについて", item: `${SITE}/about` },
  ],
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-[#222] flex flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdHtml(jsonLd)} />
      <SiteHeader />
      <main className="flex-1 max-w-2xl mx-auto px-6 w-full pt-14 md:pt-20">
        <nav aria-label="パンくず" className="text-xs text-gray-500 mb-8 flex items-center gap-2">
          <Link href="/" className="hover:text-[#222]">ホーム</Link>
          <span>/</span>
          <span className="text-[#222]">ブランドについて</span>
        </nav>

        <h1 className="text-2xl md:text-3xl font-bold leading-relaxed">
          インテリアに馴染む園芸支柱をつくる、ZUKE
        </h1>

        <div className="mt-8 flex justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-hex.png" alt="ZUKE PLANTS POLE ロゴ" className="w-[140px] h-auto" />
        </div>

        <p className="mt-10 text-[15px] leading-loose text-gray-700">
          私たちがつくるのは、単なる園芸用の支柱ではありません。
          植物を支える道具であると同時に、暮らしの空間に美しく調和するプロダクトです。
        </p>
        <p className="mt-5 text-[15px] leading-loose text-gray-700">
          「インテリアに馴染む」「生活に馴染む」というコンセプトのもと、機能性とデザイン性を追求し、
          植物と人が心地よく共存するライフスタイルを提案します。
          支柱があることで、植物がより美しく、空間がより豊かになる。その新しい価値を、私たちは届けていきます。
        </p>

        <section className="mt-16">
          <h2 className="text-lg font-bold leading-relaxed border-l-2 border-[#222] pl-4">
            なぜ「支柱」をデザインするのか
          </h2>
          <p className="mt-5 text-[15px] leading-loose text-gray-700">
            観葉植物を部屋に迎えるとき、多くの人は鉢にはこだわります。けれど支柱は、園芸コーナーにある緑色のプラスチックや
            麻ひもを巻いた棒のまま、という場合がほとんどです。モンステラやポトスのような蔓性の植物は、
            育つほど支柱が必要になり、そして支柱ほど視界に入り続けるものはありません。
          </p>
          <p className="mt-5 text-[15px] leading-loose text-gray-700">
            それなら、支柱そのものが見えていい形をしていればいい。
            そう考えて生まれたのが、六角形を連ねた PLANTS POLE です。
            植物を支えるという実用性を保ったまま、家具やインテリアの一部として成立するかたちを目指しました。
          </p>
        </section>

        <section className="mt-16">
          <h2 className="text-lg font-bold leading-relaxed border-l-2 border-[#222] pl-4">
            素材とサイズ
          </h2>
          <p className="mt-5 text-[15px] leading-loose text-gray-700">
            {/* 2026-09-29 SEO R4: 「すべてアイアン製」は樹脂版・鉢・花瓶を含む現ラインナップと矛盾するため修正 */}
            アイアン支柱の PLANTS POLE はアイアンスチール製。細くても植物の重さに負けず、
            黒のマットな質感が葉の緑を引き締めます。サイズは小鉢向けの高さ約19.5cm から、
            リビングの主役になる約39cm まで。置き場所と株の大きさに合わせて選べます。
            樹脂版の支柱・拡張パーツ、六角鉢と受け皿、花瓶は PLA樹脂の3Dプリント製で、軽く、色を選べます。
          </p>
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-6">
            {PRODUCTS.map((p) => (
              <Link key={p.slug} href={`/products/${p.slug}`} className="block group">
                <div className="relative aspect-square bg-[#fbfbfb]">
                  <Image src={p.image} alt={p.fullName} fill className="object-contain group-hover:opacity-90 transition-opacity" sizes="(max-width: 768px) 50vw, 25vw" />
                </div>
                <p className="mt-3 text-[13px] leading-relaxed line-clamp-2">{p.name}</p>
                <p className="mt-1 text-[13px] font-bold">{yen(p.price)}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-lg font-bold leading-relaxed border-l-2 border-[#222] pl-4">
            ZUKE を見る・買う
          </h2>
          <ul className="mt-5 flex flex-col gap-3 text-[15px] text-gray-700">
            <li>
              <a href="https://shop.zukeplants.com" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 decoration-gray-300 hover:text-[#222]">
                オンラインストア（BASE）
              </a>
              <span className="ml-2 text-[13px] text-gray-500">— 全商品の購入はこちら</span>
            </li>
            <li>
              <a href="https://www.instagram.com/zuke.plantspole/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 decoration-gray-300 hover:text-[#222]">
                Instagram @zuke.plantspole
              </a>
              <span className="ml-2 text-[13px] text-gray-500">— 実際の使用例・インテリア実例</span>
            </li>
            <li>
              <a href="https://note.com/zuke_plantspole" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 decoration-gray-300 hover:text-[#222]">
                note
              </a>
              <span className="ml-2 text-[13px] text-gray-500">— ブランドの考えていること</span>
            </li>
            <li>
              <Link href="/guide" className="underline underline-offset-4 decoration-gray-300 hover:text-[#222]">
                インテリアグリーンのガイド
              </Link>
              <span className="ml-2 text-[13px] text-gray-500">— 飾り方・仕立て方の解説</span>
            </li>
            <li>
              <Link href="/wholesale" className="underline underline-offset-4 decoration-gray-300 hover:text-[#222]">
                卸売・仕入れのご案内
              </Link>
              <span className="ml-2 text-[13px] text-gray-500">— 販売店さま向けのお取引条件</span>
            </li>
          </ul>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
