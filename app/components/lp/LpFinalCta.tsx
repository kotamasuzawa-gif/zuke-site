import { productBySlug, yen } from "@/app/lib/products";
import { lpShopUrl } from "./utm";

export function LpFinalCta() {
  const entry = productBySlug("hex2");
  const from = entry ? yen(entry.price) : "¥770";

  return (
    <section aria-labelledby="final-cta-heading" className="bg-[#5E7F3B] text-white">
      <div className="mx-auto w-full max-w-[760px] px-5 py-16 text-center min-[601px]:py-20">
        <h2 id="final-cta-heading" className="text-[26px] font-black leading-snug min-[601px]:text-[36px]">
          垂らしたままにしない。
        </h2>
        <p className="mt-4 text-[15px] leading-relaxed text-white/90">
          公式ショップで、色とサイズを選べます。アイアンの支柱は{from}から。
        </p>
        <a
          href={lpShopUrl("final")}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex min-h-12 items-center rounded-full bg-[#F06A1E] px-7 text-[15px] font-bold text-white hover:opacity-90"
        >
          ショップで見る
        </a>
      </div>
    </section>
  );
}
