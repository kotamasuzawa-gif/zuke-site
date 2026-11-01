import Image from "next/image";
import { lineupCards } from "./lineup";

export function LpLineup() {
  const cards = lineupCards();

  return (
    <section aria-labelledby="lineup-heading" className="mx-auto w-full max-w-[1120px] px-5 py-12 min-[601px]:px-8 min-[601px]:py-16">
      <p className="text-[12px] font-bold tracking-[0.22em] text-[#6B6259]">LINEUP</p>
      <h2 id="lineup-heading" className="mt-3 text-[26px] font-black leading-snug min-[601px]:text-[32px]">
        入り口は、この4つ。
      </h2>
      <ul className="mt-8 grid gap-4 min-[601px]:grid-cols-2 min-[1100px]:grid-cols-4">
        {cards.map((card) => (
          <li key={card.slug}>
            <a
              href={card.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-full flex-col rounded-[20px] border border-[#E5DDCF] bg-[#FFFDF8] p-3 transition-colors hover:border-[#F06A1E]"
            >
              <div className="relative aspect-square overflow-hidden rounded-[12px] bg-white">
                <Image
                  src={card.image}
                  alt={card.displayName}
                  fill
                  sizes="(max-width: 600px) 92vw, (max-width: 1100px) 45vw, 260px"
                  className="object-contain"
                />
                <span className="absolute left-2 top-2 rounded-full bg-[#5E7F3B] px-2.5 py-1 text-[11px] font-bold text-white">
                  {card.badge}
                </span>
              </div>
              <h3 className="mt-4 px-1 text-[14px] font-bold leading-relaxed">{card.displayName}</h3>
              <p className="mt-auto px-1 pt-3 text-[16px] font-black">{card.priceLabel}</p>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
