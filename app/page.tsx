import fs from "node:fs";
import path from "node:path";
import BaseClone from "./components/BaseClone";
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

export default function Home() {
  return (
    <>
      <JsonLd />
      <BaseClone showLifestyle={showLifestyle} />
    </>
  );
}
