import { FAQS } from "@/app/components/HomeFaq";

/** 画面に出す5問。FAQPage の構造化データは HomeFaq の9問のまま。 */
const VISIBLE_QUESTIONS = [
  "園芸支柱はどう選べばいいですか？",
  "モンステラの支柱はいつ立てればいいですか？",
  "支柱は鉢のどこに挿しますか？",
  "価格と購入方法を教えてください。",
  "お店で取り扱いたい（卸売・仕入れ）場合はどうすればいいですか？",
] as const;

export function LpFaq() {
  const items = VISIBLE_QUESTIONS.map((q) => {
    const found = FAQS.find((f) => f.q === q);
    if (!found) throw new Error(`FAQ missing: ${q}`);
    return found;
  });

  return (
    <section aria-labelledby="lp-faq-heading" className="mx-auto w-full max-w-[760px] px-5 py-12 min-[601px]:px-8 min-[601px]:py-16">
      <p className="text-[12px] font-bold tracking-[0.22em] text-[#6B6259]">FAQ</p>
      <h2 id="lp-faq-heading" className="mt-3 text-[26px] font-black leading-snug min-[601px]:text-[32px]">
        よくあるご質問
      </h2>
      <dl className="mt-8 border-t border-[#E5DDCF]">
        {items.map((item) => (
          <div key={item.q} className="border-b border-[#E5DDCF] py-5">
            <dt className="text-[15px] font-bold leading-relaxed">{item.q}</dt>
            <dd className="mt-2 text-[14px] leading-relaxed text-[#6B6259]">{item.a}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
