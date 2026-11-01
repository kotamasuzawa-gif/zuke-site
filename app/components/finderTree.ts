export type Result = { slugs: string[]; collection: string; collectionLabel: string; note?: string };
export type Opt = { id: string; label: string; sub: string; next?: Step; result?: Result };
export type Step = { en: string; q: string; options: Opt[] };

const IRON_SIZE: Step = {
  en: "SIZE",
  q: "鉢と植物の大きさは？",
  // 2026-10-23 SEO(#12779 EC店長の裏取り): アイアンで BASE にブラックが残っているのは hex2(124680568・黒10/白10) だけ。
  // hex3 は黒0/白2・hex5 は黒0/白7・uneune は黒0/白24 で、hex-set-2pcs(162185287) は黒白とも0。
  // 黒は単独で売れ、白は「黒の注文に1本足す」形でしか売れていない（白単独受注0本）ので、
  // 4つの枝すべてから黒の買える hex2 に届くようにする。main（先頭＝ヒーローカード）の商品と並び順は変えない＝追加のみ。
  // 「大きく育てたい」(l) は当初 19.5cm を並べると質問（39cm・主役サイズ）と食い違うため足していなかったが、
  // 2026-10-26 に 39cm の hex5 が落ちて答えが樹脂1点になったため hex2 を2点目に足した（#13855）。
  // 在庫数は書かない（腐るため。PAIRINGS の 2026-10-16 方針と同じ）。
  options: [
    { id: "s", label: "小鉢・まだ小さい株", sub: "高さ約19.5cm", result: { slugs: ["hex2", "hex3"], collection: "iron", collectionLabel: "アイアン支柱" } },
    // 2026-10-23 SEO(#12790 EC店長): 2本セット hex-set-2pcs(162185287) は visible=1 のまま黒白とも在庫0で、
    // 店頭（shop.zukeplants.com）に「カートに入れる」が1件も出ていない＝クリックしても買えないカード。m・l の2枝から外す。
    // l は hex5(白7のみ)だけでは黒が0になるため、黒8本が買える上り棒セット noboribo(162757270・3,980円) を併記。
    // sub の「約39cm」と寸法が食い違わないよう、性質（水苔を詰めて気根を登らせる・鉢と受け皿付き）を note で明示する。
    { id: "m", label: "中くらいの鉢", sub: "高さ約22cm", result: { slugs: ["hex3", "hex2"], collection: "iron", collectionLabel: "アイアン支柱" } },
    // 2026-10-26 SEO(#13848 EC店長): hex5(117375069) は 10/29 の卸引き当て（承認セット169）で黒白とも0＝完全完売。
    // l 枝は noboribo 単独に。sub の「高さ約39cm・主役サイズ」は嘘になるので noboribo の確定値に差し替えた。
    // 2026-10-26 追記(#13855 EC店長): noboribo は kind:"pla"＝「アイアン」を選んだ答えが樹脂1点だけになるため
    // 2点目に hex2 を足す。並びは noboribo → hex2（目的＝大きく育てる が先、素材の答えが後）。sub は noboribo の確定値のまま。
    { id: "l", label: "大きく育てたい", sub: "全高約28.5cm・鉢と受け皿つき", result: { slugs: ["noboribo", "hex2"], collection: "iron", collectionLabel: "アイアン支柱", note: "上り棒セットは水苔を詰めて気根を登らせるタイプです（六角鉢・受け皿付き）。アイアンでお探しなら高さ約19.5cmの「2つの六角形」に黒・白とも在庫があります。" } },
    { id: "w", label: "横に広がる株", sub: "うねる形で株をまとめる", result: { slugs: ["uneune", "hex3", "hex2"], collection: "iron", collectionLabel: "アイアン支柱" } },
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

export const TREE: Step = {
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
    { id: "hang", label: "吊るして飾りたい", sub: "S字フックで窓辺や棚に", result: { slugs: ["hexhanging", "hexwall-set", "hexwallplate"], collection: "hanging", collectionLabel: "ハンギング", note: "壁に掛けて飾るなら、壁掛けプレートと鉢のセットもあります。" } },
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

export type FinderCase = { id: string; label: string; slugs: string[] };

function collectCases(step: Step, trail: { id: string; label: string }[]): FinderCase[] {
  return step.options.flatMap((opt) => {
    const nextTrail = [...trail, { id: opt.id, label: opt.label }];
    const id = nextTrail.map((t) => t.id).join("-");
    const label = nextTrail.map((t) => t.label).join(" / ");
    if (opt.result) return [{ id, label, slugs: opt.result.slugs }];
    if (opt.next) return collectCases(opt.next, nextTrail);
    return [];
  });
}

/** 診断の各枝を、用途 → 商品 slug の一覧にする（LP の直接リンク用） */
export const FINDER_CASES: FinderCase[] = collectCases(TREE, []);
