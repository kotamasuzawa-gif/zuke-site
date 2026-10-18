"use client";

// 2026-10-18 増澤さん「スクロールするごとに選択肢が枝分かれとして現れて、気づいたら購入したくなる」:
// ホームの FIND BY（カード8枚）を、質問に答えるたびに次の枝が現れる診断形式に置き換え。
// 商品・価格・リンクはすべて products.ts（BASE と同期）から引く。カテゴリへの内部リンクは下のチップで維持（SEO）。
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import CollectionNav from "@/app/components/CollectionNav";
import { productBySlug, yen, withUtm } from "@/app/lib/products";
import { baseImage } from "@/app/lib/colors";

type Result = { slugs: string[]; collection: string; collectionLabel: string; note?: string };
type Opt = { id: string; label: string; sub: string; next?: Step; result?: Result };
type Step = { en: string; q: string; options: Opt[] };

const IRON_SIZE: Step = {
  en: "SIZE",
  q: "鉢と植物の大きさは？",
  options: [
    { id: "s", label: "小鉢・まだ小さい株", sub: "高さ約19.5cm", result: { slugs: ["hex2", "hex3"], collection: "iron", collectionLabel: "アイアン支柱" } },
    { id: "m", label: "中くらいの鉢", sub: "高さ約22cm", result: { slugs: ["hex3", "hex-set-2pcs"], collection: "iron", collectionLabel: "アイアン支柱", note: "成長したら 5つの六角形 に差し替えられる2本セットもあります。" } },
    { id: "l", label: "大きく育てたい", sub: "高さ約39cm・主役サイズ", result: { slugs: ["hex5", "hex-set-2pcs"], collection: "iron", collectionLabel: "アイアン支柱" } },
    { id: "w", label: "横に広がる株", sub: "うねる形で株をまとめる", result: { slugs: ["uneune", "hex3"], collection: "iron", collectionLabel: "アイアン支柱" } },
  ],
};

const PLA_SIZE: Step = {
  en: "SIZE",
  q: "鉢と植物の大きさは？",
  options: [
    { id: "xs", label: "挿し木・小さな苗", sub: "全長約12cm。あとから伸ばせる", result: { slugs: ["pole1pla", "hexparts"], collection: "extension", collectionLabel: "支柱の拡張", note: "育ったら六角形を継ぎ足して、2連・3連へ伸ばせます。" } },
    { id: "s", label: "小鉢", sub: "高さ約17cm", result: { slugs: ["pole2pla", "hexpot-set2"], collection: "pla", collectionLabel: "PLA樹脂製品" } },
    { id: "m", label: "中くらいの鉢", sub: "高さ約22cm", result: { slugs: ["pole3pla", "hexpot-set", "hexparts"], collection: "pla", collectionLabel: "PLA樹脂製品" } },
  ],
};

const TREE: Step = {
  en: "PURPOSE",
  q: "植物を、どうしたいですか？",
  options: [
    {
      id: "pole", label: "つる性の植物を立ち上げたい", sub: "ポトス・モンステラ・ホヤなど",
      next: {
        en: "MATERIAL",
        q: "どちらの質感が好きですか？",
        options: [
          { id: "iron", label: "アイアン", sub: "細く強い。植物の陰になる存在感", next: IRON_SIZE },
          { id: "pla", label: "樹脂（3Dプリント）", sub: "軽くて4色。あとから伸ばせる", next: PLA_SIZE },
        ],
      },
    },
    { id: "climb", label: "気根を這わせて大きく育てたい", sub: "水苔を詰める登り棒（モス支柱）", result: { slugs: ["noboribo"], collection: "climb", collectionLabel: "登り棒" } },
    { id: "hang", label: "吊るして飾りたい", sub: "S字フックで窓辺や棚に", result: { slugs: ["hexhanging"], collection: "hanging", collectionLabel: "ハンギング" } },
    {
      id: "pot", label: "鉢ごとそろえたい", sub: "支柱の差込口付きの六角鉢",
      next: {
        en: "SET",
        q: "支柱もいっしょに？",
        options: [
          { id: "set", label: "鉢と支柱のセット", sub: "届いてすぐ仕立てられる", result: { slugs: ["hexpot-set", "hexpot-set2"], collection: "pot", collectionLabel: "鉢・セット" } },
          { id: "only", label: "鉢だけ", sub: "手持ちの支柱と合わせる", result: { slugs: ["hexpot", "marupot-stand"], collection: "pot", collectionLabel: "鉢・セット" } },
        ],
      },
    },
    { id: "ext", label: "今の支柱を伸ばしたい", sub: "樹脂版 PLANTS POLE 用", result: { slugs: ["hexparts", "hexclip5"], collection: "extension", collectionLabel: "支柱の拡張", note: "拡張パーツは樹脂版 PLANTS POLE 専用です（アイアン製には使えません）。" } },
    { id: "tool", label: "植え替えの道具がほしい", sub: "小鉢用のスコップ・スティック", result: { slugs: ["scoop", "soilstick"], collection: "tool", collectionLabel: "園芸道具" } },
  ],
};

