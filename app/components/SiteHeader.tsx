"use client";

// 下層ページ共通ヘッダー（2026-08-22 SEO強化 R1 で新設）。
// トップ(BaseClone)のBASE準拠デザインは変更せず、下層だけ内部ナビを持つ。
import Link from "next/link";
import { useState } from "react";

const SHOP = "https://zukeplants.base.shop";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="h-16 md:h-20 px-4 md:px-8 flex items-center justify-between relative">
        <button aria-label="メニュー" aria-expanded={open} onClick={() => setOpen(!open)} className="p-2 -ml-2 md:hidden">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
        </button>
        <Link href="/" className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 text-xl md:text-2xl font-bold tracking-[0.25em] text-[#222]">
          ZUKE
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-[13px] tracking-[0.15em] text-[#222]">
          <Link href="/products" className="hover:opacity-60">PRODUCTS</Link>
          <Link href="/guide" className="hover:opacity-60">GUIDE</Link>
          <Link href="/about" className="hover:opacity-60">ABOUT</Link>
          <a href={SHOP} target="_blank" rel="noopener noreferrer" className="hover:opacity-60">STORE</a>
        </nav>
        <a href={SHOP} aria-label="オンラインストア" className="p-1 md:hidden">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
        </a>
      </div>
      {open && (
        <nav className="md:hidden border-t border-gray-100 bg-white px-6 py-6">
          <ul className="flex flex-col gap-4 text-sm tracking-[0.15em]">
            <li><Link href="/" onClick={() => setOpen(false)}>HOME</Link></li>
            <li><Link href="/products" onClick={() => setOpen(false)}>PRODUCTS</Link></li>
            <li><Link href="/guide" onClick={() => setOpen(false)}>GUIDE</Link></li>
            <li><Link href="/about" onClick={() => setOpen(false)}>ABOUT</Link></li>
            <li><a href={SHOP} target="_blank" rel="noopener noreferrer">STORE（BASE）</a></li>
          </ul>
        </nav>
      )}
    </header>
  );
}
