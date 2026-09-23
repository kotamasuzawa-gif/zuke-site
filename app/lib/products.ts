// 商品マスタ（単一の正）。スペックは BASE 本店の商品ページ実記載と一致させること。
// 2026-08-22 SEO強化: 商品ごとの内部ページを新設し、ここを共通データ源にした。

export type Product = {
  slug: string;
  /** サイト内表示用の短い名前 */
  name: string;
  /** BASE 上の正式名称（構造化データ・alt に使用） */
  fullName: string;
  price: number;
  image: string;
  baseUrl: string;
  /** 一覧・meta description 用の短い説明 */
  summary: string;
  /** 詳細ページのリード文 */
  lead: string;
  height: string;
  width: string;
  weight?: string;
  material: string;
  /** 相性のよい植物 */
  plants: string[];
  /** インテリア文脈での使いどころ */
  scenes: string[];
};

export const SHOP = "https://zukeplants.base.shop";
/** 送料（BASE 本店の記載と同期） */
export const SHIPPING = { fee: 760, freeOver: 5000 };

export const PRODUCTS: Product[] = [
  {
    slug: "hex5",
    name: 'PLANTS POLE "5つの六角形"',
    fullName: 'PLANTS POLE "5つの六角形" - 蔓性植物をインテリアに馴染むように飾る支柱 -',
    price: 1320,
    image: "/products/product-hex5-black.webp",
    baseUrl: `${SHOP}/items/117375069`,
    summary:
      "六角形を5つ連ねた高さ約39cmの園芸支柱。モンステラやポトスなど、伸びる蔓性の観葉植物をインテリアグリーンとして美しく仕立てられます。",
    lead:
      "シリーズでいちばん背が高い、主役になるサイズ。六角形を5つ連ねた独自のフォルムが、植物を支えながらそのまま部屋のオブジェとして成立します。伸び盛りのモンステラやポトスを、垂れ流しではなく「立ち上げて魅せる」ための一本です。",
    height: "約39cm",
    width: "約7cm（差込部）",
    weight: "約91g",
    material: "アイアンスチール",
    plants: ["モンステラ", "ポトス", "フィロデンドロン", "シンゴニウム"],
    scenes: [
      "リビングの主役グリーンを立ち上げて見せる",
      "棚や家具の上で、高さのアクセントをつくる",
      "伸びすぎて垂れてきた蔓を上方向に誘引し直す",
    ],
  },
  {
    slug: "uneune",
    name: 'PLANTS POLE "うねうね"',
    fullName: 'PLANTS POLE ”うねうね” -横に広がる植物を矯正できる支柱-',
    price: 1320,
    image: "/products/product-uneune-black.webp",
    baseUrl: `${SHOP}/items/130117282`,
    summary:
      "左右にうねるラインで、横に広がってしまう植物の姿を整える園芸支柱。高さ約35cm。アロカシアなどの葉が暴れる株に。",
    lead:
      "左右を行き来する「うねうね」としたラインが特徴の支柱。まっすぐ支えるのではなく、横に広がってしまう株の姿をやさしく矯正します。葉が四方に暴れがちなアロカシアなどを、まとまりのあるシルエットに整えたいときに。",
    height: "約35cm",
    width: "約8cm（差込部）",
    material: "アイアンスチール",
    plants: ["アロカシア", "葉が横に広がる観葉植物", "草丈が乱れやすい株"],
    scenes: [
      "横に広がった株を、まとまったシルエットに整える",
      "曲線が主役になるので、直線的な家具の上でアクセントに",
      "鉢だけでは物足りない足元に、動きを足す",
    ],
  },
  {
    slug: "hex3",
    name: 'PLANTS POLE "3つの六角形"',
    fullName: 'PLANTS POLE "3つの六角形" - 蔓性植物をインテリアに馴染むように飾る支柱 -',
    price: 880,
    image: "/products/product-hex3-black.webp",
    baseUrl: `${SHOP}/items/128906974`,
    summary:
      "六角形を3つ連ねた高さ約22cmの園芸支柱。ホヤなど小さめの蔓性植物に。空間を邪魔せず、デスクや棚の上でも収まります。",
    lead:
      "小さめの鉢にちょうどいい、高さ約22cmのミドルサイズ。場所を取らないので、デスクや棚の上など、近くで眺めるグリーンに向いています。空間を圧迫せずに、株元からの立ち上がりだけを綺麗に見せられます。",
    height: "約22cm",
    width: "約8cm（差込部）",
    material: "アイアンスチール",
    plants: ["ホヤ", "小ぶりの蔓性植物", "育ちはじめの若い株"],
    scenes: [
      "デスクや窓辺の小さな鉢に高さを出す",
      "棚の中段など、天井までの余白が少ない場所に",
      "大きく育てる前の、仮の仕立てとして",
    ],
  },
  {
    slug: "hex2",
    name: 'PLANTS POLE "2つの六角形"',
    fullName: 'PLANTS POLE "2つの六角形" - 蔓性植物をインテリアに馴染むように飾る支柱 -',
    price: 770,
    image: "/products/product-hex2-black.webp",
    baseUrl: `${SHOP}/items/124680568`,
    summary:
      "六角形を2つ連ねた高さ約19.5cmの園芸支柱。亀甲竜など背の低い蔓性植物と好相性。シリーズで最も手に取りやすい¥770。",
    lead:
      "シリーズでいちばん小さく、いちばん手に取りやすい一本。高さ約19.5cmと低いので、亀甲竜のようにこれから蔓を伸ばす植物の「最初の一手」に向いています。まず1つ試してみたい方にもおすすめです。",
    height: "約19.5cm",
    width: "約8cm（差込部）",
    material: "アイアンスチール",
    plants: ["亀甲竜", "背の低い蔓性植物", "これから蔓を伸ばす株"],
    scenes: [
      "小鉢のワンポイントとして",
      "蔓が伸び始めたばかりの株の誘引スタートに",
      "複数の鉢に並べて、シリーズで揃える",
    ],
  },
  {
    // 2026-09-23 新商品: 3Dプリント製の六角鉢セット。BASE の商品ページ作成後に baseUrl と price を確定させること
    slug: "hexpot-set",
    name: "PLANTS POLE 六角鉢セット",
    fullName: "PLANTS POLE 六角鉢セット（鉢・受け皿・支柱の3点）",
    price: 1980,
    image: "/products/product-hexpot-set-black.webp",
    baseUrl: SHOP,
    summary:
      "六角形の鉢・受け皿・支柱「PLANTS POLE」の3点セット。鉢の内側に支柱の差込口があり、土に頼らずまっすぐ立ちます。PLA樹脂・3Dプリント製。",
    lead:
      "六角形のプラスチック鉢と、同じ六角形の受け皿、蔓性植物用の支柱を組み合わせた3点セット。鉢の内側に支柱の差込口があるので、差し込むだけで固定できます。植物タグ用のポケット付き。ひとつずつ3Dプリンターで製作しています。",
    height: "鉢 約95mm／支柱 約172mm（六角形2連）",
    width: "鉢 対辺約69mm／受け皿 対角約91mm",
    material: "PLA樹脂（3Dプリント・マット仕上げ）",
    plants: ["小さな蔓性植物", "伸び始めの若い株", "ホヤ・ラフィドフォラなど"],
    scenes: [
      "鉢・受け皿・支柱がそろった状態で、すぐに仕立て始める",
      "デスクや棚の上で、小さなグリーンをすっきり見せる",
      "タグポケットに名札を差して、品種管理も一緒に",
    ],
  },
];

export function productBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export const yen = (n: number) => `¥${n.toLocaleString("ja-JP")}`;
