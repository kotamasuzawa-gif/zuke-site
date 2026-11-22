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

// 2026-11-22 12:29 増澤さん: 3枚目は植欲マップではなく HEX IRON。
// 文言・リンク・alt は copy.md のとおり。すべてサイト内で、同じタブで開く。
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
    id: "hex-iron",
    title: "HEX IRON",
    body: "細いアイアンで、植物を軽やかに",
    href: "/collections/iron",
    image: "/home-slider/card_03_hexiron.webp",
    imageAlt: 'PLANTS POLE "5つの六角形" アイアン（ブラック）を鉢に立てた写真',
  },
];
