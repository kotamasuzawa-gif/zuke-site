import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// 2026-08-21 増澤さん要望: Ducks(plants.)風リデザイン。タイプライター調の英字ラベルにmonoを使う
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 2026-08-15 増澤さん要望: SEO対策（メタデータ拡充・OGP・canonical）
export const metadata: Metadata = {
  metadataBase: new URL("https://www.zukeplants.com"),
  title: {
    default: "ZUKE｜\"魅せる\"園芸支柱 PLANTS POLE - 観葉植物・蔓性植物のおしゃれな支柱",
    template: "%s｜ZUKE - 園芸支柱ブランド",
  },
  description:
    "ZUKE（ズーケ）は\"魅せる\"園芸支柱ブランド。六角形デザインの植物支柱 PLANTS POLE は、モンステラ・ポトスなど蔓性の観葉植物をインテリアに馴染むように美しく仕立てられます。¥770から、公式オンラインストアで販売中。",
  keywords: [
    "園芸支柱", "植物 支柱", "観葉植物 支柱", "支柱 おしゃれ",
    "蔓性植物 支柱", "モンステラ 支柱", "ポトス 支柱",
    "プランツポール", "PLANTS POLE", "ZUKE",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: "https://www.zukeplants.com",
    siteName: "ZUKE",
    title: "ZUKE｜\"魅せる\"園芸支柱 PLANTS POLE",
    description:
      "六角形デザインの園芸支柱で、観葉植物をインテリアに馴染むように美しく。¥770から、公式ストアで販売中。",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "ZUKE PLANTS POLE - 魅せる園芸支柱" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ZUKE｜\"魅せる\"園芸支柱 PLANTS POLE",
    description: "六角形デザインの園芸支柱で、観葉植物をインテリアに馴染むように美しく。",
    images: ["/og.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
