// 2026-09-26 商品画像のカラー切替（ホーム・商品一覧・カテゴリページで共通）
export type ColorKey = "black" | "white" | "orange" | "lightgray";
export const COLORS: { key: ColorKey; label: string; swatch: string }[] = [
  { key: "black", label: "ブラック", swatch: "#222" },
  { key: "white", label: "ホワイト", swatch: "#EDEAE3" },
  { key: "orange", label: "オレンジ", swatch: "#F06A1E" },
  { key: "lightgray", label: "ライトグレー", swatch: "#C9CACB" },
];
// アイアン支柱・花瓶はブラック/ホワイトのみ。3Dプリント樹脂製品は4色
export const FOUR_COLORS = new Set<string>(["hexpot-set", "hexpot-set2", "pole3pla", "pole2pla", "hexpot", "pole1pla", "hexparts", "hexclip5"]);
// 2026-09-27 増澤さん指示: 全商品でオレンジ/ライトグレーにも切り替える（アイアン・花瓶もCodexで色替え画像を用意）
export const hasColor = (_slug: string, _color: ColorKey) => true;
export const productImage = (slug: string, color: ColorKey) => `/products/product-${slug}-${hasColor(slug, color) ? color : "black"}.webp`;
// 2026-10-05 増澤さん「LPがBASEの写真と一緒じゃない。BASEを正にして」: 最初に見せる写真は BASE の1枚目（product-<slug>-base.webp）。
// 色のボタンを押したときだけ、その色の写真に切り替える（color が null の間は BASE の写真）
export const baseImage = (slug: string) => `/products/product-${slug}-base.webp`;
export const shownImage = (slug: string, color: ColorKey | null) => (color ? productImage(slug, color) : baseImage(slug));
export const colorLabel = (color: ColorKey | null) => COLORS.find((c) => c.key === color)?.label ?? "";
// 2026-09-29 商品詳細ページの色切替。購入ページなので BASE で実際に選べるバリエーションだけ出す
// （BASE の Meta フィードの種類と一致させる。BASE 側で色を増減したらここも更新）
const SOLD_COLORS: Record<string, ColorKey[]> = {
  hex5: ["black", "white"],
  hex3: ["black", "white"],
  hex2: ["black", "white"],
  uneune: ["black", "white"],
  // 2026-10-06 丸鉢スタンドセットは色の選択肢ではなく「オレンジ鉢×ブラックスタンド」「ブラック鉢×オレンジスタンド」「ライトグレー鉢×ブラックスタンド」の3種（EC店長#4408で確定。white・base単色は存在しない）。色ボタンは出さない
  "marupot-stand": [],
};
export const soldColors = (slug: string): ColorKey[] => SOLD_COLORS[slug] ?? COLORS.map((c) => c.key);
// 2026-10-10 EC店長#7597: ホーム・商品一覧・カテゴリの色ボタンは全4色固定なので、その商品に存在しない配色を押すと
// 中身は base のままなのに alt だけ「（ホワイト）」になっていた（丸鉢スタンドのホワイト用ファイルは base と同一）。
// 2026-09-27 増澤さん「全商品でオレンジ/ライトグレーにも切り替える」は維持したいので、BASE で買える色（soldColors）では
// なく「その配色の写真が存在しない色」だけを除外し、base 画像＋色名なしの alt に戻す。
const NO_PHOTO_COLORS: Record<string, ColorKey[]> = {
  // 丸鉢スタンドセットはオレンジ鉢／ブラック鉢／ライトグレー鉢の3種だけ。白の鉢は商品も写真も無い
  "marupot-stand": ["white"],
};
export const hasColorPhoto = (slug: string, color: ColorKey | null): color is ColorKey =>
  color !== null && !(NO_PHOTO_COLORS[slug] ?? []).includes(color);
/** 一覧系の表示画像。その配色の写真が無い色のときは BASE の1枚目に戻す */
export const shownImageFor = (slug: string, color: ColorKey | null) =>
  shownImage(slug, hasColorPhoto(slug, color) ? color : null);
/** 一覧系の alt に付ける色名。その配色の写真が無い色のときは空（色名を書かない） */
export const shownColorLabel = (slug: string, color: ColorKey | null) =>
  hasColorPhoto(slug, color) ? colorLabel(color) : "";
