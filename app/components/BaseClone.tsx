"use client";

// 2026-08-21 増澤さん指示: BASEショップ(zukeplants.base.shop)のホームと同じ見た目に。
// 構成: ヘッダー(ハンバーガー/ZUKE/検索/カート) + 六角ロゴ + 商品グリッド + SNS + © ZUKE
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const SHOP = "https://zukeplants.base.shop";

// 2026-08-22 増澤さん要望: ホームでブラック/ホワイトを切り替え。商品画像とライフスタイル写真が連動する。
// BASE 本店も各商品ページ内でブラック/ホワイトの2種展開のため、リンク先URLは色に関わらず同じ。
type ColorKey = "black" | "white";

const products = [
  { name: 'PLANTS POLE ”うねうね” -横に広がる植物を矯正できる支柱-', price: "¥1,320", slug: "uneune", url: `${SHOP}/items/130117282` },
  { name: 'PLANTS POLE "5つの六角形" - 蔓性植物をインテリアに馴染むように飾る支柱 -', price: "¥1,320", slug: "hex5", url: `${SHOP}/items/117375069` },
  { name: 'PLANTS POLE "3つの六角形" - 蔓性植物をインテリアに馴染むように飾る支柱 -', price: "¥880", slug: "hex3", url: `${SHOP}/items/128906974` },
  { name: 'PLANTS POLE "2つの六角形" - 蔓性植物をインテリアに馴染むように飾る支柱 -', price: "¥770", slug: "hex2", url: `${SHOP}/items/124680568` },
];

const productImage = (slug: string, color: ColorKey) => `/products/product-${slug}-${color}.webp`;

const COLORS: { key: ColorKey; label: string; swatch: string }[] = [
  { key: "black", label: "ブラック", swatch: "#222" },
  { key: "white", label: "ホワイト", swatch: "#EDEAE3" },
];

