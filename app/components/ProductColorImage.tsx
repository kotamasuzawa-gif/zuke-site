"use client";
import { useState } from "react";
import Image from "next/image";
import { COLORS, type ColorKey, productImage, colorLabel } from "@/app/lib/colors";

// 2026-09-29 増澤さん指示: 商品詳細ページでも色を選ぶと写真がその色に切り替わるように
export default function ProductColorImage({ slug, name, colors, initial }: { slug: string; name: string; colors: ColorKey[]; initial: ColorKey }) {
  const [color, setColor] = useState<ColorKey>(initial);
  return (
    <div>
      <div className="relative aspect-square bg-[#fbfbfb]">
        <Image src={productImage(slug, color)} alt={`${name}（${colorLabel(color)}）`} fill priority className="object-contain" sizes="(max-width: 768px) 100vw, 50vw" />
      </div>
      {colors.length > 1 && (
        <div className="mt-5 flex flex-col items-center gap-3">
          <div role="radiogroup" aria-label="カラーを選ぶ" className="flex items-center gap-3">
            {COLORS.filter((c) => colors.includes(c.key)).map((c) => (
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
      )}
    </div>
  );
}
