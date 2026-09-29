// 下層ページ共通フッター（内部リンク＝クロール経路を兼ねる）。
import Link from "next/link";
import { GUIDES } from "@/app/lib/guides";
import { PRODUCTS, COLLECTIONS } from "@/app/lib/products";
import { WHOLESALE_MAILTO } from "@/app/lib/contact";

const SHOP = "https://zukeplants.base.shop";

// 2026-09-29 SEO R4: 列見出しは h2 → p（全ページの見出し構造に h2 が3つ混ざっていたため。見た目は同じ）。
// 一覧ページ・カテゴリページ・卸売のご案内への内部リンクを追加。
export default function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-gray-100 bg-white">
      <div className="max-w-5xl mx-auto px-6 py-14 grid gap-10 md:grid-cols-3">
        <div>
          <p className="text-[13px] font-bold tracking-[0.15em] text-[#222] mb-4">PRODUCTS</p>
          <ul className="flex flex-col gap-2 text-[13px] text-gray-600">
            <li><Link href="/products" className="hover:text-[#222]">商品一覧</Link></li>
            {COLLECTIONS.map((c) => (
              <li key={c.key}>
                <Link href={`/collections/${c.key}`} className="hover:text-[#222]">{c.label}</Link>
              </li>
            ))}
          </ul>
          <ul className="mt-4 pt-4 border-t border-gray-100 flex flex-col gap-2 text-[13px] text-gray-600">
            {PRODUCTS.map((p) => (
              <li key={p.slug}>
                <Link href={`/products/${p.slug}`} className="hover:text-[#222]">{p.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-[13px] font-bold tracking-[0.15em] text-[#222] mb-4">GUIDE</p>
          <ul className="flex flex-col gap-2 text-[13px] text-gray-600">
            <li><Link href="/guide" className="hover:text-[#222]">ガイド一覧</Link></li>
            {GUIDES.map((g) => (
              <li key={g.slug}>
                <Link href={`/guide/${g.slug}`} className="hover:text-[#222]">{g.metaTitle}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-[13px] font-bold tracking-[0.15em] text-[#222] mb-4">ZUKE</p>
          <ul className="flex flex-col gap-2 text-[13px] text-gray-600">
            <li><Link href="/about" className="hover:text-[#222]">ブランドについて</Link></li>
            <li><a href={SHOP} target="_blank" rel="noopener noreferrer" className="hover:text-[#222]">オンラインストア（BASE）</a></li>
            <li><Link href="/wholesale" className="hover:text-[#222]">卸売のご案内</Link></li>
            <li><a href={WHOLESALE_MAILTO} className="hover:text-[#222]">卸売のお問い合わせ（メール）</a></li>
            <li><a href="https://www.instagram.com/zuke.plantspole/" target="_blank" rel="noopener noreferrer" className="hover:text-[#222]">Instagram</a></li>
            <li><a href="https://note.com/zuke_plantspole" target="_blank" rel="noopener noreferrer" className="hover:text-[#222]">note</a></li>
            <li><a href={`${SHOP}/privacy`} target="_blank" rel="noopener noreferrer" className="hover:text-[#222]">プライバシーポリシー</a></li>
            <li><a href={`${SHOP}/law`} target="_blank" rel="noopener noreferrer" className="hover:text-[#222]">特定商取引法に基づく表記</a></li>
          </ul>
        </div>
      </div>
      <p className="pb-12 text-center text-sm text-[#222]">© ZUKE</p>
    </footer>
  );
}
