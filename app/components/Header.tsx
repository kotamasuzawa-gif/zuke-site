"use client";

// 2026-08-21 増澤さん要望: Ducks(plants.)風リデザイン。
// 左ハンバーガー（全デバイス共通のオーバーレイメニュー）＋中央ワードマーク＋右カート(BASE)
import { useState } from "react";

const STORE_URL = "https://zukeplants.base.shop/";

const links = [
  { label: "PRODUCTS", jp: "商品", href: "#products" },
  { label: "ABOUT", jp: "ブランドについて", href: "#about" },
  { label: "HOW TO", jp: "使い方", href: "#howto" },
  { label: "NEWS", jp: "お知らせ", href: "#news" },
  { label: "CONTACT", jp: "お問い合わせ", href: "#contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0b0b0b]/90 backdrop-blur-sm">
      <div className="h-16 px-4 md:px-6 flex items-center justify-between">
        {/* ハンバーガー */}
        <button
          className="w-12 h-12 flex flex-col items-center justify-center gap-1.5 bg-[#151514] border border-[#2a2a28]"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="メニュー"
          aria-expanded={menuOpen}
        >
          <span className={`block w-5 h-px bg-white transition-transform duration-200 ${menuOpen ? "translate-y-[3.5px] rotate-45" : ""}`} />
          <span className={`block w-5 h-px bg-white transition-transform duration-200 ${menuOpen ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
        </button>

        {/* 中央ワードマーク */}
        <a
          href="#"
          className="absolute left-1/2 -translate-x-1/2 font-[family-name:var(--font-geist-mono)] text-[11px] tracking-[0.45em] text-neutral-300"
        >
          ZUKE&nbsp;PLANTS&nbsp;POLE
        </a>

        {/* カート → オンラインストア */}
        <a
          href={STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="オンラインストア"
          className="w-12 h-12 flex items-center justify-center bg-[#151514] border border-[#2a2a28] text-neutral-200 hover:text-white hover:border-neutral-500 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="8" cy="21" r="1" />
            <circle cx="19" cy="21" r="1" />
            <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
          </svg>
        </a>
      </div>

      {/* オーバーレイメニュー */}
      {menuOpen && (
        <nav className="border-t border-[#2a2a28] bg-[#0b0b0b] px-6 py-8">
          <ul className="flex flex-col gap-5 max-w-6xl mx-auto">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="group flex items-baseline gap-4"
                >
                  <span className="font-[family-name:var(--font-geist-mono)] text-lg tracking-[0.25em] text-neutral-100 group-hover:text-white">
                    {l.label}
                  </span>
                  <span className="text-[11px] text-neutral-500 group-hover:text-neutral-400">{l.jp}</span>
                </a>
              </li>
            ))}
            <li className="pt-4 border-t border-[#2a2a28]">
              <a
                href={STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                className="font-[family-name:var(--font-geist-mono)] text-[11px] tracking-[0.35em] text-neutral-400 hover:text-white"
              >
                ONLINE STORE →
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
