import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "植欲マップ",
  description:
    "「植欲マップ」は、植物好きが“行きたい園芸店”を探せる地図アプリです。全国2,000店以上を掲載中。掲載は無料です。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