export default function BaseClone({ showLifestyle = false }: { showLifestyle?: boolean }) {
  const [open, setOpen] = useState(false);
  const [color, setColor] = useState<ColorKey>("black");

  return (
    <div className="min-h-screen bg-white text-[#222] flex flex-col">
      {/* ヘッダー */}
      <header className="sticky top-0 z-50 bg-white">
        <div className="h-16 md:h-20 px-4 md:px-8 flex items-center justify-between">
          <button aria-label="メニュー" aria-expanded={open} onClick={() => setOpen(!open)} className="p-2 -ml-2">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          </button>
          <Link href="/" className="absolute left-1/2 -translate-x-1/2 text-xl md:text-2xl font-bold tracking-[0.25em] text-[#222]">ZUKE</Link>
          <div className="flex items-center gap-4">
            <a href={SHOP} aria-label="検索" className="p-1">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.5" y2="16.5"/></svg>
            </a>
            <a href={SHOP} aria-label="カート" className="p-1">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
            </a>
          </div>
        </div>
        {/* SEO: 旧実装は {open && ...} で閉じている間 DOM から消えており、
            クローラーに内部リンクが1本も見えていなかった。CSSで開閉する方式に変更（見た目は同じ）。 */}
        <nav className={`border-t border-gray-100 bg-white px-6 py-6 ${open ? "" : "hidden"}`}>
            <ul className="flex flex-col gap-4 text-sm tracking-[0.15em]">
              <li><Link href="/" onClick={() => setOpen(false)}>HOME</Link></li>
              <li><Link href="/products" onClick={() => setOpen(false)}>PRODUCTS</Link></li>
              <li><Link href="/guide" onClick={() => setOpen(false)}>GUIDE</Link></li>
              <li><Link href="/about" onClick={() => setOpen(false)}>ABOUT</Link></li>
              <li><a href="https://thebase.com/inquiry/zukeplants-base-shop" target="_blank" rel="noopener noreferrer">CONTACT</a></li>
            </ul>
            <ul className="mt-6 pt-4 border-t border-gray-100 flex flex-col gap-2 text-xs text-gray-500">
              <li><a href={`${SHOP}/privacy`} target="_blank" rel="noopener noreferrer">・プライバシーポリシー</a></li>
              <li><a href={`${SHOP}/law`} target="_blank" rel="noopener noreferrer">・特定商取引法に基づく表記</a></li>
            </ul>
        </nav>
      </header>

      <main className="flex-1">
        {/* 六角ロゴ。SEO: ページに h1 が1つも無かったため、見た目を変えずにロゴを h1 にした */}
        <h1 className="flex flex-col items-center pt-16 md:pt-20 pb-14 md:pb-16">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-hex.png" alt="ZUKE PLANTS POLE" className="w-[150px] md:w-[180px] h-auto" />
          <span className="sr-only">
            ZUKE｜インテリアに馴染む園芸支柱 PLANTS POLE — 観葉植物・インテリアグリーンを魅せる支柱
          </span>
        </h1>

        {/* カラースイッチ（2026-08-22 増澤さん要望） */}
        <div className="flex flex-col items-center gap-3 pb-12">
          <div role="radiogroup" aria-label="カラーを選ぶ" className="flex items-center gap-3">
            {COLORS.map((c) => (
              <button
                key={c.key}
                type="button"
                role="radio"
                aria-checked={color === c.key}
                aria-label={c.label}
                onClick={() => setColor(c.key)}
                className={`w-7 h-7 rounded-full border transition-all ${
                  color === c.key
                    ? "border-[#222] ring-1 ring-[#222] ring-offset-2"
                    : "border-gray-300 hover:border-gray-400"
                }`}
                style={{ backgroundColor: c.swatch }}
              />
            ))}
          </div>
          <p className="text-[11px] tracking-[0.15em] text-gray-500">
            {COLORS.find((c) => c.key === color)?.label}
          </p>
        </div>

        {/* 商品グリッド */}
        <section aria-label="商品一覧" className="px-4 md:px-8 max-w-5xl mx-auto pb-20">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
            {products.map((p) => (
              <a key={p.url} href={p.url} target="_blank" rel="noopener noreferrer" className="block group">
                <div className="relative aspect-square bg-[#fbfbfb] overflow-hidden">
                  <Image
                    src={productImage(p.slug, color)}
                    alt={`${p.name}（${COLORS.find((c) => c.key === color)?.label}）`}
                    fill
                    className="object-contain group-hover:opacity-90 transition-opacity"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <p className="mt-4 text-[15px] leading-relaxed text-[#222] line-clamp-2">{p.name}</p>
                <p className="mt-2 text-[15px] font-bold">{p.price}</p>
              </a>
            ))}
          </div>
        </section>
      </main>

      {/* SEO: 本文テキストと内部リンクがゼロだったため、BASE準拠の見た目を保ったまま
          最小限のブランド文とサイト内リンクを追加（2026-08-22） */}
      <section className="px-6 pb-16 max-w-5xl mx-auto text-center">
        <h2 className="text-[15px] font-bold tracking-[0.1em]">&ldquo;魅せる&rdquo;園芸支柱 PLANTS POLE</h2>

        {/* 2026-08-22 増澤さん指定のライフスタイル写真。カラースイッチと連動。
            横型写真なので横コンテナで扱う（縦型を横コンテナに入れない: mistakes 2026-05-21）。
            showLifestyle は page.tsx が public/ の実ファイル有無を見て渡す＝画像未配置なら表示しない */}
        {showLifestyle && (
          <div className="mt-8 relative w-full max-w-lg mx-auto aspect-square overflow-hidden bg-[#f5f4f2]">
            <Image
              src={`/lifestyle-hex-${color}.jpg`}
              alt={`コンクリート壁の棚に飾った PLANTS POLE（${COLORS.find((c) => c.key === color)?.label}）と蔓性の観葉植物。六角形の影が壁に映るインテリアグリーンの実例`}
              fill
              priority
              sizes="(max-width: 640px) 100vw, 512px"
              className="object-cover"
            />
          </div>
        )}

        <p className="mt-7 max-w-2xl mx-auto text-[13px] leading-loose text-gray-600">
          ZUKE は「インテリアに馴染む」「生活に馴染む」をコンセプトにした園芸支柱ブランドです。
          モンステラやポトスなど蔓性の観葉植物を、垂らしたままにせず立ち上げて仕立てる。
          アイアンスチールの六角形が、家具や部屋の景観に溶け込みながら植物を支えます。
          高さ約19.5cm の小鉢向けから、約39cm の主役サイズまで4型。
        </p>
        <nav aria-label="サイト内リンク" className="mt-7 flex flex-wrap justify-center gap-x-7 gap-y-3 text-[13px] tracking-[0.1em]">
          <Link href="/products" className="hover:opacity-60">商品一覧</Link>
          <Link href="/guide" className="hover:opacity-60">インテリアグリーンのガイド</Link>
          <Link href="/about" className="hover:opacity-60">ブランドについて</Link>
        </nav>
      </section>

      {/* フッター */}
      <footer className="pb-12 pt-8 flex flex-col items-center gap-10">
        <div className="flex items-center gap-8">
          <a href="https://www.instagram.com/zuke.plantspole/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4.5"/><circle cx="17.8" cy="6.2" r="1" fill="currentColor" stroke="none"/></svg>
          </a>
          <a href="https://note.com/zuke_plantspole" target="_blank" rel="noopener noreferrer" aria-label="note" className="text-xl font-bold lowercase tracking-tight">n</a>
        </div>
        <p className="text-sm text-[#222]">© ZUKE</p>
      </footer>
    </div>
  );
}
