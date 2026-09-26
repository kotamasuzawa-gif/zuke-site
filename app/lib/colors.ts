// 2026-09-26 商品画像のカラー切替（ホーム・商品一覧・カテゴリページで共通）
export type ColorKey = "black" | "white" | "orange" | "lightgray";
export const COLORS: { key: ColorKey; label: string; swatch: string }[] = [
  { key: "black", label: "ブラック", swatch: "#222" },
  { key: "white", label: "ホワイト", swatch: "#EDEAE3" },
  { key: "orange", label: "オレンジ", swatch: "#F06A1E" },
  { key: "lightgray", label: "ライトグレー", swatch: "#C9CACB" },
];
// アイアン支柱・花瓶はブラック/ホワイトのみ。3Dプリント樹脂製品は4色
export const FOUR_COLORS = new Set<string>(["hexpot-set", "hexpot-set2", "pole3pla", "pole2pla", "hexpot", "pole1pla", "hexparts"]);
// 2026-09-27 増澤さん指示: 全商品でオレンジ/ライトグレーにも切り替える（アイアン・花瓶もCodexで色替え画像を用意）
export const hasColor = (_slug: string, _color: ColorKey) => true;
export const productImage = (slug: string, color: ColorKey) => `/products/product-${slug}-${hasColor(slug, color) ? color : "black"}.webp`;
export const colorLabel = (color: ColorKey) => COLORS.find((c) => c.key === color)?.label ?? "";
