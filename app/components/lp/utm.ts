/** トップの購入リンク。計測は zukeplants_guide（商品ページ・ガイド）と分ける。 */
export const LP_UTM_SOURCE = "zukeplants_lp";

export type LpUtmContent = "fv" | "lineup" | "final" | "sticky" | "finder";

export function baseItemId(baseUrl: string): string {
  const id = baseUrl.match(/\/items\/(\d+)/)?.[1];
  if (!id) throw new Error(`BASE item id not found in ${baseUrl}`);
  return id;
}

export function lpShopUrl(content: LpUtmContent, itemId?: string): string {
  const path = itemId ? `/items/${itemId}` : "";
  return `https://shop.zukeplants.com${path}?utm_source=${LP_UTM_SOURCE}&utm_content=${content}`;
}
