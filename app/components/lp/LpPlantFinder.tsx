"use client";

import PlantFinder from "@/app/components/PlantFinder";
import { lpProductName } from "./names";
import { baseItemId, lpShopUrl } from "./utm";

/** LP だけ購入リンクと商品名を差し替える。他ページの <PlantFinder /> は既定のまま。 */
export function LpPlantFinder() {
  return (
    <PlantFinder
      purchaseUrl={(baseUrl) => lpShopUrl("finder", baseItemId(baseUrl))}
      productName={lpProductName}
    />
  );
}
