// 2026-11-22 増澤さん（11:05 JST）: トップの動画の下に出すカード。
// 画像・文言・リンクの差し替えは、このファイルだけを編集する。
//
// 画像の置き場所: public/home-slider/
// 推奨サイズ: 横 1200 × 縦 800（3:2）。
// 枠は 3:2。はみ出した部分は中央で切り抜かれるので、見せたいものは中央に置く。
// 同じファイル名で上書きするか、各カードの image を新しいパスに変える。

export type HomeSliderCard = {
  id: string;
  /** タイトルの上に出す短いラベル */
  eyebrow: string;
  title: string;
  /** カード本文。仮の文言 */
  body: string;
  href: string;
  /** true のとき新しいタブで開く */
  external?: boolean;
  /** public/ からのパス。例: /home-slider/hex-pot.webp */
  image: string;
  imageAlt: string;
};

/** デザイナーが画像を差し替えるときの目安。枠の縦横比は HomeSlider の aspect-[3/2] と揃える。 */
export const HOME_SLIDER_IMAGE = {
  directory: "public/home-slider",
  width: 1200,
  height: 800,
  aspectRatio: "3:2",
} as const;

// リンク先（2026-11-22 時点）:
// HEX POT SYSTEM / HEX POLE SYSTEM という名前のページは無い。
// 鉢は /collections/pot（鉢・セット。HEX POT BOLD / LEAN を含む）、
// 支柱は /collections/pole。商品一覧の該当見出しは /products#grp-pot と /products#grp-pole。
export const HOME_SLIDER_CARDS: HomeSliderCard[] = [
  {
    id: "hex-pot",
    eyebrow: "POT",
    title: "HEX POT SYSTEM",
    body: "六角形のスリット鉢。形をそろえて、植物を飾る。",
    href: "/collections/pot",
    image: "/home-slider/hex-pot.webp",
    imageAlt: "HEX POT BOLD（ホワイトマーブル）の仮画像",
  },
  {
    id: "hex-pole",
    eyebrow: "POLE",
    title: "HEX POLE SYSTEM",
    body: "六角形の園芸支柱。蔓を立ち上げて、部屋の景色にする。",
    href: "/collections/pole",
    image: "/home-slider/hex-pole.webp",
    imageAlt: "六角形の園芸支柱と観葉植物の仮画像",
  },
  {
    id: "shokuyoku-map",
    eyebrow: "MAP",
    title: "植欲マップ",
    body: "行きたい園芸店が、地図から見つかる。",
    href: "https://shokuyoku-map.com",
    external: true,
    image: "/home-slider/shokuyoku.webp",
    imageAlt: "植欲マップのアイコン（仮画像）",
  },
];
