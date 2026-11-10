// BASE 本店へのリンクに付ける UTM。購入リンクはここを通す。
// JSON-LD の sameAs / Offer.url は正規 URL なので、この関数には渡さない。
//
// utm_source=zukeplants
// utm_medium=article
// utm_campaign=商品ページ /products/<slug> の slug（ハイフンは _ ）
// ショップトップ・コレクション・商品ページに対応しない item は utm_campaign=always
// カテゴリ名（pole / extension など）は campaign にしない。

export const SHOP = "https://shop.zukeplants.com";

const SHOP_HOST = "shop.zukeplants.com";
const LEGACY_HOST = "zukeplants.base.shop";
const ITEM_PATH = /^\/items\/(\d+)\/?$/;
const CAMPAIGN_VALUE = /^[a-z0-9_]+$/;

const UTM_SOURCE = "zukeplants";
const UTM_MEDIUM = "article";
const UTM_CAMPAIGN_DEFAULT = "always";

let itemCampaign = new Map<string, string>();

/** 商品ページの slug。値の規則に合わせ、ハイフンだけ `_` にする。 */
export function campaignFromSlug(slug: string): string {
  const campaign = slug.toLowerCase().replace(/-/g, "_");
  return CAMPAIGN_VALUE.test(campaign) ? campaign : UTM_CAMPAIGN_DEFAULT;
}

export function itemIdFromShopUrl(url: string): string | undefined {
  try {
    return new URL(url).pathname.match(ITEM_PATH)?.[1];
  } catch {
    return undefined;
  }
}

/**
 * products.ts の商品を item_id → utm_campaign に束ねる。
 * 同じ item_id が別 slug にも付いているときは always（対応を決められない）。
 */
export function bindItemCampaigns(products: { slug: string; baseUrl: string }[]): void {
  const next = new Map<string, string>();
  const slugByItem = new Map<string, string>();
  for (const product of products) {
    const itemId = itemIdFromShopUrl(product.baseUrl);
    if (!itemId) continue;
    const previous = slugByItem.get(itemId);
    if (previous === undefined) {
      slugByItem.set(itemId, product.slug);
      next.set(itemId, campaignFromSlug(product.slug));
      continue;
    }
    if (previous !== product.slug) {
      slugByItem.set(itemId, "");
      next.set(itemId, UTM_CAMPAIGN_DEFAULT);
    }
  }
  itemCampaign = next;
}

function campaignForUrl(url: URL): string {
  const itemId = url.pathname.match(ITEM_PATH)?.[1];
  if (!itemId) return UTM_CAMPAIGN_DEFAULT;
  return itemCampaign.get(itemId) ?? UTM_CAMPAIGN_DEFAULT;
}

/** 既存の utm_content は残す。第2引数があるときはそれを使う（ボタン位置）。 */
export function withUtm(url: string, utmContent?: string): string {
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return url;
  }
  const host = parsed.hostname.toLowerCase();
  if (host !== SHOP_HOST && host !== LEGACY_HOST) return url;

  parsed.protocol = "https:";
  parsed.hostname = SHOP_HOST;
  const itemId = parsed.pathname.match(ITEM_PATH)?.[1];
  if (itemId) parsed.pathname = `/items/${itemId}`;

  const content = utmContent ?? parsed.searchParams.get("utm_content") ?? undefined;
  parsed.searchParams.delete("utm_source");
  parsed.searchParams.delete("utm_medium");
  parsed.searchParams.delete("utm_campaign");
  parsed.searchParams.delete("utm_content");
  parsed.searchParams.set("utm_source", UTM_SOURCE);
  parsed.searchParams.set("utm_medium", UTM_MEDIUM);
  parsed.searchParams.set("utm_campaign", campaignForUrl(parsed));
  if (content) parsed.searchParams.set("utm_content", content);
  return parsed.toString();
}

/** /go/base の 302 先。from は計測用のまま残し、UTM は withUtm が付ける。 */
export function shopItemUrl(
  itemId: string,
  extras?: { from?: string | null; utmContent?: string | null },
): string {
  const url = new URL(`${SHOP}/items/${itemId}`);
  if (extras?.from) url.searchParams.set("from", extras.from);
  return withUtm(url.toString(), extras?.utmContent ?? undefined);
}
