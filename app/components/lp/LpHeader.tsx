"use client";

import icon from "@/app/icon.png";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { lpShopUrl } from "./utm";

const NAV = [
  { href: "/products", label: "PRODUCTS" },
  { href: "/guide", label: "GUIDE" },
  { href: "/about", label: "ABOUT" },
  { href: "/wholesale", label: "WHOLESALE" },
] as const;

export function LpHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-[#E5DDCF] bg-[#F6F1E7]/95 backdrop-blur-sm">
      <div className="mx-auto flex min-h-16 w-full max-w-[1120px] items-center justify-between gap-3 px-5 min-[601px]:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-2.5" aria-label="ZUKE ホーム">
          <Image src={icon} alt="" width={44} height={44} className="h-11 w-11" priority />
        </Link>
        <nav aria-label="主なページ" className="hidden items-center gap-x-4 text-[12px] font-bold tracking-[0.14em] min-[601px]:flex min-[1100px]:gap-x-8 min-[1100px]:text-[13px]">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="hover:opacity-60">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a
            href={lpShopUrl("fv")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-10 items-center rounded-full bg-[#F06A1E] px-4 text-[13px] font-bold text-white hover:opacity-90 min-[1100px]:px-5"
          >
            ショップへ
          </a>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#E5DDCF] min-[601px]:hidden"
            aria-expanded={open}
            aria-controls="lp-menu"
            aria-label={open ? "メニューを閉じる" : "メニューを開く"}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{open ? "閉じる" : "メニュー"}</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden>
              {open ? (
                <>
                  <line x1="6" y1="6" x2="18" y2="18" />
                  <line x1="18" y1="6" x2="6" y2="18" />
                </>
              ) : (
                <>
                  <line x1="4" y1="7" x2="20" y2="7" />
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <line x1="4" y1="17" x2="20" y2="17" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>
      {open && (
        <nav id="lp-menu" aria-label="モバイルメニュー" className="border-t border-[#E5DDCF] px-5 py-4 min-[601px]:hidden">
          <ul className="flex flex-col gap-1 text-[14px] font-bold tracking-[0.14em]">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="block py-2.5" onClick={() => setOpen(false)}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
