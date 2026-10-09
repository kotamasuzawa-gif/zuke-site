// 商品マスタ（単一の正）。スペックは BASE 本店の商品ページ実記載と一致させること。
// 2026-08-22 SEO強化: 商品ごとの内部ページを新設し、ここを共通データ源にした。

export type MaterialKind = "iron" | "pla";
export type CategoryKey = "pole" | "pot" | "extension" | "vase";

export type Product = {
  slug: string;
  /** サイト内表示用の短い名前 */
  name: string;
  /** BASE 上の正式名称（構造化データ・alt に使用） */
  fullName: string;
  price: number;
  /** 素材系統（導線用）: アイアン / PLA樹脂 */
  kind: MaterialKind;
  /** カテゴリ（導線用）: 支柱 / 鉢・セット / 支柱の拡張 / 花瓶 */
  category: CategoryKey;
  image: string;
  /** SNS共有カード用の画像（未指定なら image）。白背景で輪郭が消える商品用 */
  ogImage?: string;
  /** ogImage のサイズ（未指定なら1200x1200の正方形扱い）。横長OG画像を使う商品で指定 */
  ogWidth?: number;
  ogHeight?: number;
  /** ogImage が正方形でない場合に、Facebook等向けの正方形版を追加で渡す */
  ogImageSquare?: string;
  baseUrl: string;
  /** titleタグが長すぎる(37字超)商品のみ指定する短縮title。未指定なら name｜TITLE_SUFFIX を使う */
  shortTitle?: string;
  /** 一覧・meta description 用の短い説明 */
  summary: string;
  /** 詳細ページのリード文 */
  lead: string;
  height: string;
  /**
   * 幅。確定値（実測・サイズ図）がある商品だけ入れる。
   * 2026-10-10 EC店長#6718: 高さの違う3商品に「約8cm（差込部）」が雛形で入っていたため任意化。
   * 写真からの推定値を断定して公開しない（根拠のない記述を出さない）。
   */
  width?: string;
  weight?: string;
  material: string;
  /**
   * サイズ図（実寸カット）。文字だけでは伝わらない大きさを図でも示す。
   * 図に入れてよいのは確定値だけ（推定値は入れない＝width と同じ方針）。
   */
  sizeImage?: {
    src: string;
    alt: string;
    caption?: string;
    width: number;
    height: number;
  };
  /** 相性のよい植物 */
  plants: string[];
  /** インテリア文脈での使いどころ */
  scenes: string[];
  /**
   * 期間限定の告知（開始〜終了はJST日付 YYYY-MM-DD。表示側で期間内のみ出す）。
   * 複数指定時は配列の先頭ほど優先（期間が重なる場合は先頭が勝つ）。
   */
  campaigns?: {
    code: string;
    label: string;
    startDate: string;
    endDate: string;
    note?: string;
  }[];
};

export const SHOP = "https://shop.zukeplants.com";
// 2026-10-07 EC店長依頼(#4631): BASE注文をzukeplants.com経由と切り分けられるよう、
// 購入リンク（クリックして実際にBASEへ出ていくもの）にUTMを付与する。JSON-LD等の正規URLには付けない。
export const withUtm = (url: string, utmContent?: string) => {
  const base = `${url}${url.includes("?") ? "&" : "?"}utm_source=zukeplants_guide`;
  return utmContent ? `${base}&utm_content=${utmContent}` : base;
};
/** 送料（BASE 本店の記載と同期。2026-09-29 BASE に合わせて修正: ヤマト宅急便・地域/サイズ別 ¥940〜¥2,200、¥5,500以上で無料） */
export const SHIPPING = { feeFrom: 940, freeOver: 5500 };
// 2026-09-29 SEO R4: 樹脂版（pole3pla / pole2pla / hexpot / hexvase）の色数を BASE の実バリエーション（4色）に合わせた。
// hex2 の「シリーズでいちばん〜」は、より小さく安い 1連樹脂版があるため「アイアン製で」と範囲を明記。
// pole2pla（樹脂・約17cm）はアイアン製2連（約19.5cm）と別物なので、アイアンに触れない表現にした。

