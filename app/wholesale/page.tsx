import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/app/components/SiteHeader";
import SiteFooter from "@/app/components/SiteFooter";
import { PRODUCTS, yen } from "@/app/lib/products";

// 卸売はアイアン支柱のみ（樹脂製は BASE 専売・2026-10-01 方針）
const WHOLESALE_PRODUCTS = PRODUCTS.filter((p) => p.kind === "iron");
import { WHOLESALE_EMAIL, WHOLESALE_MAILTO, WHOLESALE_MAIL_FIELDS } from "@/app/lib/contact";
import { SITE, OG_BASE, jsonLdHtml } from "@/app/lib/seo";

// 2026-09-29 増澤さん指示「卸売用の案内、ボタンなどもLPに設置して。メールが問い合わせ」で新設。
// 条件は増澤さんのお取引要綱（PDF）に準拠。掛け率・卸価格（下代の単価）はサイトに載せない（JSON-LD にも出さない）。
const TITLE = "卸売・仕入れのご案内";
const DESCRIPTION =
  "園芸店・植物店・インテリアショップ・雑貨店さま向けに、六角形デザインの園芸支柱 PLANTS POLE を卸売しています。1商品1ロット（10本）単位。卸価格などの条件は、お取引要綱としてメールでお送りします。";

export const metadata: Metadata = {
  title: `${TITLE}｜園芸支柱 PLANTS POLE`,
  description: DESCRIPTION,
  keywords: ["園芸支柱 卸", "園芸支柱 仕入れ", "観葉植物 支柱 卸売", "PLANTS POLE 卸", "ZUKE 卸売", "植物 支柱 仕入れ インテリアショップ"],
  alternates: { canonical: "/wholesale" },
  openGraph: {
    ...OG_BASE,
    title: `${TITLE}｜ZUKE`,
    description: DESCRIPTION,
    url: "/wholesale",
    // 2026-10-11 design/SEO(#7916): 汎用 og.jpg だったので卸売専用カード型OGに（10/15 卸提案メールのリンク先）
    images: [{ url: "/og/og-wholesale.jpg", width: 1200, height: 630, alt: "卸売・仕入れのご案内｜園芸支柱 PLANTS POLE" }],
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: TITLE,
    description: DESCRIPTION,
    url: `${SITE}/wholesale`,
    inLanguage: "ja",
    about: { "@id": `${SITE}/#org` },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "ホーム", item: SITE },
      { "@type": "ListItem", position: 2, name: TITLE, item: `${SITE}/wholesale` },
    ],
  },
];

// お取引要綱の要点（掛け率・卸価格は載せない）
const TERMS: { label: string; value: string }[] = [
  { label: "最小ロット", value: "1商品につき1ロット（10本）単位" },
  { label: "お支払い", value: "月末締め・翌月末までの請求書払い（銀行振込。振込手数料はお客様のご負担となります）" },
  { label: "発送", value: "在庫がある場合は、ご注文後3営業日以内に発送します。初回のお取引は、ご入金確認後3営業日以内の発送です" },
  { label: "送料", value: "ご注文の卸価格合計が22,000円（税込）以上の場合は送料当方負担（元払い）。22,000円未満の場合、送料はお客様のご負担です" },
  { label: "不良品・破損", value: "到着後7日以内にご連絡いただいた場合は交換いたします。お客様のご都合による返品はお受けしておりません" },
  { label: "価格", value: "価格は改定する場合があります" },
];

const STEPS: { title: string; body: string }[] = [
  { title: "メールでお問い合わせ", body: `${WHOLESALE_EMAIL} まで、店舗名・ご担当者名などを添えてご連絡ください。` },
  { title: "お取引要綱（PDF）をお送りします", body: "卸価格・お取引条件をまとめたお取引要綱を、メールでお送りします。" },
  { title: "条件のご確認・ご発注", body: "内容をご確認のうえ、ご希望の商品と数量をお知らせください。" },
  { title: "発送・ご請求", body: "在庫がある商品はご注文後3営業日以内に発送します（初回はご入金確認後）。お支払いは月末締め・翌月末までの請求書払いです。" },
];

function MailButton() {
  return (
    <div>
      <a
        href={WHOLESALE_MAILTO}
        className="flex items-center justify-center w-full py-4 bg-[#222] text-white text-sm tracking-[0.15em] hover:opacity-85 transition-opacity"
      >
        メールで卸売について問い合わせる
      </a>
      <p className="mt-3 text-xs text-gray-500 leading-relaxed text-center">
        メールソフトが開かない場合は、こちらのアドレスへお送りください：
        <span className="ml-1 text-[#222] select-all break-all">{WHOLESALE_EMAIL}</span>
      </p>
    </div>
  );
}

