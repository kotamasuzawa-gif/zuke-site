import Link from "next/link";
import { PRODUCTS, yen } from "@/app/lib/products";

// 2026-10-23 SEO(#12563): /collections/iron の冒頭に価格帯の比較表を置く。
// アイアン支柱は ¥770〜¥1,320 の4本で、違いは「高さ」と「向いている植物」だけ。
// 一覧カードは価格しか出ていないため、安いほうから並べて高さと用途を一度に見せ、
// 「どれを買えばいいか」を一覧ページで決められるようにする。
// 数字は products.ts の確定値だけを使う（height / price / plants。推定値は入れない）。
const ORDER = ["hex2", "hex3", "uneune", "hex5"] as const;

export default function IronPriceTable() {
  const rows = ORDER.map((slug) => PRODUCTS.find((p) => p.slug === slug)).filter(
    (p): p is NonNullable<typeof p> => Boolean(p),
  );
  if (rows.length === 0) return null;
  const prices = rows.map((p) => p.price);
  const min = Math.min(...prices);
  const max = Math.max(...prices);

  return (
    <section aria-labelledby="iron-price-table" className="mt-8">
      <h2 id="iron-price-table" className="text-base font-bold">
        高さと価格の比較（{yen(min)}〜{yen(max)}）
      </h2>
      <p className="mt-2 text-[13px] leading-relaxed text-gray-600">
        アイアン支柱は4本。選ぶときの違いは「高さ」と「支える植物」です。
      </p>
      <div className="mt-4 -mx-6 md:mx-0 overflow-x-auto">
        <table className="w-full min-w-[520px] border-collapse text-left text-[14px]">
          <thead>
            <tr className="border-b border-gray-200 text-[12px] text-gray-500">
              <th scope="col" className="py-2 pl-6 pr-3 font-normal md:pl-0">商品</th>
              <th scope="col" className="px-3 py-2 font-normal">価格</th>
              <th scope="col" className="px-3 py-2 font-normal">高さ</th>
              <th scope="col" className="py-2 pl-3 pr-6 font-normal md:pr-0">向いている植物</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((p) => (
              <tr key={p.slug} className="border-b border-gray-100 align-top">
                <th scope="row" className="py-3 pl-6 pr-3 font-normal md:pl-0">
                  <Link
                    href={`/products/${p.slug}`}
                    className="text-[#222] underline underline-offset-4 decoration-gray-300 hover:decoration-[#222]"
                  >
                    {p.name}
                  </Link>
                </th>
                <td className="whitespace-nowrap px-3 py-3 tabular-nums">{yen(p.price)}</td>
                <td className="whitespace-nowrap px-3 py-3 text-gray-700">{p.height}</td>
                <td className="py-3 pl-3 pr-6 text-gray-700 md:pr-0">{p.plants.slice(0, 2).join("・")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
