// BASE API v2 の商品一覧を、サイトの商品へ重ねるための純粋な判定。
// 通信は app/lib/base-catalog.ts。ここはテストできる形だけを置く。

export type SyncStage = 0 | 1 | 2 | 3;

export type SyncSurface = "pdp" | "listing";

/** 画面に出る商品のうち、同期で上書きしてよい項目。 */
export type SyncProduct = {
  slug: string;
  name: string;
  fullName: string;
  price: number;
  baseUrl: string;
  soldOut?: boolean;
  forceSoldOut?: boolean;
  stockNote?: string;
  soldOutAlt?: { href: string; label: string; note?: string };
};

export type BaseVariation = { name: string; stock: number };

export type BaseItem = {
  id: string;
  name: string;
  price: number | null;
  stock: number;
  visible: boolean;
  salesStatus: string;
  variations: BaseVariation[];
};

export type CatalogView = {
  status: "ok" | "unauthorized" | "error";
  /** 使えるスナップショット。無いときは null（画面は products.ts のまま）。 */
  items: Map<string, BaseItem> | null;
};

const ON_SALE = "item_now_on_sale";

export function parseSyncStage(raw: string | undefined | null): SyncStage {
  if (raw === "1" || raw === "2" || raw === "3") return Number(raw) as SyncStage;
  return 0;
}

export function itemIdFromBaseUrl(url: string): string | null {
  return url.match(/\/items\/(\d+)$/)?.[1] ?? null;
}

export function surfaceEnabled(stage: SyncStage, surface: SyncSurface): boolean {
  return surface === "pdp" ? stage >= 2 : stage >= 3;
}

/** 種類ごとの在庫から、本数を出さない但し書きを作る。全色ある、または全色無いときは出さない。 */
export function variationStockNote(variations: BaseVariation[]): string | undefined {
  const named = variations.filter((v) => v.name.trim().length > 0);
  const available = named.filter((v) => v.stock > 0);
  const unavailable = named.filter((v) => v.stock <= 0);
  if (available.length === 0 || unavailable.length === 0) return undefined;
  return `いま${available.map((v) => v.name).join("・")}のみ（${unavailable.map((v) => v.name).join("・")}は品切れ）`;
}

/** BASE 上で今買えるか。forceSoldOut はここでは見ない（LP 側の上書きは別）。 */
export function basePurchasable(item: BaseItem): boolean {
  if (!item.visible) return false;
  if (item.salesStatus !== ON_SALE) return false;
  if (item.stock <= 0) return false;
  if (item.variations.length > 0 && item.variations.every((v) => v.stock <= 0)) return false;
  return true;
}

function yen(n: number): string {
  return `¥${n.toLocaleString("ja-JP")}`;
}

function soldOutLink<T extends SyncProduct>(product: T, peers: Map<string, T>): NonNullable<T["soldOutAlt"]> {
  const href = product.soldOutAlt?.href ?? "";
  const slug = href.match(/^\/products\/([a-z0-9-]+)$/)?.[1];
  const target = slug ? peers.get(slug) : undefined;
  if (target && !target.soldOut) {
    return { href: `/products/${target.slug}`, label: `${target.name} ${yen(target.price)} を見る` };
  }
  return { href: "/products", label: "商品一覧を見る" };
}

/**
 * カタログが取れた商品だけ上書きする。一覧に無い商品は元のオブジェクトのまま。
 * 通信失敗で items が null のときは呼ばない（呼び出し側が products.ts を返す）。
 */
export function overlayCatalog<T extends SyncProduct>(products: readonly T[], items: Map<string, BaseItem>): T[] {
  const first = products.map((product) => {
    const id = itemIdFromBaseUrl(product.baseUrl);
    const item = id ? items.get(id) : undefined;
    if (!item) return product;
    const purchasable = product.forceSoldOut !== true && basePurchasable(item);
    const next: T = {
      ...product,
      fullName: item.name.trim() ? item.name : product.fullName,
      price: typeof item.price === "number" ? item.price : product.price,
      soldOut: purchasable ? undefined : true,
      stockNote: purchasable ? variationStockNote(item.variations) : undefined,
    };
    return next;
  });
  const peers = new Map(first.map((p) => [p.slug, p]));
  return first.map((product, i) => {
    const original = products[i];
    if (product === original || !product.soldOut) return product;
    return { ...product, soldOutAlt: soldOutLink(original, peers) };
  });
}

/** 段階とトークンとカタログから、その画面が使う商品配列を決める。失敗時は元の配列を返す。 */
export function resolveProducts<T extends SyncProduct>(
  products: readonly T[],
  stage: SyncStage,
  tokenPresent: boolean,
  surface: SyncSurface,
  catalog: CatalogView,
): readonly T[] {
  if (!tokenPresent || !surfaceEnabled(stage, surface)) return products;
  if (!catalog.items) return products;
  return overlayCatalog(products, catalog.items);
}

export type OverrideRow = {
  slug: string;
  itemId: string | null;
  forceSoldOut: true;
  basePurchasable: boolean | null;
  baseStock: number | null;
  baseName: string | null;
};

export type MismatchReport = {
  ok: boolean;
  checked: boolean;
  stage: SyncStage;
  status: "ok" | "unauthorized" | "error" | "skipped";
  reason?: string;
  note?: string;
  overrides: OverrideRow[];
  mismatches: { slug: string; itemId: string; fields: string[] }[];
  missingOnBase: { slug: string; itemId: string | null }[];
  missingOnSite: { itemId: string; name: string }[];
};

