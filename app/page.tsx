import type { Metadata } from "next";
import { JsonLd } from "./components/JsonLd";
import { HomeLanding } from "./components/lp/HomeLanding";

// 2026-09-29 SEO R4: canonical は layout から移動（全ページへの継承を防ぐ）
// title / description は layout のまま。見た目の h1 だけ新しい見出し。
export const metadata: Metadata = { alternates: { canonical: "/" } };

export default function Home() {
  return (
    <>
      <JsonLd />
      <HomeLanding />
    </>
  );
}