export default function WholesalePage() {
  return (
    <div className="min-h-screen bg-white text-[#222] flex flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdHtml(jsonLd)} />
      <SiteHeader />
      <main className="flex-1 max-w-2xl mx-auto px-6 w-full pt-14 md:pt-20">
        <nav aria-label="パンくず" className="text-xs text-gray-500 mb-8 flex items-center gap-2">
          <Link href="/" className="hover:text-[#222]">ホーム</Link>
          <span>/</span>
          <span className="text-[#222]">{TITLE}</span>
        </nav>

        <p className="text-[11px] tracking-[0.2em] text-gray-500">FOR SHOPS / WHOLESALE</p>
        <h1 className="mt-3 text-2xl md:text-3xl font-bold leading-relaxed">PLANTS POLE 卸売・仕入れのご案内</h1>
        <p className="mt-6 text-[15px] leading-loose text-gray-700">
          {"ZUKE では、六角形デザインの園芸支柱 PLANTS POLE を、お店で取り扱っていただける販売店さまへ卸売しています。園芸店・植物店・インテリアショップ・雑貨店さまなど、下記の条件をご確認のうえ、メールでお問い合わせください。"}
        </p>

        <div className="mt-10">
          <MailButton />
        </div>

        <section className="mt-16">
          <h2 className="text-lg font-bold leading-relaxed border-l-2 border-[#222] pl-4">お取引条件（概要）</h2>
          <dl className="mt-6 border-t border-gray-100 text-[14px]">
            {TERMS.map((t) => (
              <div key={t.label} className="flex gap-6 py-3 border-b border-gray-100">
                <dt className="w-24 shrink-0 text-gray-500">{t.label}</dt>
                <dd className="leading-relaxed">{t.value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 text-xs text-gray-500 leading-relaxed">
            詳しい条件は、お問い合わせいただいた販売店さまへお送りするお取引要綱をご確認ください。
          </p>
        </section>

        <section className="mt-16">
          <h2 className="text-lg font-bold leading-relaxed border-l-2 border-[#222] pl-4">卸価格（掛け率）について</h2>
          <p className="mt-5 text-[15px] leading-loose text-gray-700">
            卸価格・掛け率はサイト上では公開していません。お問い合わせいただいた販売店さまへ、お取引要綱（PDF）をメールでお送りします。
          </p>
        </section>

        <section className="mt-16">
          <h2 className="text-lg font-bold leading-relaxed border-l-2 border-[#222] pl-4">お問い合わせからお取引までの流れ</h2>
          <ol className="mt-6 flex flex-col gap-6">
            {STEPS.map((s, i) => (
              <li key={s.title} className="flex gap-5">
                <span className="text-[11px] tracking-[0.2em] text-gray-500 pt-1 shrink-0">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <p className="text-[15px] font-bold leading-relaxed">{s.title}</p>
                  <p className="mt-1 text-[14px] leading-relaxed text-gray-600">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-16">
          <h2 className="text-lg font-bold leading-relaxed border-l-2 border-[#222] pl-4">商品ラインナップ</h2>
          <p className="mt-5 text-[15px] leading-loose text-gray-700">
            各商品のサイズ・素材・カラーは商品ページでご確認いただけます。価格は公式オンラインストアでの販売価格（税込）です。卸売の対象商品は、お取引要綱とあわせてご案内します。
          </p>
          <div className="mt-8">
            <div className="flex items-baseline justify-between border-b border-[#e5e5e0] pb-2">
              <h3 className="text-[15px] font-bold tracking-[0.1em]">アイアン支柱</h3>
              <Link href="/collections/iron" className="text-[12px] tracking-[0.15em] text-gray-500 hover:text-[#222]">一覧を見る →</Link>
            </div>
            {/* 2026-10-10 増澤さん指示「商品の写真イメージも載せて」: 名前と価格だけのリストを写真付きグリッドに */}
            <ul className="grid grid-cols-2 gap-x-4 gap-y-6 pt-4 sm:grid-cols-4">
              {WHOLESALE_PRODUCTS.map((p) => (
                <li key={p.slug}>
                  <Link href={`/products/${p.slug}`} className="block hover:opacity-70">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.image} alt={p.name} loading="lazy" className="aspect-square w-full bg-gray-50 object-cover" />
                    <span className="mt-2 block text-[13px] leading-snug">{p.name}</span>
                    <span className="mt-1 block text-[13px] text-gray-600">{yen(p.price)}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[13px] leading-loose text-gray-500">
              3Dプリントの樹脂製品（六角鉢・樹脂支柱・拡張パーツ・花瓶）は受注生産のため、公式オンラインストアのみでの販売となり、卸売の対象外です。
            </p>
          </div>
          <p className="mt-6 text-[14px]">
            <Link href="/products" className="underline underline-offset-4 decoration-gray-300 hover:text-[#222]">商品一覧を見る</Link>
          </p>
        </section>

        <section className="mt-20 border-t border-gray-100 pt-14">
          <h2 className="text-lg font-bold leading-relaxed text-center">卸売のお問い合わせ</h2>
          <p className="mt-5 text-[14px] leading-loose text-gray-700 text-center">
            メールに以下をご記入いただくと、ご案内がスムーズです。
          </p>
          <ul className="mt-4 mx-auto max-w-sm flex flex-col gap-1 text-[14px] text-gray-700">
            {WHOLESALE_MAIL_FIELDS.map((f) => (
              <li key={f} className="flex gap-3"><span className="mt-2.5 w-1 h-1 rounded-full bg-[#222] shrink-0" />{f}</li>
            ))}
          </ul>
          <div className="mt-8">
            <MailButton />
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
