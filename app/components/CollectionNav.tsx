import Link from "next/link";
import Image from "next/image";
import { MATERIALS, CATEGORIES } from "@/app/lib/products";

// 2026-09-26 増澤さん指示: まず「アイアンで探す／PLA樹脂で探す」、次に支柱・鉢・拡張・花瓶のカテゴリで探せる導線
export default function CollectionNav({ current, compact = false }: { current?: string; compact?: boolean }) {
  return (
    <div>
      {!compact && (
        <div className="grid grid-cols-2 gap-3 md:gap-6">
          {MATERIALS.map((m) => (
            <Link key={m.key} href={`/collections/${m.key}`} className="group block border border-[#e5e5e0] hover:border-[#222] transition-colors">
              <div className="relative aspect-[4/3] bg-[#fbfbfb] overflow-hidden">
                <Image src={m.image} alt={m.label} fill className="object-contain p-4 group-hover:scale-[1.03] transition-transform" sizes="50vw" />
              </div>
              <div className="p-4 md:p-5">
                <p className="text-[11px] tracking-[0.2em] text-gray-500">{m.key === "iron" ? "IRON" : "PLA / 3D PRINT"}</p>
                <p className="mt-1 text-base md:text-lg font-bold">{m.label}で探す</p>
                <p className="mt-2 text-[13px] leading-relaxed text-gray-600 hidden md:block">{m.lead}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
      <nav aria-label="カテゴリ" className={`${compact ? "" : "mt-6"} flex flex-wrap gap-2`}>
        {[...MATERIALS, ...CATEGORIES].map((c) => (
          <Link
            key={c.key}
            href={`/collections/${c.key}`}
            aria-current={current === c.key ? "page" : undefined}
            className={`px-4 py-2 text-[13px] tracking-[0.1em] border rounded-full transition-colors ${
              current === c.key ? "bg-[#222] text-white border-[#222]" : "border-gray-300 text-[#222] hover:border-[#222]"
            }`}
          >
            {c.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
