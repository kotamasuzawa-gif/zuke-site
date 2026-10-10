import type { Metadata } from "next";
import { Inter, Noto_Sans_JP } from "next/font/google";
import "./globals.css";

// 2026-09-29 SEO R4: Geist / Geist_Mono は表示中のページで使っておらず（旧コンポーネントのみ）、
// 全ページで woff2 を preload していたため削除。旧コンポーネントを戻しても monospace にフォールバックする。

// 2026-08-21: BASEショップと同じ書体（Inter + Noto Sans JP）
const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const notoSansJP = Noto_Sans_JP({ variable: "--font-noto-sans-jp", subsets: ["latin"], weight: ["400", "700"] });

// 2026-08-15 増澤さん要望: SEO対策（メタデータ拡充・OGP・canonical）
export const metadata: Metadata = {
  metadataBase: new URL("https://www.zukeplants.com"),
  title: {
    default: "ZUKE｜インテリアに馴染む園芸支柱 PLANTS POLE",
    template: "%s｜ZUKE",
  },
  // 2026-09-29 SEO R4: 142字で検索結果で切れていた＆「¥580から」が実売（支柱¥480〜）とずれていたため、価格を外して短縮
  description:
    "ZUKE（ズーケ）は\"魅せる\"園芸支柱ブランド。六角形デザインの PLANTS POLE で、モンステラ・ポトスなど蔓性の観葉植物をインテリアに馴染むように仕立てます。支柱が差せる六角鉢や花瓶も公式ストアで販売中。",
  keywords: [
    "園芸支柱", "植物 支柱", "観葉植物 支柱", "支柱 おしゃれ",
    "蔓性植物 支柱", "モンステラ 支柱", "ポトス 支柱",
    // 2026-08-22 増澤さん要望: インテリア／インテリアグリーン／家具の文脈を追加
    "インテリアグリーン", "観葉植物 インテリア", "インテリア 植物", "家具 観葉植物",
    "プランツポール", "PLANTS POLE", "ZUKE",
    // 2026-09-23 SEO R3: 3Dプリント商品（六角鉢セット・樹脂版支柱・花瓶）
    "支柱 鉢 セット", "支柱付き 鉢", "六角形 鉢", "3Dプリント 植木鉢", "3Dプリント 花瓶", "PLA 鉢", "観葉植物 鉢 おしゃれ",
  ],
  // 2026-09-29 SEO R4: canonical "/" は全ページに継承されてしまう（404 や書き忘れたページがホームを canonical にする）ため
  // app/page.tsx へ移動。robots の index/follow は既定値なので削除（404 で noindex と重複していた）。
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: "https://www.zukeplants.com",
    siteName: "ZUKE",
    title: "ZUKE｜\"魅せる\"園芸支柱 PLANTS POLE",
    description:
      "六角形デザインの園芸支柱で、観葉植物をインテリアに馴染むように美しく。公式ストアで販売中。",
    // 2026-10-11 design/SEO(#7916): 汎用 og.jpg（文字なし）だったのでブランドカード型OGに。about と共用。
    images: [{ url: "/og/og-brand.jpg", width: 1200, height: 630, alt: "ZUKE PLANTS POLE - 魅せる園芸支柱" }],
  },
  // 2026-09-29 SEO R4: card だけにする。title/description/images を root で固定すると全ページに継承され、
  // 商品ページでも twitter:title がホームの文言になっていた。未指定なら Next が各ページの openGraph から補完する。
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${inter.variable} ${notoSansJP.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
