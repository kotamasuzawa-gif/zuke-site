/** トップの購入リンク。計測は zukeplants_guide（商品ページ・ガイド）と分ける。 */
export const LP_UTM_SOURCE = "zukeplants_lp";

export type LpUtmContent = "fv" | "lineup" | "final" | "sticky";

export function lpShopUrl(content: LpUtmContent, itemId?: string): string {
  const path = itemId ? `/items/${itemId}` : "";
  return `https://shop.zukeplants.com${path}?utm_source=${LP_UTM_SOURCE}&utm_content=${content}`;
}
