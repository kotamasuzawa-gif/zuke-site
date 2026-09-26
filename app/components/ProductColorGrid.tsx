"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { COLORS, type ColorKey, productImage, colorLabel } from "@/app/lib/colors";

export type GridItem = { slug: string; name: string; fullName: string; price: string; sub?: string; href: string; external?: boolean };
export type GridGroup = { key: string; title?: string; moreHref?: string; items: GridItem[] };

// 2026-09-26 増澤さん指示: 各ページ（商品一覧・カテゴリ）でも色切替できるように。切替は商品一覧の直上に1つだけ置き、
// 見出し付きのグループ（全商品一覧のカテゴリ分け）にも対応
export default function ProductColorGrid({ items, groups }: { items?: GridItem[]; groups?: GridGroup[] }) {
  const [color, setColor] = useState<ColorKey>("black");
  const gs: GridGroup[] = groups ?? [{ key: "all", items: items ?? [] }];
  const card = (p: GridItem) => {
    const inner = (
      <>
        <div className="relative aspect-square bg-[#fbfbfb] overflow-hidden">
          <Image src={productImage(p.slug, color)} alt={`${p.fullName}（${colorLabel(color)}）`} fill className="object-contain group-hover:opacity-90 transition-opacity" sizes="(max-width: 1024px) 50vw, 25vw" />
        </div>
        <h3 className="mt-4 text-[15px] leading-relaxed line-clamp-2">{p.name}</h3>
        {p.sub && <p className="mt-1 text-[13px] text-gray-500">{p.sub}</p>}
        <p className="mt-1 text-[15px] font-bold">{p.price}</p>
      </>
    );
    return p.external ? (
      <a key={p.slug} href={p.href} target="_blank" rel="noopener noreferrer" className="block group">{inner}</a>
    ) : (
      <Link key={p.slug} href={p.href} className="block group">{inner}</Link>
    );
  };
  return (
    <div>
      <div className="flex flex-col items-center gap-3 pb-10">
        <div role="radiogroup" aria-label="カラーを選ぶ" className="flex items-center gap-3">
          {COLORS.map((c) => (
            <button
              key={c.key}
              type="button"
              role="radio"
              aria-checked={color === c.key}
              aria-label={c.label}
              onClick={() => setColor(c.key)}
              className={`w-7 h-7 rounded-full border transition-all ${color === c.key ? "border-[#222] ring-1 ring-[#222] ring-offset-2" : "border-gray-300 hover:border-gray-400"}`}
              style={{ backgroundColor: c.swatch }}
            />
          ))}
        </div>
        <p className="text-[11px] tracking-[0.15em] text-gray-500">{colorLabel(color)}</p>
      </div>
      <div className="flex flex-col gap-16">
        {gs.map((g) => (
          <section key={g.key} aria-labelledby={g.title ? `grp-${g.key}` : undefined}>
            {g.title && (
              <div className="flex items-baseline justify-between border-b border-[#e5e5e0] pb-3 mb-8">
                <h2 id={`grp-${g.key}`} className="text-lg md:text-xl font-bold tracking-[0.1em]">{g.title}</h2>
                {g.moreHref && <Link href={g.moreHref} className="text-[12px] tracking-[0.15em] text-gray-500 hover:text-[#222]">すべて見る →</Link>}
              </div>
            )}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">{g.items.map(card)}</div>
          </section>
        ))}
      </div>
    </div>
  );
}
