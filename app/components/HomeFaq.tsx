import Link from "next/link";
import { PRODUCTS, yen, type Product } from "@/app/lib/products";
import { WHOLESALE_EMAIL } from "@/app/lib/contact";

// 2026-09-29 SEO R4: 価格は products.ts（BASE と同期）から算出する。
// 固定文言だと「樹脂版支柱は¥580から」のように実売価格（¥480）とずれ、FAQPage の JSON-LD にもそのまま出ていた。
const shortName = (p: Product) => p.name.match(/"(.+?)"/)?.[1] ?? p.name;
const priceFrom = (items: Product[]) => {
  const min = Math.min(...items.map((p) => p.price));
  return { price: yen(min), names: items.filter((p) => p.price === min).map(shortName).join("・") };
};
const priceTo = (items: Product[]) => {
  const max = Math.max(...items.map((p) => p.price));
  return { price: yen(max), names: items.filter((p) => p.price === max).map(shortName).join("・") };
};
const ironPoles = PRODUCTS.filter((p) => p.kind === "iron" && p.category === "pole");
const plaPoles = PRODUCTS.filter((p) => p.kind === "pla" && p.category === "pole");
const potSets = PRODUCTS.filter((p) => p.category === "pot" && p.name.includes("セット"));
const ironFrom = priceFrom(ironPoles);
const ironTo = priceTo(ironPoles);
const plaFrom = priceFrom(plaPoles);
const setFrom = priceFrom(potSets);

// 2026-09-20 増澤さん依頼のSEO強化:
//   トップの本文が606字しかなく（BASEクローン化の副作用）、検索で拾える語が不足していた。
//   BASE準拠の見た目を崩さない範囲で、実際に検索される質問に答えるFAQを追加する。
//   同じ内容を FAQPage 構造化データでも出し、リッチリザルト（よくある質問）を狙う。
export const FAQS = [
  {
    q: "園芸支柱はどう選べばいいですか？",
    a: "鉢の大きさと植物の高さで選びます。3〜4号鉢のポトスやシンゴニウムなら高さ約19.5cmの「2つの六角形」、ホヤなど小さめの蔓性植物なら約22cmの「3つの六角形」、5〜6号鉢のモンステラやフィロデンドロンなら全長約39cmの「5つの六角形」が目安です。横に広がってしまった株は、曲線で矯正できる「うねうね」が向いています。",
  },
  {
    q: "モンステラの支柱はいつ立てればいいですか？",
    a: "茎が倒れはじめたら立てどきです。葉が大きくなって自重で傾く前に支柱を挿しておくと、茎をまっすぐ上へ誘引できます。植え替えのタイミングで一緒に挿すと根を傷めにくく、株姿も整えやすくなります。",
  },
  {
    q: "支柱は鉢のどこに挿しますか？",
    a: "株元から少し離した鉢のふち寄りに、まっすぐ深く挿します。中心に挿すと主根を傷める可能性があるためです。挿したあと、蔓や茎をやさしく沿わせて誘引してください。",
  },
  {
    q: "プラスチックの支柱と何が違いますか？",
    a: "PLANTS POLE にはアイアンスチール製と3Dプリント（PLA樹脂）製があり、どちらも六角形が連なるデザインそのものをインテリアの一部として設計しています。緑色の細い棒のように「植物に隠れて目立たないようにするもの」ではなく、家具や部屋の景観に馴染みながら見せる支柱です。",
  },
  {
    q: "屋外でも使えますか？",
    a: "室内のインテリアグリーン向けに設計していますが、ベランダなど軒下での使用も可能です。雨ざらしになる環境では、素材の性質上さびが出ることがあります。",
  },
  {
    q: "価格と購入方法を教えてください。",
    a: `鉄製のPLANTS POLEは${ironFrom.price}（${ironFrom.names}）から${ironTo.price}（${ironTo.names}）まで${ironPoles.length}型、3Dプリント製の樹脂版支柱は${plaFrom.price}（${plaFrom.names}）から、支柱の差込口付きの六角鉢セットは${setFrom.price}からです。公式オンラインストア（BASE）からご購入いただけます。`,
  },
  {
    q: "鉄製と3Dプリント製（樹脂版）の支柱はどう違いますか？",
    a: "鉄製は塗装仕上げで丈夫、屋外の軒下でも使える上位モデルです。樹脂版はPLA樹脂の3Dプリント製で、鉄製の約1/3の重さ。ブラック・ホワイト・ライトグレー・オレンジから色が選べ、価格も抑えたエントリーモデルです。どちらも六角鉢セットの差込口に対応しています。",
  },
  {
    q: "六角鉢セットの差込口とは何ですか？",
    a: "鉢の内側にある、支柱の脚がぴったり入る2つの穴です。土に頼らず鉢そのもので支柱を固定するので、水やりで支柱が傾いたり抜けたりしません。鉢には植物タグ用のポケット（幅20mm・厚み2.5mmまで）もあり、受け皿には鉢を少し浮かせる台が付いています。",
  },
  {
    // 2026-09-29 増澤さん指示: 卸売の案内（掛け率・卸価格は載せない）
    q: "お店で取り扱いたい（卸売・仕入れ）場合はどうすればいいですか？",
    a: `園芸店・インテリアショップなどの販売店さま向けに卸売を行っています。1商品10本からのお取引で、卸価格などの条件はお取引要綱としてメールでお送りします。${WHOLESALE_EMAIL} までお問い合わせください。`,
  },
];

export function HomeFaq() {
  return (
    <section className="px-6 pb-20 max-w-2xl mx-auto" aria-labelledby="faq-heading">
      <h2 id="faq-heading" className="text-[15px] font-bold tracking-[0.1em] text-center">
        よくあるご質問
      </h2>
      <dl className="mt-8 divide-y divide-gray-100 border-t border-gray-100">
        {FAQS.map((f) => (
          <div key={f.q} className="py-5">
            <dt className="text-[14px] font-bold leading-relaxed text-[#222]">{f.q}</dt>
            <dd className="mt-2 text-[13px] leading-loose text-gray-600">{f.a}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-8 text-center text-[13px] leading-loose text-gray-600">
        選び方や飾り方は
        <Link href="/guide" className="mx-1 underline underline-offset-4 hover:opacity-60">
          インテリアグリーンのガイド
        </Link>
        でも解説しています。
        <br />
        販売店さま向けの卸売は
        <Link href="/wholesale" className="mx-1 underline underline-offset-4 hover:opacity-60">
          卸売・仕入れのご案内
        </Link>
        をご覧ください。
      </p>
    </section>
  );
}