export default function PlantFinder() {
  const [path, setPath] = useState<string[]>([]);
  const lastRef = useRef<HTMLLIElement>(null);
  const touched = useRef(false);

  // 選んだ道筋をたどって、表示する質問と結果を組み立てる
  const steps: { step: Step; picked?: Opt }[] = [];
  let node: Step | undefined = TREE;
  let result: Result | undefined;
  for (let i = 0; node; i++) {
    const picked: Opt | undefined = node.options.find((o) => o.id === path[i]);
    steps.push({ step: node, picked });
    if (!picked) break;
    if (picked.result) { result = picked.result; break; }
    node = picked.next;
  }

  // 選ぶたびに、新しく現れた枝までスクロール
  useEffect(() => {
    if (!touched.current) return;
    lastRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [path]);

  const pick = (depth: number, id: string) => {
    touched.current = true;
    setPath((p) => [...p.slice(0, depth), id]);
  };

  const products = (result?.slugs ?? []).map((s) => productBySlug(s)).filter((p) => p !== undefined);
  const [main, ...more] = products;
  const lastIndex = result ? steps.length : steps.length - 1;

  return (
    <div>
      <p className="text-[11px] tracking-[0.2em] text-gray-500">FIND YOUR POLE</p>
      <h2 className="mt-2 text-xl md:text-2xl font-bold leading-relaxed">あなたの植物に、ちょうどいい支え。</h2>
      <p className="mt-2 text-[13px] text-gray-600 leading-relaxed">答えるたびに次の選択肢が現れます。</p>

      <ol className="mt-8 relative">
        {steps.map(({ step, picked }, i) => (
          <li key={`${i}-${path.slice(0, i).join("/")}`} ref={i === lastIndex ? lastRef : undefined} className="finder-rise relative pl-9 pb-10 scroll-mt-24">
            <span aria-hidden className={`absolute left-[11px] top-3 bottom-0 w-px ${picked ? "bg-[#222]" : "bg-gray-200"}`} />
            <span aria-hidden className={`absolute left-[5px] top-1 w-[13px] h-[13px] rounded-full border-2 ${picked ? "bg-[#222] border-[#222]" : "bg-white border-[#222]"}`} />
            <p className="text-[10px] tracking-[0.25em] text-gray-400">STEP {String(i + 1).padStart(2, "0")} · {step.en}</p>
            <h3 className="mt-1 text-[17px] font-bold">{step.q}</h3>
            <div role="radiogroup" aria-label={step.q} className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {step.options.map((o) => {
                const on = picked?.id === o.id;
                return (
                  <button
                    key={o.id}
                    type="button"
                    role="radio"
                    aria-checked={on}
                    onClick={() => pick(i, o.id)}
                    className={`group flex items-center justify-between gap-3 min-h-[64px] px-4 py-3 text-left border rounded-md transition-all duration-300 active:scale-[0.98] ${
                      on ? "border-[#222] bg-[#222] text-white" : picked ? "border-gray-200 bg-white text-gray-400 hover:text-[#222] hover:border-gray-400" : "border-gray-300 bg-white text-[#222] hover:border-[#222]"
                    }`}
                  >
                    <span className="flex flex-col gap-0.5">
                      <span className="text-[15px] font-bold">{o.label}</span>
                      <span className={`text-[12px] ${on ? "text-white/70" : "text-gray-500"}`}>{o.sub}</span>
                    </span>
                    <svg aria-hidden width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`shrink-0 transition-transform ${on ? "rotate-90" : "group-hover:translate-x-0.5"}`}><path d="M9 6l6 6-6 6" /></svg>
                  </button>
                );
              })}
            </div>
          </li>
        ))}

        {result && main && (
          <li key={`result-${path.join("/")}`} ref={lastRef} className="finder-rise relative pl-9 scroll-mt-24">
            <span aria-hidden className="absolute left-[3px] top-0.5 w-[17px] h-[17px] rounded-full bg-[#222] ring-4 ring-gray-200" />
            <p className="text-[10px] tracking-[0.25em] text-gray-400">YOUR MATCH</p>
            <h3 className="mt-1 text-[17px] font-bold">あなたには、これ。</h3>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 border border-[#222] rounded-md overflow-hidden bg-white">
              <Link href={`/products/${main.slug}`} className="relative aspect-square bg-[#fbfbfb] block">
                <Image src={baseImage(main.slug)} alt={main.fullName} fill className="object-contain" sizes="(max-width: 768px) 100vw, 480px" />
                {main.isNew && <span className="absolute top-3 left-3 bg-[#222] text-white text-[10px] font-bold tracking-[0.15em] px-2 py-0.5">NEW</span>}
              </Link>
              <div className="p-5 md:p-7 flex flex-col gap-3">
                <p className="text-[10px] tracking-[0.2em] text-gray-500">{main.material}</p>
                <p className="text-[17px] font-bold leading-relaxed">{main.name}</p>
                <p className="text-[13px] text-gray-600 leading-loose">{main.summary}</p>
                <p className="text-[12px] text-gray-500">サイズ {main.height}</p>
                <p className="text-xl font-bold">{main.price ? yen(main.price) : ""}</p>
                <a href={withUtm(main.baseUrl, "finder")} target="_blank" rel="noopener noreferrer" className="mt-1 flex items-center justify-center min-h-[52px] bg-[#222] text-white text-[14px] font-bold tracking-[0.1em] hover:opacity-85 transition-opacity">
                  ショップで購入する
                </a>
                <Link href={`/products/${main.slug}`} className="text-center text-[13px] text-gray-600 underline underline-offset-4 decoration-gray-300 py-1">詳しく見る</Link>
              </div>
            </div>
            {result.note && <p className="mt-4 text-[13px] text-gray-600 leading-relaxed">{result.note}</p>}
            {more.length > 0 && (
              <>
                <p className="mt-8 text-[11px] tracking-[0.2em] text-gray-500">こちらもおすすめ</p>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  {more.map((p) => (
                    <Link key={p.slug} href={`/products/${p.slug}`} className="block group">
                      <div className="relative aspect-square bg-[#fbfbfb]">
                        <Image src={baseImage(p.slug)} alt={p.fullName} fill className="object-contain group-hover:opacity-90 transition-opacity" sizes="(max-width: 768px) 50vw, 240px" />
                      </div>
                      <p className="mt-2 text-[13px] leading-relaxed line-clamp-2">{p.name}</p>
                      <p className="mt-1 text-[13px] font-bold">{yen(p.price)}</p>
                    </Link>
                  ))}
                </div>
              </>
            )}
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-[13px]">
              <Link href={`/collections/${result.collection}`} className="underline underline-offset-4 decoration-gray-300 hover:decoration-[#222]">{result.collectionLabel}をすべて見る</Link>
              <button type="button" onClick={() => { touched.current = false; setPath([]); }} className="text-gray-500 underline underline-offset-4 decoration-gray-300 py-2">最初から選び直す</button>
            </div>
          </li>
        )}
      </ol>

      {/* カテゴリへの内部リンクは残す（SEO・直接探したい人向け） */}
      <div className="mt-12">
        <p className="text-[11px] tracking-[0.2em] text-gray-500 mb-3">カテゴリから探す</p>
        <CollectionNav compact />
      </div>
    </div>
  );
}
