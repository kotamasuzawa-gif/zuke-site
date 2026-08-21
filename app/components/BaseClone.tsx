"use client";

// 2026-08-21 増澤さん指示: BASEショップ(zukeplants.base.shop)のホームと同じ見た目に。
// 構成: ヘッダー(ハンバーガー/ZUKE/検索/カート) + 六角ロゴ + 商品グリッド + SNS + © ZUKE
import Image from "next/image";
import { useState } from "react";

const SHOP = "https://zukeplants.base.shop";

const products = [
  { name: 'PLANTS POLE ”うねうね” -横に広がる植物を矯正できる支柱-', price: "¥1,320", img: "/products/product-uneune-black.webp", url: `${SHOP}/items/130117282` },
  { name: 'PLANTS POLE "5つの六角形" - 蔓性植物をインテリアに馴染むように飾る支柱 -', price: "¥1,320", img: "/products/product-hex5-black.webp", url: `${SHOP}/items/117375069` },
  { name: 'PLANTS POLE "3つの六角形" - 蔓性植物をインテリアに馴染むように飾る支柱 -', price: "¥880", img: "/products/product-hex3-black.webp", url: `${SHOP}/items/128906974` },
  { name: 'PLANTS POLE "2つの六角形" - 蔓性植物をインテリアに馴染むように飾る支柱 -', price: "¥770", img: "/products/product-hex2-black.webp", url: `${SHOP}/items/124680568` },
];

export default function BaseClone() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-[#222] flex flex-col">
      {/* ヘッダー */}
      <header className="sticky top-0 z-50 bg-white">
        <div className="h-16 md:h-20 px-4 md:px-8 flex items-center justify-between">
          <button aria-label="メニュー" aria-expanded={open} onClick={() => setOpen(!open)} className="p-2 -ml-2">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          </button>
          <a href="/" className="absolute left-1/2 -translate-x-1/2 text-xl md:text-2xl font-bold tracking-[0.25em] text-[#222]">ZUKE</a>
          <div className="flex items-center gap-4">
            <a href={SHOP} aria-label="検索" className="p-1">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.5" y2="16.5"/></svg>
            </a>
            <a href={SHOP} aria-label="カート" className="p-1">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
            </a>
          </div>
        </div>
        {open && (
          <nav className="border-t border-gray-100 bg-white px-6 py-6">
            <ul className="flex flex-col gap-4 text-sm tracking-[0.15em]">
              <li><a href="/" onClick={() => setOpen(false)}>HOME</a></li>
              <li><a href={`${SHOP}/about`} target="_blank" rel="noopener noreferrer">ABOUT</a></li>
              <li><a href="https://thebase.com/inquiry/zukeplants-base-shop" target="_blank" rel="noopener noreferrer">CONTACT</a></li>
            </ul>
            <ul className="mt-6 pt-4 border-t border-gray-100 flex flex-col gap-2 text-xs text-gray-500">
              <li><a href={`${SHOP}/privacy`} target="_blank" rel="noopener noreferrer">・プライバシーポリシー</a></li>
              <li><a href={`${SHOP}/law`} target="_blank" rel="noopener noreferrer">・特定商取引法に基づく表記</a></li>
            </ul>
          </nav>
        )}
      </header>

      <main className="flex-1">
        {/* 六角ロゴ */}
        <div className="flex justify-center pt-16 md:pt-20 pb-14 md:pb-16">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-hex.png" alt="ZUKE Plants Pole" className="w-[150px] md:w-[180px] h-auto" />
        </div>

        {/* 商品グリッド */}
        <section aria-label="商品一覧" className="px-4 md:px-8 max-w-5xl mx-auto pb-20">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
            {products.map((p) => (
              <a key={p.url} href={p.url} target="_blank" rel="noopener noreferrer" className="block group">
                <div className="relative aspect-square bg-[#fbfbfb] overflow-hidden">
                  <Image src={p.img} alt={p.name} fill className="object-contain group-hover:opacity-90 transition-opacity" sizes="(max-width: 1024px) 50vw, 25vw" />
                </div>
                <p className="mt-4 text-[15px] leading-relaxed text-[#222] line-clamp-2">{p.name}</p>
                <p className="mt-2 text-[15px] font-bold">{p.price}</p>
              </a>
            ))}
          </div>
        </section>
      </main>

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
