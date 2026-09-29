import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { preload } from "react-dom";
import BaseClone from "./components/BaseClone";
import { HomeFaq } from "./components/HomeFaq";
import { JsonLd } from "./components/JsonLd";

// 2026-08-21 増澤さん指示: BASEショップのホームと同一の見た目。
// 旧セクション(Ducks風/白基調)のコンポーネントは components/ に温存（復帰可能）。

// 2026-08-22: ライフスタイル写真は黒/白の2枚が揃ってから表示する。
// ビルド時に public/ の実ファイル有無を判定するので、画像を置けば次のデプロイで自動的に出る
// （未配置のまま参照して本番で画像リンク切れになるのを防ぐ）。
const LIFESTYLE_FILES = ["lifestyle-hex-black.jpg", "lifestyle-hex-white.jpg"];
const showLifestyle = LIFESTYLE_FILES.every((f) =>
  fs.existsSync(path.join(process.cwd(), "public", f)),
);

// 2026-09-29 SEO R4: canonical は layout から移動（全ページへの継承を防ぐ）
export const metadata: Metadata = { alternates: { canonical: "/" } };

export default function Home() {
  // 2026-09-29 SEO R4: ファーストビューの組み立て動画のポスターを優先読み込み（LCP 候補）。
  // 以前は下部のライフスタイル写真に priority が付いていて、こちらと帯域を取り合っていた
  preload("/video/hexpot-assemble-poster.jpg", { as: "image", fetchPriority: "high" });
  return (
    <>
      <JsonLd />
      <BaseClone showLifestyle={showLifestyle} />
      <HomeFaq />
    </>
  );
}
