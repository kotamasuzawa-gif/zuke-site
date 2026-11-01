import { productBySlug, yen } from "@/app/lib/products";

const hex2 = productBySlug("hex2");
const noboribo = productBySlug("noboribo");

const FEATURES = [
  {
    en: "01",
    title: "挿すだけ",
    body: "株元から少し離して、鉢のふち寄りにまっすぐ挿します。六角鉢セットなら、鉢の内側の差込口に脚が入り、土に頼らず立ちます。",
  },
  {
    en: "02",
    title: "隠さない",
    body: "緑色の細い棒のように、植物の陰に隠す支柱ではありません。六角形のかたちが、家具や部屋の景色の一部になります。",
  },
  {
    en: "03",
    title: "大きさで選ぶ",
    body: `小鉢向けの約19.5cm（${hex2 ? yen(hex2.price) : "¥770"}）から。大きく育てる株には、水苔を詰める上り棒セット（${noboribo ? yen(noboribo.price) : "¥3,980"}）があります。`,
  },
] as const;

export function LpFeatures() {
  return (
    <section aria-labelledby="features-heading" className="mx-auto w-full max-w-[1120px] px-5 py-12 min-[601px]:px-8 min-[601px]:py-16">
      <p className="text-[12px] font-bold tracking-[0.22em] text-[#6B6259]">FEATURES</p>
      <h2 id="features-heading" className="mt-3 text-[26px] font-black leading-snug min-[601px]:text-[32px]">
        鉢に挿すだけ。部屋の景色になる。
      </h2>
      <ul className="mt-8 grid gap-4 min-[901px]:grid-cols-3">
        {FEATURES.map((item) => (
          <li key={item.en} className="rounded-[20px] border border-[#E5DDCF] bg-[#FFFDF8] p-6">
            <p className="text-[12px] font-bold tracking-[0.18em] text-[#5E7F3B]">{item.en}</p>
            <h3 className="mt-3 text-[18px] font-black">{item.title}</h3>
            <p className="mt-3 text-[14px] leading-relaxed text-[#6B6259]">{item.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
