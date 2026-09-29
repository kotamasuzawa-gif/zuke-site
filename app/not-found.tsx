import Link from "next/link";
import SiteHeader from "@/app/components/SiteHeader";
import SiteFooter from "@/app/components/SiteFooter";

// 2026-09-29 SEO R4: 既定の英語 404 画面（内部リンクなし）を置き換え。noindex は 404 に Next が自動で付ける。
export default function NotFound() {
  return (
    <div className="min-h-screen bg-white text-[#222] flex flex-col">
      <SiteHeader />
      <main className="flex-1 max-w-2xl mx-auto px-6 w-full pt-14 md:pt-20">
        <p className="text-[11px] tracking-[0.2em] text-gray-500">404 NOT FOUND</p>
        <h1 className="mt-3 text-2xl md:text-3xl font-bold leading-relaxed">ページが見つかりません</h1>
        <p className="mt-6 text-[15px] leading-loose text-gray-700">
          お探しのページは移動または削除された可能性があります。下記のページからお探しください。
        </p>
        <ul className="mt-8 flex flex-col gap-3 text-[15px] text-gray-700">
          <li><Link href="/" className="underline underline-offset-4 decoration-gray-300 hover:text-[#222]">ホーム</Link></li>
          <li><Link href="/products" className="underline underline-offset-4 decoration-gray-300 hover:text-[#222]">商品一覧</Link></li>
          <li><Link href="/guide" className="underline underline-offset-4 decoration-gray-300 hover:text-[#222]">インテリアグリーンのガイド</Link></li>
        </ul>
      </main>
      <SiteFooter />
    </div>
  );
}
