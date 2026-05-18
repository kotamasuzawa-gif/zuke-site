import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ZUKE | Plants Pole",
  description: "ZUKEは植物とインテリアの間に美しい支柱を届けるブランドです。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="h-full">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
