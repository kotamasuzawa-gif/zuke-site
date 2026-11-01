import { productBySlug, yen, type Product } from "@/app/lib/products";
import { lpShopUrl } from "./utm";

export function baseItemId(baseUrl: string): string {
  const id = baseUrl.match(/\/items\/(\d+)/)?.[1];
  if (!id) throw new Error(`BASE item id not found in ${baseUrl}`);
  return id;
}

/**
 * LINEUP の4点。表示名は BASE に出した「新しい商品名」。
 * 価格・写真・item id は products.ts（baseUrl の末尾）から取る。
 * モックの並びは ¥770 / ¥880 / ¥1,980 / ¥3,980。
 * ¥1,980 は六角鉢セット「3つの六角形」（159039931）。
 * 同じ金額の2本セット（162185287）は在庫0のためカードにしない。
 */
export const LINEUP: { slug: string; displayName: string }[] = [
  {
    slug: "hex2",
    displayName: 'PLANTS POLE "2つの六角形" 19.5cm｜小鉢の植物支柱 アイアン',
  },
  {
    slug: "hex3",
    displayName: 'PLANTS POLE "3つの六角形" 22cm｜観葉植物の支柱 アイアン',
  },
  {
    slug: "hexpot-set",
    displayName: '六角鉢セット "3つの六角形"｜支柱が差せる鉢・受け皿・支柱',
  },
  {
    slug: "noboribo",
    displayName: '上り棒セット "3つの六角形"｜モンステラ・ポトスの水苔支柱＋鉢',
  },
];

export type LineupCard = {
  slug: string;
  displayName: string;
  priceLabel: string;
  price: number;
  image: string;
  itemId: string;
  href: string;
};

export function lineupCards(): LineupCard[] {
  return LINEUP.map((item) => {
    const product = productBySlug(item.slug);
    if (!product) throw new Error(`lineup slug missing from products.ts: ${item.slug}`);
    return toCard(item, product);
  });
}

function toCard(item: (typeof LINEUP)[number], product: Product): LineupCard {
  const itemId = baseItemId(product.baseUrl);
  return {
    slug: item.slug,
    displayName: item.displayName,
    price: product.price,
    priceLabel: yen(product.price),
    image: product.image,
    itemId,
    href: lpShopUrl("lineup", itemId),
  };
}

/** スティッキーバーの「¥770〜」。最安のアイアン支柱（hex2）から出す。 */
export function stickyBuyLabel(): string {
  const entry = productBySlug("hex2");
  if (!entry) return "BASEショップで見る";
  return `BASEショップで見る（${yen(entry.price)}〜）`;
}
