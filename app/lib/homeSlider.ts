// 2026-11-22 増澤さん（11:05 JST）: トップの動画の下に出すカード。
// 画像・文言・リンク・alt の差し替えは、このファイルだけを編集する。
//
// 画像の置き場所: public/home-slider/
// サイズ: 横 1200 × 縦 800（3:2）。地は上 #F2F2F2 → 下 #FAFAFA。文字は画像に入れない。

export type HomeSliderCard = {
  id: string;
  title: string;
  body: string;
  href: string;
  /** true のとき新しいタブで開く */
  external?: boolean;
  /** public/ からのパス。例: /home-slider/card_01_hexpot.webp */
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

// 2026-11-22 デザイナー素材。文言・リンク・alt は copy.md のとおり。
// HEX POT は LEAN の商品ページ。HEX POLE は支柱のまとまり。植欲マップは別タブ。
export const HOME_SLIDER_CARDS: HomeSliderCard[] = [
  {
    id: "hex-pot",
    title: "HEX POT SYSTEM",
    body: "根が呼吸する、六角のスリット鉢",
    href: "/products/hexpot-lean",
    image: "/home-slider/card_01_hexpot.webp",
    imageAlt: "HEX POT（ホワイトマーブル・半透明ライトブルー・ブラック）",
  },
  {
    id: "hex-pole",
    title: "HEX POLE SYSTEM",
    body: "伸びた蔓を、インテリアの一部に。",
    href: "/collections/pole",
    image: "/home-slider/card_02_hexpole.webp",
    imageAlt: "六角鉢に差したPLANTS POLE 3つの六角形（樹脂版）",
  },
  {
    id: "shokuyoku-map",
    title: "植欲マップ",
    body: "近くの園芸店が、地図で見つかる",
    href: "https://shokuyoku-map.com/?utm_source=zukeplants&utm_medium=top_slider",
    external: true,
    image: "/home-slider/card_03_shokuyoku.webp",
    imageAlt: "植欲マップのアプリアイコンとホーム画面",
  },
];