// 2026-10-05 増澤さん「LPがBASEの写真と一緒じゃない。BASEを正にして」: 一覧・詳細の1枚目(image)は BASE の1枚目と同じ写真にする（product-<slug>-base.webp は BASE から取得）
export const PRODUCTS: Product[] = [
  {
    slug: "hex5",
    kind: "iron",
    category: "pole",
    name: 'PLANTS POLE "5つの六角形"',
    fullName: 'PLANTS POLE "5つの六角形" - 蔓性植物をインテリアに馴染むように飾る支柱 -',
    price: 1320,
    image: "/products/product-hex5-base.webp",
    // 2026-10-06 SEO: 1.91:1クロップでトレリス上部が切れる指摘→横長OGに差し替え
    ogImage: "/products/product-hex5-og-wide.jpg",
    ogWidth: 1200,
    ogHeight: 630,
    baseUrl: `${SHOP}/items/117375069`,
    summary:
      "六角形を5つ連ねた全長約39cmの園芸支柱。アイアン製で6〜8号鉢が目安、モンステラやポトスなど伸びる蔓性の観葉植物をインテリアグリーンとして美しく仕立てられます。",
    lead:
      "シリーズでいちばん背が高い、主役になるサイズ。六角形を5つ連ねた独自のフォルムが、植物を支えながらそのまま部屋のオブジェとして成立します。伸び盛りのモンステラやポトスを、垂れ流しではなく「立ち上げて魅せる」ための一本です。",
    height: "約39cm（全長・差込部含む）",
    // 2026-10-10 EC店長#6733: 旧「約7cm（差込部）」も雛形の使い回しの疑いが濃い（デザイナー#6727 の3型突き合わせ＝
    // 同じ六角形部品を同じ千鳥配置で連ねた構造なのに 2つ=8cm／3つ=8cm／5つ=7cm と型ごとに違う理由がない）。
    // 写真からの実測は不可なので推定値への書き換えはせず、アイアン4商品そろえて幅の記載を外す。
    weight: "約91g",
    material: "アイアンスチール",
    plants: ["モンステラ", "ポトス", "フィロデンドロン", "シンゴニウム"],
    scenes: [
      "リビングの主役グリーンを立ち上げて見せる",
      "棚や家具の上で、高さのアクセントをつくる",
      "伸びすぎて垂れてきた蔓を上方向に誘引し直す",
    ],
    // 2026-10-06 EC店長決定(#4304): 期間で切替。10/8-10/14はHEX5FREE単独(ZUKE2SETと併用不可・先頭優先)。
    // 2026-10-10 SEO: HEX5FREE はBASE側のクーポン本体が未作成のまま（10/9にお客様が「利用できないクーポンです」に遭遇・
    // mistakes.md 2026-10-09 14:4x）。実在しないコードを本番ページで告知し続けないため先頭の1行を削除し、
    // 実在と割引率を実注文で照合済みのZUKE2SET単独に戻した。作成されたら改めて先頭に戻す。
    campaigns: [
      {
        code: "ZUKE2SET",
        label: "支柱2点以上・合計1,600円以上で10%OFF",
        startDate: "2026-10-06",
        endDate: "2026-10-19",
        note: "購入画面でコードを入力",
      },
    ],
  },
  {
    slug: "hex3",
    kind: "iron",
    category: "pole",
    name: 'PLANTS POLE "3つの六角形"',
    fullName: 'PLANTS POLE "3つの六角形" - 蔓性植物をインテリアに馴染むように飾る支柱 -',
    price: 880,
    image: "/products/product-hex3-base.webp",
    // 2026-10-04 SEO: summary_large_image(1.91:1)で正方形og画像の上下が切れる指摘→横長OGに差し替え
    ogImage: "/products/product-hex3-black-ogwide.jpg",
    ogWidth: 1200,
    ogHeight: 630,
    ogImageSquare: "/products/product-hex3-black-1200x1200.jpg",
    baseUrl: `${SHOP}/items/128906974`,
    summary:
      "六角形を3つ連ねた高さ約22cmのアイアン製園芸支柱。2.5〜5号鉢が目安で、ホヤなど小さめの蔓性植物に。空間を邪魔せずデスクや棚の上にも収まります。",
    lead:
      "小さめの鉢にちょうどいい、高さ約22cmのミドルサイズ。場所を取らないので、デスクや棚の上など、近くで眺めるグリーンに向いています。空間を圧迫せずに、株元からの立ち上がりだけを綺麗に見せられます。",
    height: "約22cm",
    // 2026-10-10 EC店長#6718: 「約8cm（差込部）」は雛形の使い回しだったため削除（確定値なし）
    // 2026-10-10 デザイナー#6729 納品のBASE5枚目と同じ図。幅表記を消したぶんをサイズ図で埋める
    sizeImage: {
      src: "/products/base-128906974-05-size.jpg",
      alt: 'PLANTS POLE "3つの六角形" の寸法図。高さ 約22cm。',
      caption: "高さ 約22cm。2.5〜5号前後の鉢が目安です（写真はブラック）。",
      width: 1600,
      height: 1600,
    },
    material: "アイアンスチール",
    plants: ["ホヤ", "小ぶりの蔓性植物", "育ちはじめの若い株"],
    scenes: [
      "デスクや窓辺の小さな鉢に高さを出す",
      "棚の中段など、天井までの余白が少ない場所に",
      "大きく育てる前の、仮の仕立てとして",
    ],
    // 2026-10-06 EC店長承認(#4298): hex2/hex3/hex5まとめ買いクーポン
    // 2026-10-10 SEO: 実条件（合計1,600円以上・コード入力）が欠けていたため追記。3つの六角形2点=1,760円で条件を満たす
    campaigns: [
      {
        code: "ZUKE2SET",
        label: "支柱2点以上・合計1,600円以上で10%OFF",
        startDate: "2026-10-06",
        endDate: "2026-10-19",
        note: "購入画面でコードを入力",
      },
    ],
  },
  {
    slug: "hex2",
    kind: "iron",
    category: "pole",
    name: 'PLANTS POLE "2つの六角形"',
    fullName: 'PLANTS POLE "2つの六角形" - 蔓性植物をインテリアに馴染むように飾る支柱 -',
    price: 770,
    image: "/products/product-hex2-base.webp",
    // 2026-10-06 SEO: 1.91:1クロップで欠ける指摘→横長OGに差し替え
    ogImage: "/products/product-hex2-og-wide.jpg",
    ogWidth: 1200,
    ogHeight: 630,
    baseUrl: `${SHOP}/items/124680568`,
    summary:
      "六角形を2つ連ねた高さ約19.5cmの園芸支柱。亀甲竜など背の低い蔓性植物と好相性。アイアン製で最も手に取りやすい¥770。",
    lead:
      "アイアン製のシリーズでいちばん小さく、いちばん手に取りやすい一本。高さ約19.5cmと低いので、亀甲竜のようにこれから蔓を伸ばす植物の「最初の一手」に向いています。まず1つ試してみたい方にもおすすめです。",
    height: "約19.5cm",
    // 2026-10-10 EC店長#6718: 「約8cm（差込部）」は雛形の使い回しだったため削除（確定値なし）
    material: "アイアンスチール",
    plants: ["亀甲竜", "背の低い蔓性植物", "これから蔓を伸ばす株"],
    scenes: [
      "小鉢のワンポイントとして",
      "蔓が伸び始めたばかりの株の誘引スタートに",
      "複数の鉢に並べて、シリーズで揃える",
    ],
    // 2026-10-06 EC店長承認(#4298): hex2/hex3/hex5まとめ買いクーポン
    // 2026-10-10 SEO: 2つの六角形は2点でも1,540円で合計1,600円の条件に届かないため、
    // 「2点以上で10%OFF」だけの表記は誤り（10/9 HEX5FREE と同型）。条件と組み合わせ例を明記する
    campaigns: [
      {
        code: "ZUKE2SET",
        label: "支柱2点以上・合計1,600円以上で10%OFF",
        startDate: "2026-10-06",
        endDate: "2026-10-19",
        note: "購入画面でコードを入力。2つの六角形2点=1,540円は条件未達",
      },
    ],
  },
  {
    slug: "uneune",
    kind: "iron",
    category: "pole",
    name: 'PLANTS POLE "うねうね"',
    fullName: 'PLANTS POLE ”うねうね” -横に広がる植物を矯正できる支柱-',
    price: 1320,
    image: "/products/product-uneune-base.webp",
    // 2026-10-06 SEO: 共有カードが汎用og.jpgだったので横長画像を追加（デザイナー制作）
    ogImage: "/products/product-uneune-og-wide.jpg",
    ogWidth: 1200,
    ogHeight: 630,
    baseUrl: `${SHOP}/items/130117282`,
    summary:
      "左右にうねるラインで、横に広がる植物の姿を整えるアイアン製園芸支柱。高さ約35cm・うねうね部 約12cmで5〜7号鉢が目安。アロカシアなど葉が暴れる株をまとまりのある姿に。",
    lead:
      "左右を行き来する「うねうね」としたラインが特徴の支柱。まっすぐ支えるのではなく、横に広がってしまう株の姿をやさしく矯正します。葉が四方に暴れがちなアロカシアなどを、まとまりのあるシルエットに整えたいときに。",
    height: "約35cm",
    // 2026-10-10 EC店長#6718: 旧「約8cm（差込部）」は雛形。10/10納品のサイズ図の確定値に差し替え
    width: "約12cm（うねうね部）",
    // 2026-10-10 デザイナー納品のBASE5枚目と同じ図。幅表記を消したぶんをサイズ図で埋める（#6730）
    sizeImage: {
      src: "/products/base-130117282-05-size.jpg",
      alt: 'PLANTS POLE "うねうね" の寸法図。全長 約35cm、うねうね部 約12cm。',
      caption: "全長 約35cm／うねうね部 約12cm。5〜7号前後の鉢が目安です（写真はホワイト）。",
      width: 1600,
      height: 1600,
    },
    material: "アイアンスチール",
    plants: ["アロカシア", "モンステラ", "ポトス", "葉が横に広がる観葉植物"],
    scenes: [
      "横に広がった株を、まとまったシルエットに整える",
      "曲線が主役になるので、直線的な家具の上でアクセントに",
      "鉢だけでは物足りない足元に、動きを足す",
    ],
  },
  {
    slug: "hexpot-set",
    kind: "pla",
    category: "pot",
    name: 'PLANTS POLE 六角鉢セット "3つの六角形"',
    fullName: 'PLANTS POLE 六角鉢セット "3つの六角形"（鉢・受け皿・支柱の3点）',
    // 2026-10-08 SEO: GSC「六角鉢」4imp・4.0位・0click。title に検索で選ばれる中身（受け皿・支柱付き）を足す（商品名は変えない）
    shortTitle: '六角鉢セット "3つの六角形"｜受け皿・支柱付き',
    price: 1980,
    image: "/products/product-hexpot-set-base.webp",
    // 2026-10-06 SEO: 1.91:1クロップで鉢皿が切れる指摘→横長OGに差し替え
    ogImage: "/products/product-hexpot-set-og-wide.jpg",
    ogWidth: 1200,
    ogHeight: 630,
    baseUrl: `${SHOP}/items/159039931`,
    summary:
      "六角形の鉢・受け皿・支柱「PLANTS POLE」の3点セット。鉢の内側に支柱の差込口があり、土に頼らずまっすぐ立ちます。PLA樹脂・3Dプリント製、ブラック／ライトグレー／オレンジ／ホワイトの4色（黒・ライトグレー・オレンジは即納、白のみ受注生産）。",
    lead:
      "六角形のプラスチック鉢と、同じ六角形の受け皿、蔓性植物用の支柱を組み合わせた3点セット。鉢の内側に支柱の差込口があるので、差し込むだけで固定できます。植物タグ用のポケット付き（幅20mm・厚み2.5mmまで）。ひとつずつ3Dプリンターで製作しています。ブラック・ライトグレー・オレンジは在庫あり、ホワイトのみ入荷待ちのため受注生産です（発送までお時間をいただきます）。",
    height: "鉢 約95mm／支柱 約224mm（六角形3連）",
    width: "鉢 対辺約69mm／受け皿 対角約91mm",
    material: "PLA樹脂（3Dプリント・マット仕上げ）",
    plants: ["小さな蔓性植物", "伸び始めの若い株", "ホヤ・ラフィドフォラなど"],
    scenes: [
      "鉢・受け皿・支柱がそろった状態で、すぐに仕立て始める",
      "デスクや棚の上で、小さなグリーンをすっきり見せる",
      "タグポケットに名札を差して、品種管理も一緒に",
    ],
  },
  {
    slug: "hexpot-set2",
    kind: "pla",
    category: "pot",
    name: 'PLANTS POLE 六角鉢セット "2つの六角形"',
    fullName: 'PLANTS POLE 六角鉢セット "2つの六角形"（鉢・受け皿・支柱の3点）',
    // 2026-10-08 SEO: GSC「六角鉢」4imp・4.0位・0click。title に検索で選ばれる中身（受け皿・支柱付き）を足す（商品名は変えない）
    shortTitle: '六角鉢セット "2つの六角形"｜受け皿・支柱付き',
    price: 1880,
    image: "/products/product-hexpot-set2-base.webp",
    // 2026-10-06 SEO: 1.91:1クロップで鉢皿が切れる指摘→横長OGに差し替え
    ogImage: "/products/product-hexpot-set2-og-wide.jpg",
    ogWidth: 1200,
    ogHeight: 630,
    baseUrl: `${SHOP}/items/159049724`,
    summary:
      "六角形の鉢・受け皿・2連支柱の3点セット。差込口付きで小さな蔓性植物をすっきり誘引。PLA樹脂・3Dプリント製、ブラック／ライトグレー／オレンジ／ホワイトの4色（黒・白は即納、他は受注生産）。",
    lead:
      "デスクや窓辺の小さな鉢に合う、コンパクトなセット。鉢の内側の差込口に支柱を差し込むだけで固定でき、支柱は鉢の上に約14cm。蔓が伸び始めた株や小型の蔓性植物に。",
    height: "鉢 約95mm／支柱 約172mm（六角形2連）",
    width: "鉢 対辺約69mm／受け皿 対角約91mm",
    material: "PLA樹脂（3Dプリント・マット仕上げ）",
    plants: ["亀甲竜", "背の低い蔓性植物", "これから蔓を伸ばす株"],
    scenes: [
      "デスクや窓辺の小鉢に、支柱ごとコンパクトに",
      "4色から鉢や部屋の色に合わせる",
      "タグポケット（幅20mm・厚み2.5mmまで）で品種管理も一緒に",
    ],
  },
  {
    slug: "pole3pla",
    kind: "pla",
    category: "pole",
    name: 'PLANTS POLE "3つの六角形" 樹脂版',
    fullName: 'PLANTS POLE "3つの六角形" 樹脂版 - 軽くて色が選べる3Dプリント支柱 -',
    shortTitle: '"3つの六角形" 樹脂版｜園芸支柱',
    price: 680,
    image: "/products/product-pole3pla-base.webp",
    // 2026-10-05 SEO: デザイナー納品の実写OG(1200x630)に差し替え(#3172)
    ogImage: "/products/product-pole3pla-og.jpg",
    ogWidth: 1200,
    ogHeight: 630,
    baseUrl: `${SHOP}/items/159046672`,
    summary:
      "鉄製と同じ六角形のフォルムを、PLA樹脂で3Dプリントした軽量版。全長約22cm。ブラック／ホワイト／オレンジ／ライトグレーの4色。六角鉢セットの差込口にそのまま挿せます。",
    lead:
      "鉄製のPLANTS POLEと同じ3連の六角形を、樹脂で軽量化したエントリーモデル。鉄製の約1/3の重さで小さな鉢でも倒れにくく、色は4色から選べます。六角鉢セットと組み合わせると、鉢の差込口で固定できます。",
    height: "約22cm",
    width: "約9.4cm（脚の間隔 約6cm）",
    material: "PLA樹脂（3Dプリント・マット仕上げ）",
    plants: ["ホヤ", "小ぶりの蔓性植物", "育ちはじめの若い株"],
    scenes: [
      "軽いので、小さな鉢や吊り鉢まわりでも安心",
      "オレンジやグレーで、鉢や部屋の色に合わせる",
      "六角鉢セットの支柱の差し替え・追加用に",
    ],
  },
  {
    slug: "pole2pla",
    kind: "pla",
    category: "pole",
    name: 'PLANTS POLE "2つの六角形" 樹脂版',
    fullName: 'PLANTS POLE "2つの六角形" 樹脂版 - 軽くて色が選べる3Dプリント支柱 -',
    shortTitle: '"2つの六角形" 樹脂版｜園芸支柱',
    price: 580,
    image: "/products/product-pole2pla-base.webp",
    // 2026-10-05 SEO: デザイナー納品の実写OG(1200x630)に差し替え(#3172)
    ogImage: "/products/product-pole2pla-og.jpg",
    ogWidth: 1200,
    ogHeight: 630,
    baseUrl: `${SHOP}/items/159046887`,
    summary:
      "六角形2連・全長約17cmの樹脂版PLANTS POLE。PLA樹脂・3Dプリント製で軽く、ブラック／ホワイト／オレンジ／ライトグレーの4色。六角鉢セット付属の支柱と同じものです。",
    lead:
      "六角形2連のコンパクトなサイズを樹脂で。全長約17cmで、デスクや窓辺の小鉢にちょうどよい高さです。六角鉢セットに付属している支柱と同じもので、色違いの買い足しにも。",
    height: "約17cm",
    width: "約9.4cm（脚の間隔 約6cm）",
    material: "PLA樹脂（3Dプリント・マット仕上げ）",
    plants: ["亀甲竜", "背の低い蔓性植物", "これから蔓を伸ばす株"],
    scenes: [
      "小鉢のワンポイントとして",
      "六角鉢セットの色違い支柱として",
      "複数の鉢に並べて、色でそろえる",
    ],
  },
  {
    // 2026-09-23 新商品: 鉢＋受け皿のみ（支柱なし）
    slug: "hexpot",
    kind: "pla",
    category: "pot",
    name: "PLANTS POLE 六角鉢＋受け皿",
    fullName: "PLANTS POLE 六角鉢＋受け皿 - 支柱の差込口付き3Dプリント鉢 -",
    // 2026-10-10 SEO: GSC「六角鉢」3.6位・0click。title 先頭がブランド名で検索語が後ろだったので「六角鉢」を先頭に
    shortTitle: "六角鉢＋受け皿｜支柱が差せる3Dプリント鉢 4色",
    price: 1480,
    image: "/products/product-hexpot-black.webp",
    // 2026-10-06 SEO: 共有カードが汎用og.jpgだったので横長画像を追加（デザイナー制作）
    ogImage: "/products/product-hexpot-og-wide.jpg",
    ogWidth: 1200,
    ogHeight: 630,
    baseUrl: `${SHOP}/items/159048204`,
    summary:
      "PLANTS POLEを差し込める六角形の鉢と受け皿。支柱の差込口・タグポケット付き。PLA樹脂・3Dプリント製、ブラック／ホワイト／オレンジ／ライトグレーの4色。支柱は付属しません。",
    lead:
      "PLANTS POLEの六角形に合わせてつくった鉢と受け皿のセット。鉢の内側に支柱の差込口があり、鉄製・樹脂版どちらのPLANTS POLEも差し込むだけで固定できます。お手持ちの支柱と組み合わせて。",
    height: "鉢 約95mm／受け皿 約13mm",
    width: "鉢 対辺約69mm／受け皿 対角約91mm",
    material: "PLA樹脂（3Dプリント・マット仕上げ）",
    plants: ["小さな蔓性植物", "伸び始めの若い株", "ホヤ・ラフィドフォラなど"],
    scenes: [
      "すでにPLANTS POLEを持っている方の、専用鉢として",
      "タグポケット（幅20mm・厚み2.5mmまで）で品種管理も一緒に",
      "受け皿の浮かせ台で、水が溜まりにくい",
    ],
  },
  {
    // 2026-09-26 新商品: 1連支柱（樹脂版）と拡張パーツ。BASE 159543555 / 159543653
    slug: "pole1pla",
    kind: "pla",
    category: "pole",
    name: 'PLANTS POLE "1つの六角形" 樹脂版',
    fullName: 'PLANTS POLE "1つの六角形" 樹脂版 - 軽くて色が選べる3Dプリント支柱 -',
    shortTitle: '"1つの六角形" 樹脂版｜園芸支柱',
    price: 480,
    image: "/products/product-pole1pla-black.webp",
    // 2026-10-06 SEO: デザイナー納品のOG(1200x630、脚切れ回避クロップ)に差し替え
    ogImage: "/products/product-pole1pla-og-wide.jpg",
    ogWidth: 1200,
    ogHeight: 630,
    baseUrl: `${SHOP}/items/159543555`,
    summary:
      "六角形ひとつの、いちばん小さなPLANTS POLE。鉢に挿すだけで小さな蔓性植物や若い株をやさしく支えます。ブラック／ホワイト／オレンジ／ライトグレーの4色。",
    lead:
      "幅約64mm・全長約120mm（挿入部約65mm）。別売りの拡張パーツ（六角形＋留め具）を辺同士でつなぐと、2連・3連と後から伸ばしていけます。",
    height: "全長 約120mm（挿入部 約65mm）",
    width: "幅 約64mm／線の太さ4.4mm・厚み3.6mm",
    material: "PLA樹脂（3Dプリント・マット仕上げ）",
    plants: ["ホヤ・ポトスなど小さな蔓性植物", "伸び始めの若い株"],
    scenes: [
      "3号〜4号鉢に",
      "六角鉢シリーズと合わせて",
      "拡張パーツで成長に合わせて伸ばす",
    ],
  },
  {
    slug: "hexparts",
    kind: "pla",
    category: "extension",
    name: "PLANTS POLE 拡張パーツ 六角形＋留め具",
    fullName: "PLANTS POLE 拡張パーツ 六角形＋留め具 樹脂版 - 辺同士をつないで伸ばせる -",
    shortTitle: "拡張パーツ 六角形＋留め具｜樹脂版支柱用",
    price: 380,
    image: "/products/product-hexparts-black.webp",
    // 2026-10-06 SEO: デザイナー依頼(#3877)でクリップ接合部クローズアップが1.91:1で切れるため横長OGに差し替え
    ogImage: "/products/product-hexparts-og-wide.jpg",
    ogWidth: 1200,
    ogHeight: 630,
    baseUrl: `${SHOP}/items/159543653`,
    summary:
      "樹脂版PLANTS POLEを伸ばすための六角形パーツ1つ＋留め具3個。いま使っている支柱の辺と六角形の辺を並べ、留め具でパチッと挟むだけ。4色。",
    lead:
      "植物の成長に合わせて、1連→2連→3連と後から伸ばせます。留め具は隣り合う2本の線を1本ずつ咥えるS字型で、入れたあとはねじらないと外れません。鉄製PLANTS POLEには使えません。",
    height: "六角形 高さ 約72mm／留め具 約16×8×4mm ×3",
    width: "六角形 幅 約64mm／線の太さ4.4mm・厚み3.6mm",
    material: "PLA樹脂（3Dプリント・マット仕上げ）",
    plants: ["樹脂版PLANTS POLE（1つ／2つ／3つの六角形）を使っている株"],
    scenes: [
      "支柱と同色でそろえると留め具が目立ちません",
      "伸びた分だけ六角形を足す",
    ],
  },
  {
    // 2026-09-28 新商品: 留め具だけの5個入り（増澤さん指示）。BASE 159749568
    slug: "hexclip5",
    kind: "pla",
    category: "extension",
    name: "PLANTS POLE 留め具 5個入り",
    fullName: "PLANTS POLE 留め具 5個入り 樹脂版 - 六角形パーツをつなぐクリップ -",
    shortTitle: "留め具 5個入り｜樹脂版支柱用",
    price: 330,
    image: "/products/product-hexclip5-black.webp",
    // 2026-10-06 SEO: 1.91:1クロップで端が軽微に欠ける指摘→念のため横長OGに差し替え
    ogImage: "/products/product-hexclip5-og-wide.jpg",
    ogWidth: 1200,
    ogHeight: 630,
    baseUrl: `${SHOP}/items/159749568`,
    summary:
      "樹脂版PLANTS POLEの辺同士をつなぐ留め具（クリップ）だけの5個セット。拡張パーツ付属の3個で足りないとき、色をそろえたいとき、なくしたときの補充用に。4色。",
    lead:
      "隣り合う支柱の線と六角形の線を並べ、留め具でパチッと挟むだけ。2本の線を1本ずつ咥えるS字型で、入れたあとはねじらないと外れません。鉄製PLANTS POLEには使えません。",
    height: "約16×8×4mm ×5個",
    width: "対応線材: 太さ4.4mm・厚み3.6mm（樹脂版PLANTS POLE）",
    material: "PLA樹脂（3Dプリント・マット仕上げ）",
    plants: ["樹脂版PLANTS POLE・拡張パーツを使っている株"],
    scenes: [
      "支柱と同色でそろえると目立ちません",
      "拡張パーツの留め具の補充に",
    ],
  },
  {
    // 2026-10-05 新商品: 丸鉢スタンドセット。BASE 161140229
    slug: "marupot-stand",
    kind: "pla",
    category: "pot",
    // 2026-10-05 増澤さん指示: 支柱(POLE)はセット外なので、名前に「PLANTS POLE」を直接冠さない（六角花瓶と同じ「シリーズ」表記に統一）
    name: "丸鉢スタンドセット",
    // 2026-10-05 SEO: カテゴリ pot の既定 title「支柱が差せる六角鉢」は丸鉢と合わないので個別に指定
    shortTitle: "丸鉢スタンドセット｜3.5号ポットがそのまま入る鉢カバー",
    fullName: "丸鉢スタンドセット - PLANTS POLEシリーズの3Dプリント製 鉢カバー＋3本脚スタンド -",
    price: 1600,
    image: "/products/product-marupot-stand-base.webp",
    // 2026-10-06 SEO: summary_large_image(1.91:1)で正方形og画像の脚が切れる指摘(デザイナー#3866)→横長OGに差し替え
    ogImage: "/products/product-marupot-stand-og-wide.jpg",
    ogWidth: 1200,
    ogHeight: 630,
    ogImageSquare: "/products/product-marupot-stand-og.jpg",
    baseUrl: `${SHOP}/items/161140229`,
    summary:
      "丸みのある鉢カバーと3本脚スタンドのセット。3.5号のビニールポットがそのまま入り、植え替えずに飾れます。PLA樹脂・3Dプリント製、鉢とスタンドは別パーツで、オレンジ鉢×ブラックスタンド／ブラック鉢×オレンジスタンド／ライトグレー鉢×ブラックスタンドの3種から選べます。",
    lead:
      "丸みのある底の鉢カバーと、まっすぐな3本脚のスタンドを組み合わせたセット。鉢をスタンドのリングに乗せるだけで、床から少し浮いた軽やかな佇まいになります。3.5号のビニールポットがそのまま入るので、植え替えずに飾れます。鉢とスタンドは別パーツで、オレンジ鉢×ブラックスタンド、ブラック鉢×オレンジスタンド、ライトグレー鉢×ブラックスタンドの3種から選べます。",
    height: "鉢 約11cm（直径・高さ）／スタンド込み 高さ約13cm",
    width: "鉢 直径約11cm／スタンド込み 直径約12.5cm",
    material: "PLA（植物由来の樹脂）・3Dプリント・マット仕上げ",
    plants: ["つる性植物", "細葉の観葉植物", "3.5号ポット苗"],
    scenes: [
      "3.5号のビニールポットをそのまま植え替えずに飾る",
      "鉢とスタンドの配色を3種（オレンジ×ブラック／ブラック×オレンジ／ライトグレー×ブラック）から選ぶ",
      "PLANTS POLE \"3つの六角形\"と合わせてつる性植物を仕立てる",
    ],
  },
  {
    // 2026-09-23 新商品: 六角花瓶（白）。価格は仮
    slug: "hexvase",
    kind: "pla",
    category: "vase",
    name: "六角花瓶",
    fullName: "六角花瓶 - PLANTS POLEシリーズの3Dプリント製フラワーベース -",
    price: 1280,
    image: "/products/product-hexvase-base.webp",
    // 白×白だと note のリンクカードで輪郭が見えないため黒を共有用に（花入り実物写真が来たら差し替え）
    // 2026-10-06 SEO: summary_large_image(1.91:1)で正方形og画像の脚が切れる指摘(デザイナー#3866)→横長OGに差し替え
    ogImage: "/products/product-hexvase-black-og-wide.jpg",
    ogWidth: 1200,
    ogHeight: 630,
    ogImageSquare: "/products/product-hexvase-black-og.jpg",
    baseUrl: `${SHOP}/items/159228997`,
    summary:
      "六角鉢と同じ六角形のフォルムの花瓶。一輪挿しにも。高さ約16cm、口に向かって少しすぼまる形。PLA樹脂・3Dプリント製、ホワイト／ブラック／オレンジ／ライトグレーの4色（黒・白は即納、他は受注生産）。排水穴なしで水漏れしません。底面にZUKEロゴ入り。",
    lead:
      "六角鉢シリーズと並べて使える花瓶。底の対辺約55mmから口の対辺約47mmへ、上に向かって少しすぼまるので、一輪でも枝ものでも収まりがよい形です。角を丸めたやさしい輪郭で、マットな質感。底面には「ZUKE / Plants / Pole」のロゴを刻印。ホワイト・ブラック・オレンジ・ライトグレーの4色。ブラック・ホワイトは在庫あり（なくなり次第受注生産）。オレンジ・ライトグレーは受注生産で、発送まで1週間ほどお時間をいただきます。",
    height: "約160mm",
    width: "底 対辺約55mm／口 対辺約47mm",
    material: "PLA樹脂（3Dプリント・マット仕上げ）",
    plants: ["切り花・一輪挿し", "枝もの", "ドライフラワー"],
    scenes: [
      "六角鉢と並べて、シリーズでそろえる",
      "玄関やデスクの一輪挿しに",
      "軽いので棚の上や高い場所にも",
      "4色から部屋に合わせて",
    ],
  },
];

