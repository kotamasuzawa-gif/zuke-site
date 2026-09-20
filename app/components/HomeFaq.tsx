import Link from "next/link";

// 2026-09-20 増澤さん依頼のSEO強化:
//   トップの本文が606字しかなく（BASEクローン化の副作用）、検索で拾える語が不足していた。
//   BASE準拠の見た目を崩さない範囲で、実際に検索される質問に答えるFAQを追加する。
//   同じ内容を FAQPage 構造化データでも出し、リッチリザルト（よくある質問）を狙う。
export const FAQS = [
  {
    q: "園芸支柱はどう選べばいいですか？",
    a: "鉢の大きさと植物の高さで選びます。3〜4号鉢のポトスやシンゴニウムなら高さ約19.5cmの「2つの六角形」、5〜6号鉢のモンステラやフィロデンドロンなら約29cm以上の「3つの六角形」「5つの六角形」が目安です。横に広がってしまった株は、曲線で矯正できる「うねうね」が向いています。",
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
    a: "PLANTS POLE はアイアンスチール製で、六角形が連なるデザインそのものをインテリアの一部として設計しています。緑色の細い棒のように「植物に隠れて目立たないようにするもの」ではなく、家具や部屋の景観に馴染みながら見せる支柱です。",
  },
  {
    q: "屋外でも使えますか？",
    a: "室内のインテリアグリーン向けに設計していますが、ベランダなど軒下での使用も可能です。雨ざらしになる環境では、素材の性質上さびが出ることがあります。",
  },
  {
    q: "価格と購入方法を教えてください。",
    a: "¥770（2つの六角形）から¥1,320（5つの六角形・うねうね）まで4型を展開しています。公式オンラインストア（BASE）からご購入いただけます。",
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
      </p>
    </section>
  );
}
