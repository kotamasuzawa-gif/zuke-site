import { parseBaseItems, type BaseItem } from "@/app/lib/base-sync";

const ITEMS_URL = "https://apiv2.thebase.com/api/items";
const PAGE = 100;

export type FreshCatalog =
  | { status: "ok"; items: Map<string, BaseItem>; fetchedAt: string }
  | { status: "unauthorized" }
  | { status: "error"; message: string };

type FetchInit = RequestInit & { next?: { revalidate?: number; tags?: string[] } };

let lastGood: Map<string, BaseItem> | null = null;
let loggedFallback = false;

function logFallback(message: string) {
  if (loggedFallback) return;
  loggedFallback = true;
  console.log(`BASE_CATALOG_FALLBACK ${message}`);
}

async function fetchPage(token: string, offset: number, init: FetchInit): Promise<{ status: number; body: unknown }> {
  const res = await fetch(`${ITEMS_URL}?limit=${PAGE}&offset=${offset}`, {
    ...init,
    headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
  });
  if (res.status === 401) return { status: 401, body: null };
  if (!res.ok) return { status: res.status, body: null };
  try {
    return { status: 200, body: await res.json() };
  } catch {
    return { status: 502, body: null };
  }
}

/** 成功した応答だけ Map にする。401 は unauthorized。途中失敗は error（部分結果は使わない）。 */
export async function fetchBaseCatalog(token: string, init: FetchInit): Promise<FreshCatalog> {
  const all: BaseItem[] = [];
  for (let offset = 0; offset < PAGE * 20; offset += PAGE) {
    let page: { status: number; body: unknown };
    try {
      page = await fetchPage(token, offset, init);
    } catch (e) {
      return { status: "error", message: e instanceof Error ? e.name : "fetch-failed" };
    }
    if (page.status === 401) return { status: "unauthorized" };
    if (page.status !== 200) return { status: "error", message: `http-${page.status}` };
    const parsed = parseBaseItems(page.body);
    if (!parsed) return { status: "error", message: "bad-json" };
    all.push(...parsed);
    if (parsed.length < PAGE) break;
  }
  return { status: "ok", items: new Map(all.map((item) => [item.id, item])), fetchedAt: new Date().toISOString() };
}

/** 日次点検用。キャッシュを読まず、401 をそのまま返す。 */
export async function getFreshCatalog(): Promise<FreshCatalog> {
  const token = process.env.BASE_API_TOKEN;
  if (!token) return { status: "error", message: "no-token" };
  return fetchBaseCatalog(token, { cache: "no-store" });
}

export type CachedCatalog = {
  status: "ok" | "unauthorized" | "error";
  items: Map<string, BaseItem> | null;
  stale: boolean;
};

/**
 * 画面用。30 分キャッシュ。失敗時は同じインスタンスの直前成功を返し、無ければ null。
 * null のとき呼び出し側は products.ts を使う。401 を在庫0にはしない。
 */
export async function getCachedCatalog(): Promise<CachedCatalog> {
  const token = process.env.BASE_API_TOKEN;
  if (!token) return { status: "error", items: null, stale: false };
  const fresh = await fetchBaseCatalog(token, { next: { revalidate: 1800, tags: ["base-items"] } });
  if (fresh.status === "ok") {
    lastGood = fresh.items;
    return { status: "ok", items: fresh.items, stale: false };
  }
  if (lastGood) {
    logFallback(`stale ${fresh.status}`);
    return { status: fresh.status, items: lastGood, stale: true };
  }
  logFallback(fresh.status === "unauthorized" ? "unauthorized" : fresh.status === "error" ? fresh.message : "error");
  return { status: fresh.status === "unauthorized" ? "unauthorized" : "error", items: null, stale: false };
}