export function productBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export const yen = (n: number) => `¥${n.toLocaleString("ja-JP")}`;

// 2026-09-26 増澤さん指示: 「アイアンで探す／PLA樹脂で探す」の導線と、支柱・鉢・拡張・花瓶のカテゴリページ
export const MATERIALS: { key: MaterialKind; label: string; lead: string; image: string }[] = [
  { key: "iron", label: "アイアン支柱", lead: "職人が曲げるアイアンスチール製。細く、強く、植物の陰になる存在感。", image: "/products/product-hex5-black.webp" },
  { key: "pla", label: "PLA樹脂製品", lead: "3Dプリントの六角鉢・樹脂支柱・拡張パーツ。軽く、4色から選べます。", image: "/products/product-hexpot-set-black.webp" },
];
export const CATEGORIES: { key: CategoryKey; label: string; lead: string }[] = [
  { key: "pole", label: "支柱", lead: "蔓性植物を立ち上げる PLANTS POLE。アイアンと樹脂版。" },
  { key: "pot", label: "鉢・セット", lead: "支柱の差込口付き六角鉢と受け皿、支柱とのセット。" },
  { key: "extension", label: "支柱の拡張", lead: "六角形を継ぎ足して、植物の成長に合わせて高さを伸ばすパーツ。対応するのは樹脂版PLANTS POLE（1つ/2つ/3つの六角形）のみで、鉄製PLANTS POLEには使えません。支柱の辺と六角形の辺を並べ、留め具でパチッと挟むだけ。六角形パーツ1つにつき高さ約72mm（7.2cm）伸ばせるので、1連→2連→3連と後から育てていけます。" },
  { key: "vase", label: "花瓶", lead: "六角鉢シリーズのフラワーベース。" },
];
export type CollectionKey = MaterialKind | CategoryKey;
// 2026-09-29 SEO R4: カテゴリページの title / meta description。label はナビで使うので変えず、SEO 用に別で持つ。
// title は「支柱｜ZUKE PLANTS POLE｜ZUKE」とブランドが二重になっていた。description は 28〜51字と薄かった。
// 内容は products.ts（BASE と同期）の事実のみ。
const COLLECTION_SEO: Record<CollectionKey, { seoTitle: string; seoDescription: string }> = {
  pole: {
    seoTitle: "おしゃれな観葉植物の支柱｜六角形の園芸支柱 一覧",
    seoDescription: "六角形デザインの園芸支柱 PLANTS POLE の一覧。アイアンスチール製（高さ約19.5〜39cm）と、軽くて色が選べる3Dプリント樹脂版。モンステラ・ポトス・ホヤなど蔓性の観葉植物を、インテリアに馴染むように仕立てられます。",
  },
  iron: {
    seoTitle: "アイアンの園芸支柱｜六角形の PLANTS POLE",
    seoDescription: "アイアンスチール製の園芸支柱 PLANTS POLE。六角形を2つ・3つ・5つ連ねた3型と、横に広がる株を整える「うねうね」の全4型。高さ約19.5〜39cm。モンステラ・ポトス・アロカシアなどに。",
  },
  pla: {
    seoTitle: "3Dプリントの六角鉢・樹脂支柱（PLA）",
    seoDescription: "PLA樹脂を3Dプリントでつくる、支柱の差込口付き六角鉢・受け皿・樹脂版支柱・拡張パーツ・花瓶。軽く、色を選べます。アイアンの PLANTS POLE と同じ六角形のデザインです。",
  },
  pot: {
    seoTitle: "支柱が差せる六角鉢・鉢と支柱のセット",
    seoDescription: "鉢の内側に支柱の差込口がある六角形の鉢と受け皿、PLANTS POLE とのセット。差し込むだけで支柱が固定でき、植物タグ用のポケット付き。PLA樹脂・3Dプリント製で、小さな蔓性植物や若い株に。",
  },
  extension: {
    seoTitle: "支柱を後から伸ばす拡張パーツ・留め具",
    seoDescription: "樹脂版 PLANTS POLE に六角形を継ぎ足して、植物の成長に合わせて高さを伸ばせる拡張パーツと留め具。辺同士を並べて留め具で挟むだけ。1連の樹脂版支柱から、2連・3連へと伸ばせます。アイアン製には使えません。",
  },
  vase: {
    seoTitle: "六角形の花瓶（3Dプリント製）",
    seoDescription: "六角鉢と同じ六角形のフォルムの花瓶。一輪挿しにも。高さ約16cm、PLA樹脂・3Dプリント製のマット仕上げ。排水穴がないので水を入れて一輪挿しや枝ものに。ドライフラワーを飾るのにも使えます。",
  },
};
export const COLLECTIONS: { key: CollectionKey; label: string; lead: string; seoTitle: string; seoDescription: string; filter: (p: Product) => boolean }[] = [
  ...MATERIALS.map((m) => ({ key: m.key as CollectionKey, label: m.label, lead: m.lead, ...COLLECTION_SEO[m.key], filter: (p: Product) => p.kind === m.key })),
  ...CATEGORIES.map((c) => ({
    key: c.key as CollectionKey, label: c.label, lead: c.lead, ...COLLECTION_SEO[c.key],
    // 「支柱の拡張」には拡張パーツに加え、起点になる挿入部つきの 1連樹脂版も並べる（2026-09-26 増澤さん指示）
    filter: (p: Product) => p.category === c.key || (c.key === "extension" && p.slug === "pole1pla"),
  })),
];
export const collectionByKey = (key: string) => COLLECTIONS.find((c) => c.key === key);