function overrideRows<T extends SyncProduct>(products: readonly T[], items: Map<string, BaseItem> | null, known: boolean): OverrideRow[] {
  return products.filter((p) => p.forceSoldOut === true).map((p) => {
    const itemId = itemIdFromBaseUrl(p.baseUrl);
    const item = itemId && items ? items.get(itemId) : undefined;
    return {
      slug: p.slug,
      itemId,
      forceSoldOut: true as const,
      basePurchasable: known && item ? basePurchasable(item) : null,
      baseStock: known && item ? item.stock : null,
      baseName: known && item ? item.name : null,
    };
  });
}

/** 日次点検。401 や通信失敗のときは在庫0とみなさず、overrides だけは必ず載せる。 */
export function buildMismatchReport<T extends SyncProduct>(
  products: readonly T[],
  stage: SyncStage,
  fresh: { status: "ok"; items: Map<string, BaseItem> } | { status: "unauthorized" } | { status: "error"; message: string } | { status: "skipped"; reason: string },
): MismatchReport {
  if (fresh.status === "skipped") {
    return {
      ok: true,
      checked: false,
      stage,
      status: "skipped",
      reason: fresh.reason,
      overrides: overrideRows(products, null, false),
      mismatches: [],
      missingOnBase: [],
      missingOnSite: [],
    };
  }
  if (fresh.status === "unauthorized") {
    return {
      ok: false,
      checked: true,
      stage,
      status: "unauthorized",
      note: "401 は在庫0として扱いません。画面は直前の成功結果か products.ts のままです。",
      overrides: overrideRows(products, null, false),
      mismatches: [],
      missingOnBase: [],
      missingOnSite: [],
    };
  }
  if (fresh.status === "error") {
    return {
      ok: false,
      checked: true,
      stage,
      status: "error",
      reason: fresh.message,
      note: "取得失敗では全商品を SOLD OUT にしません。",
      overrides: overrideRows(products, null, false),
      mismatches: [],
      missingOnBase: [],
      missingOnSite: [],
    };
  }

  const items = fresh.items;
  const mismatches: MismatchReport["mismatches"] = [];
  const missingOnBase: MismatchReport["missingOnBase"] = [];
  const siteIds = new Set<string>();

  for (const product of products) {
    const itemId = itemIdFromBaseUrl(product.baseUrl);
    if (itemId) siteIds.add(itemId);
    const item = itemId ? items.get(itemId) : undefined;
    if (!item) {
      missingOnBase.push({ slug: product.slug, itemId });
      continue;
    }
    const fields: string[] = [];
    if (typeof item.price === "number" && item.price !== product.price) fields.push("price");
    if (item.name.trim() && item.name !== product.fullName) fields.push("fullName");
    const apiSoldOut = !basePurchasable(item);
    if (product.forceSoldOut !== true && Boolean(product.soldOut) !== apiSoldOut) fields.push("soldOut");
    const note = variationStockNote(item.variations);
    if ((product.stockNote ?? undefined) !== note && product.forceSoldOut !== true && !apiSoldOut) fields.push("stockNote");
    if (fields.length > 0 && itemId) mismatches.push({ slug: product.slug, itemId, fields });
  }

  const missingOnSite: MismatchReport["missingOnSite"] = [];
  for (const item of items.values()) {
    if (!siteIds.has(item.id)) missingOnSite.push({ itemId: item.id, name: item.name });
  }

  return {
    ok: true,
    checked: true,
    stage,
    status: "ok",
    overrides: overrideRows(products, items, true),
    mismatches,
    missingOnBase,
    missingOnSite,
  };
}

/** GET /api/items の JSON。形が崩れていたら null（在庫0の配列にはしない）。 */
export function parseBaseItems(body: unknown): BaseItem[] | null {
  const list = Array.isArray(body)
    ? body
    : body && typeof body === "object" && Array.isArray((body as { items?: unknown }).items)
      ? (body as { items: unknown[] }).items
      : null;
  if (!list) return null;
  const items: BaseItem[] = [];
  for (const raw of list) {
    if (!raw || typeof raw !== "object") return null;
    const o = raw as Record<string, unknown>;
    const id = typeof o.id === "number" || typeof o.id === "string" ? String(o.id) : "";
    if (!/^\d+$/.test(id)) return null;
    if (typeof o.name !== "string" || typeof o.stock !== "number" || typeof o.visible !== "boolean" || typeof o.sales_status !== "string") {
      continue;
    }
    const variations: BaseVariation[] = [];
    if (Array.isArray(o.variations)) {
      for (const v of o.variations) {
        if (!v || typeof v !== "object") continue;
        const vr = v as Record<string, unknown>;
        if (typeof vr.stock !== "number") continue;
        variations.push({ name: typeof vr.name === "string" ? vr.name : "", stock: vr.stock });
      }
    }
    const price = typeof o.price === "number" ? o.price : null;
    items.push({
      id,
      name: o.name,
      price,
      stock: o.stock,
      visible: o.visible,
      salesStatus: o.sales_status,
      variations,
    });
  }
  if (list.length > 0 && items.length === 0) return null;
  return items;
}
