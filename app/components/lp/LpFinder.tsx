import { FINDER_CASES } from "@/app/components/finderTree";
import { LpPlantFinder } from "./LpPlantFinder";
import { productBySlug } from "@/app/lib/products";
import { lpProductName } from "./names";
import { baseItemId, lpShopUrl } from "./utm";

function caseProducts(slugs: string[]) {
  const seen = new Set<string>();
  return slugs.flatMap((slug) => {
    if (seen.has(slug)) return [];
    seen.add(slug);
    const product = productBySlug(slug);
    if (!product || product.soldOut) return [];
    return [product];
  });
}

export function LpFinder() {
  const cases = FINDER_CASES.map((item) => ({
    ...item,
    products: caseProducts(item.slugs),
  })).filter((item) => item.products.length > 0);

  return (
    <section aria-labelledby="finder-heading" className="mx-auto w-full max-w-[1120px] px-5 py-12 min-[601px]:px-8 min-[601px]:py-16">
      <div className="rounded-[20px] border border-[#E5DDCF] bg-[#FFFDF8] p-6 min-[601px]:p-10">
        <p className="text-[12px] font-bold tracking-[0.22em] text-[#6B6259]">FIND YOUR POLE</p>
        <h2 id="finder-heading" className="mt-3 text-[26px] font-black leading-snug min-[601px]:text-[32px]">
          質問に答えて、合う一本を選ぶ。
        </h2>
        <p className="mt-4 max-w-[36em] text-[15px] leading-relaxed text-[#6B6259]">
          用途から商品を直接見るか、下の診断で鉢の大きさと素材を順に選べます。
        </p>
        <ul className="mt-8 flex flex-col gap-5">
          {cases.map((item) => (
            <li key={item.id} className="border-t border-[#E5DDCF] pt-4">
              <p className="text-[14px] font-bold">{item.label}</p>
              <ul className="mt-2 flex flex-col gap-1.5">
                {item.products.map((product) => (
                  <li key={product.slug}>
                    <a
                      href={lpShopUrl("finder", baseItemId(product.baseUrl))}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[14px] leading-relaxed text-[#5E7F3B] underline decoration-[#E5DDCF] underline-offset-4 hover:decoration-[#5E7F3B]"
                    >
                      {lpProductName(product.slug) ?? product.name}
                    </a>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
        <a
          href="#plant-finder"
          className="mt-8 inline-flex min-h-12 items-center rounded-full border border-[#5E7F3B] px-7 text-[15px] font-bold text-[#5E7F3B] hover:bg-[#5E7F3B] hover:text-white"
        >
          診断して選ぶ
        </a>
        <div id="plant-finder" className="mt-10 scroll-mt-24 border-t border-[#E5DDCF] pt-8">
          <LpPlantFinder />
        </div>
      </div>
    </section>
  );
}
