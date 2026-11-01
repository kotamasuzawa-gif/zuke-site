import { FAQS } from "@/app/components/HomeFaq";

/** 画面に出す5問。先頭2つだけ開く。FAQPage は FAQS の9問（この5問と本文が一致）。 */
const VISIBLE_QUESTIONS = [
  "園芸支柱はどう選べばいいですか？",
  "鉄製と3Dプリント製（樹脂版）の支柱はどう違いますか？",
  "六角鉢セットの差込口とは何ですか？",
  "屋外でも使えますか？",
  "価格と購入方法を教えてください。",
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
      <div className="mt-8 border-t border-[#E5DDCF]">
        {items.map((item, i) => (
          <details
            key={item.q}
            {...(i < 2 ? { open: true } : {})}
            className="group border-b border-[#E5DDCF] py-4"
          >
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-[15px] font-bold leading-relaxed [&::-webkit-details-marker]:hidden">
              <span>{item.q}</span>
              <span aria-hidden className="mt-0.5 shrink-0 text-[#6B6259] group-open:hidden">+</span>
              <span aria-hidden className="mt-0.5 hidden shrink-0 text-[#6B6259] group-open:inline">−</span>
            </summary>
            <p className="mt-2 text-[14px] leading-relaxed text-[#6B6259]">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