// 2026-10-01 営業依頼「六角鉢セット×支柱のバンドル導線」: 商品ページに「組み合わせて使う」を出す。
// 組み合わせの根拠は上の lead / scenes の記載のみ（鉢の差込口は鉄製・樹脂版どちらも可、拡張パーツは樹脂版のみ）
export const PAIRINGS: Record<string, { slug: string; note: string }[]> = {
  hexpot: [
    { slug: "hex3", note: "鉢の差込口に挿すだけで固定（アイアン3連）" },
    { slug: "hex2", note: "鉢の差込口に挿すだけで固定（アイアン2連）" },
    { slug: "pole3pla", note: "同じ4色で鉢と支柱の色をそろえる" },
    { slug: "pole2pla", note: "小鉢に合うコンパクトな樹脂版" },
  ],
  "hexpot-set": [
    { slug: "pole3pla", note: "付属支柱の色違い・差し替えに" },
    { slug: "hexpot", note: "鉢だけ買い足して、お手持ちの支柱と" },
    { slug: "hexvase", note: "同じ六角形の花瓶を並べて" },
  ],
  "hexpot-set2": [
    { slug: "pole2pla", note: "付属支柱と同じもの。色違いの買い足しに" },
    { slug: "hexparts", note: "成長に合わせて六角形を足して伸ばす" },
    { slug: "hexvase", note: "同じ六角形の花瓶を並べて" },
  ],
  hex3: [
    { slug: "hexpot", note: "差込口付きの六角鉢に挿して固定" },
    { slug: "marupot-stand", note: "丸鉢スタンドセットに仕立てて、つる性・細葉の植物をすっきりまとめる" },
  ],
  hex2: [{ slug: "hexpot", note: "差込口付きの六角鉢に挿して固定" }],
  pole3pla: [
    { slug: "hexpot", note: "差込口付きの六角鉢に挿して固定" },
    { slug: "hexparts", note: "六角形を足して伸ばす" },
  ],
  pole2pla: [
    { slug: "hexpot", note: "差込口付きの六角鉢に挿して固定" },
    { slug: "hexparts", note: "六角形を足して伸ばす" },
  ],
  pole1pla: [
    { slug: "hexparts", note: "1連→2連→3連と後から伸ばす" },
    { slug: "hexpot", note: "差込口付きの六角鉢に挿して固定" },
  ],
  hexparts: [
    { slug: "pole1pla", note: "伸ばす前の1連から" },
    { slug: "hexclip5", note: "留め具の補充に" },
  ],
  hexclip5: [{ slug: "hexparts", note: "六角形パーツを足して伸ばす" }],
  hexvase: [
    { slug: "hexpot", note: "同じ六角形の鉢と並べて" },
    { slug: "hexpot-set2", note: "鉢・受け皿・支柱の3点セット" },
  ],
  "marupot-stand": [
    { slug: "hex3", note: "六角形3連の支柱を仕立てて、つる性・細葉の植物をすっきりまとめる" },
  ],
};
