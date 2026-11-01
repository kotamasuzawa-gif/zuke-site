import { NoteArticles } from "@/app/components/NoteArticles";
import ShokuyokuAppBanner from "@/app/components/ShokuyokuAppBanner";
import { WHOLESALE_MAILTO } from "@/app/lib/contact";
import { GUIDES } from "@/app/lib/guides";
import { PRODUCTS } from "@/app/lib/products";
import Link from "next/link";

export function LpLibrary() {
  return (
    <section aria-label="読みものとサイト内リンク" className="border-t border-[#E5DDCF] bg-[#FFFDF8]">
      <div className="mx-auto w-full max-w-[1120px] px-5 pt-14 min-[601px]:px-8">
        <p className="text-[12px] font-bold tracking-[0.22em] text-[#6B6259]">LIBRARY</p>
        <h2 className="mt-3 text-[22px] font-black">読みものと案内</h2>
        <p className="mt-3 max-w-[40em] text-[14px] leading-relaxed text-[#6B6259]">
          以前トップに置いていた note の記事、ガイド、商品ページ、植欲マップへの入口です。
        </p>
      </div>
      <NoteArticles />
      <div className="mx-auto grid w-full max-w-[1120px] gap-10 px-5 pb-10 min-[601px]:grid-cols-2 min-[601px]:px-8">
        <nav aria-label="ガイド記事">
          <p className="text-[12px] font-bold tracking-[0.18em] text-[#6B6259]">GUIDE</p>
          <ul className="mt-4 flex flex-col gap-2 text-[13px] leading-relaxed">
            <li>
              <Link href="/guide" className="underline decoration-[#E5DDCF] underline-offset-4 hover:decoration-[#1A1A1A]">
                ガイド一覧
              </Link>
            </li>
            {GUIDES.map((guide) => (
              <li key={guide.slug}>
                <Link href={`/guide/${guide.slug}`} className="underline decoration-[#E5DDCF] underline-offset-4 hover:decoration-[#1A1A1A]">
                  {guide.metaTitle}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="商品ページ">
          <p className="text-[12px] font-bold tracking-[0.18em] text-[#6B6259]">PRODUCTS</p>
          <ul className="mt-4 flex flex-col gap-2 text-[13px] leading-relaxed">
            <li>
              <Link href="/products" className="underline decoration-[#E5DDCF] underline-offset-4 hover:decoration-[#1A1A1A]">
                商品一覧
              </Link>
            </li>
            {PRODUCTS.map((product) => (
              <li key={product.slug}>
                <Link href={`/products/${product.slug}`} className="underline decoration-[#E5DDCF] underline-offset-4 hover:decoration-[#1A1A1A]">
                  {product.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <p className="mx-auto w-full max-w-[1120px] px-5 pb-8 text-[13px] leading-relaxed text-[#6B6259] min-[601px]:px-8">
        販売店さまは
        <Link href="/wholesale" className="mx-1 underline underline-offset-4">
          卸売のご案内
        </Link>
        を見るか、
        <a href={WHOLESALE_MAILTO} className="mx-1 underline underline-offset-4">
          メールで問い合わせ
        </a>
        てください。
      </p>
      <ShokuyokuAppBanner />
    </section>
  );
}
