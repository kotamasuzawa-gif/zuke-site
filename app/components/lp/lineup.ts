import { productBySlug, yen, type Product } from "@/app/lib/products";
import { LP_PRODUCT_NAMES } from "./names";
import { baseItemId, lpShopUrl } from "./utm";

/**
 * LINEUP の4点。表示名は BASE に出した「新しい商品名」。
 * 価格・写真・item id は products.ts（baseUrl の末尾）から取る。
 * モックの並びは ¥770 / ¥880 / ¥1,980 / ¥3,980。
 * ¥1,980 は六角鉢セット「3つの六角形」（159039931）。
 * 同じ金額の2本セット（162185287）は在庫0のためカードにしない。
 */
export const LINEUP: { slug: string; badge: string }[] = [
  { slug: "hex2", badge: "定番" },
  { slug: "hex3", badge: "人気" },
  { slug: "hexpot-set", badge: "鉢・受け皿・支柱" },
  { slug: "noboribo", badge: "NEW" },
];

export type LineupCard = {
  slug: string;
  badge: string;
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
  const displayName = LP_PRODUCT_NAMES[item.slug];
  if (!displayName) throw new Error(`new product name missing: ${item.slug}`);
  const itemId = baseItemId(product.baseUrl);
  return {
    slug: item.slug,
    badge: item.badge,
    displayName,
    price: product.price,
    priceLabel: `${yen(product.price)}（税込）`,
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
