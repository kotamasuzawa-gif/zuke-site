// 2026-11-22 増澤さん（11:05 JST）: トップの動画の下に出すカード。
// 画像・文言・リンク・alt の差し替えは、このファイルだけを編集する。
//
// 画像の置き場所: public/home-slider/
// サイズ: 横 1200 × 縦 800（3:2）。文字は画像に入っているので、画面では重ねない。

export type HomeSliderCard = {
  id: string;
  /** 読み上げとドットの名前。画面には出さない */
  title: string;
  href: string;
  /** public/ からのパス。例: /home-slider/card_01_hexpot_text.webp */
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

// 2026-11-22 文字入り画像。リンクは前と同じで、同じタブで開く。
export const HOME_SLIDER_CARDS: HomeSliderCard[] = [
  {
    id: "hex-pot",
    title: "HEX POT SYSTEM",
    href: "/products/hexpot-lean",
    image: "/home-slider/card_01_hexpot_text.webp",
    imageAlt: "HEX POT SYSTEM 根が呼吸する、六角のスリット鉢",
  },
  {
    id: "hex-pole",
    title: "HEX POLE SYSTEM",
    href: "/collections/pole",
    image: "/home-slider/card_02_hexpole_text.webp",
    imageAlt: "HEX POLE SYSTEM 伸びた蔓を、インテリアの一部に。",
  },
  {
    id: "hex-iron",
    title: "HEX IRON",
    href: "/collections/iron",
    image: "/home-slider/card_03_hexiron_text.webp",
    imageAlt: "HEX IRON 細いアイアンで、植物を軽やかに",
  },
];
