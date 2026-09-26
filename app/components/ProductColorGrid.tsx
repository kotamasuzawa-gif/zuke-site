"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { COLORS, type ColorKey, productImage, colorLabel } from "@/app/lib/colors";

export type GridItem = { slug: string; name: string; fullName: string; price: string; sub?: string; href: string; external?: boolean };

// 2026-09-26 増澤さん指示: 各ページ（商品一覧・カテゴリ）でも色切替できるように。切替は商品一覧の直上に置く
export default function ProductColorGrid({ items }: { items: GridItem[] }) {
  const [color, setColor] = useState<ColorKey>("black");
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
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
        {items.map((p) => {
          const inner = (
            <>
              <div className="relative aspect-square bg-[#fbfbfb] overflow-hidden">
                <Image src={productImage(p.slug, color)} alt={`${p.fullName}（${colorLabel(color)}）`} fill className="object-contain group-hover:opacity-90 transition-opacity" sizes="(max-width: 1024px) 50vw, 25vw" />
              </div>
              <h2 className="mt-4 text-[15px] leading-relaxed line-clamp-2">{p.name}</h2>
              {p.sub && <p className="mt-1 text-[13px] text-gray-500">{p.sub}</p>}
              <p className="mt-1 text-[15px] font-bold">{p.price}</p>
            </>
          );
          return p.external ? (
            <a key={p.slug} href={p.href} target="_blank" rel="noopener noreferrer" className="block group">{inner}</a>
          ) : (
            <Link key={p.slug} href={p.href} className="block group">{inner}</Link>
          );
        })}
      </div>
    </div>
  );
}
