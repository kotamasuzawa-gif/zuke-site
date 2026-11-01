import { PRODUCTS, yen, type Product } from "@/app/lib/products";

// トップだけの FAQ。HomeFaq の9問（他ページ・共有コンポーネント）とは別。
// 価格は products.ts から出す。売り切れ（soldOut）は鉄の型数にも上限にも入れない。
const shortName = (p: Product) => p.name.match(/"(.+?)"/)?.[1] ?? p.name;
const priceFrom = (items: Product[]) => {
  const min = Math.min(...items.map((p) => p.price));
  return { price: yen(min), names: items.filter((p) => p.price === min).map(shortName).join("・") };
};
const priceTo = (items: Product[]) => {
  const max = Math.max(...items.map((p) => p.price));
  return { price: yen(max), names: items.filter((p) => p.price === max).map(shortName).join("・") };
};
const onSale = (p: Product) => !p.soldOut;
const ironPoles = PRODUCTS.filter((p) => p.kind === "iron" && p.category === "pole" && !p.isSet && onSale(p));
const plaPoles = PRODUCTS.filter((p) => p.kind === "pla" && p.category === "pole" && onSale(p));
const potSets = PRODUCTS.filter((p) => p.name.includes("六角鉢セット") && onSale(p));
const ironFrom = priceFrom(ironPoles);
const ironTo = priceTo(ironPoles);
const plaFrom = priceFrom(plaPoles);
const setFrom = priceFrom(potSets);

export const LP_FAQS = [
  {
    q: "園芸支柱はどう選べばいいですか？",
    a: "鉢の大きさと植物の高さで選びます。3〜4号鉢のポトスやシンゴニウムなら高さ約19.5cmの「2つの六角形」、ホヤなど小さめの蔓性植物なら約22cmの「3つの六角形」が目安です。モンステラやフィロデンドロンのように大きく育つ株は、水苔に気根を掴ませて登らせる「上り棒セット」が向いています。横に広がってしまった株は、曲線で矯正できる「うねうね」が合います。",
  },
  {
    q: "鉄製と3Dプリント製（樹脂版）の支柱はどう違いますか？",
    a: "鉄製は塗装仕上げで丈夫、屋外の軒下でも使える上位モデルです。樹脂版はPLA樹脂の3Dプリント製で、鉄製の約1/3の重さ。ブラック・ホワイト・ライトグレー・オレンジから色が選べ、価格も抑えたエントリーモデルです。どちらも六角鉢セットの差込口に対応しています。",
  },
  {
    q: "六角鉢セットの差込口とは何ですか？",
    a: "鉢の内側にある、支柱の脚がぴったり入る2つの穴です。土に頼らず鉢そのもので支柱を固定するので、水やりで支柱が傾いたり抜けたりしません。",
  },
  {
    q: "屋外でも使えますか？",
    a: "室内のインテリアグリーン向けに設計していますが、ベランダなど軒下での使用も可能です。雨ざらしになる環境では、素材の性質上さびが出ることがあります。",
  },
  {
    q: "価格と購入方法を教えてください。",
    a: `鉄製のPLANTS POLEは${ironFrom.price}〜${ironTo.price}（${ironTo.names}）の${ironPoles.length}型、3Dプリント製の樹脂版支柱は${plaFrom.price}（${plaFrom.names}）から、支柱の差込口付きの六角鉢セットは${setFrom.price}からです（税込）。公式オンラインストア（BASE）からご購入いただけます。`,
  },
];
