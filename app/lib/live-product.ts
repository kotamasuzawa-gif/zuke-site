import { cache } from "react";
import { getCachedCatalog } from "@/app/lib/base-catalog";
import { overlayCatalog, parseSyncStage, surfaceEnabled } from "@/app/lib/base-sync";
import { PRODUCTS, type Product } from "@/app/lib/products";

/**
 * 段階とトークンが許すときだけ BASE の価格・正式名称・在庫を重ねる。
 * それ以外、または取得できないときは PRODUCTS そのものを返す（今の表示のまま）。
 * pdp = 段階2（商品ページと /go/base）。listing = 段階3（一覧・コレクション・ホーム・ガイドのカード・about）。
 */
export const productsForSurface = cache(async (surface: "pdp" | "listing"): Promise<readonly Product[]> => {
  const stage = parseSyncStage(process.env.BASE_SYNC_STAGE);
  if (!process.env.BASE_API_TOKEN || !surfaceEnabled(stage, surface)) return PRODUCTS;
  const catalog = await getCachedCatalog();
  if (!catalog.items) return PRODUCTS;
  return overlayCatalog(PRODUCTS, catalog.items);
});
