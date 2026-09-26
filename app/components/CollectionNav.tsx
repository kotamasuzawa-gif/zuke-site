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
            <Link key={m.key} href={`/collections/${m.key}`} className="group relative block aspect-[16/10] overflow-hidden rounded-sm">
              {/* 2026-09-26 増澤さん指示: 素材感のある背景（Codex生成テクスチャ）に白文字。1行で収める */}
              <Image src={`/find/bg-${m.key}.jpg`} alt="" fill className="object-cover group-hover:scale-[1.04] transition-transform duration-500" sizes="50vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/10" />
              <div className="absolute inset-x-0 bottom-0 p-3 md:p-5 text-white">
                <p className="text-[10px] md:text-[11px] tracking-[0.2em] opacity-80">{m.key === "iron" ? "IRON" : "PLA / 3D PRINT"}</p>
                <p className="mt-1 text-[14px] md:text-lg font-bold whitespace-nowrap">{m.label}で探す</p>
                <p className="mt-2 text-[13px] leading-relaxed opacity-90 hidden md:block">{m.lead}</p>
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
