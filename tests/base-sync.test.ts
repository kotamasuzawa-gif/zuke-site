import assert from "node:assert/strict";
import test from "node:test";
import {
  basePurchasable,
  buildMismatchReport,
  itemIdFromBaseUrl,
  overlayCatalog,
  parseBaseItems,
  parseSyncStage,
  resolveProducts,
  variationStockNote,
  type BaseItem,
  type SyncProduct,
} from "../app/lib/base-sync.ts";
import { homeFeaturedCards, PRODUCTS } from "../app/lib/products.ts";

const item = (patch: Partial<BaseItem> = {}): BaseItem => ({
  id: "117375069",
  name: "BASE名",
  price: 1500,
  stock: 40,
  visible: true,
  salesStatus: "item_now_on_sale",
  variations: [
    { name: "ブラック", stock: 20 },
    { name: "ホワイト", stock: 20 },
  ],
  ...patch,
});

const product = (patch: Partial<SyncProduct> = {}): SyncProduct => ({
  slug: "hex5",
  name: 'PLANTS POLE "5つの六角形"',
  fullName: "サイトの正式名称",
  price: 1320,
  baseUrl: "https://shop.zukeplants.com/items/117375069",
  soldOut: true,
  forceSoldOut: true,
  soldOutAlt: { href: "/products/noboribo", label: "古いラベル", note: "在庫ありと書いてある注記" },
  ...patch,
});

test("段階の既定は 0。不明な値も 0", () => {
  assert.equal(parseSyncStage(undefined), 0);
  assert.equal(parseSyncStage(""), 0);
  assert.equal(parseSyncStage("4"), 0);
  assert.equal(parseSyncStage("2"), 2);
});

test("トークンが無い、または段階が足りないときは配列をそのまま返す", () => {
  const products = [product({ forceSoldOut: false, soldOut: true })];
  const catalog = { status: "ok" as const, items: new Map([["117375069", item()]]) };
  assert.equal(resolveProducts(products, 3, false, "listing", catalog), products);
  assert.equal(resolveProducts(products, 0, true, "pdp", catalog), products);
  assert.equal(resolveProducts(products, 2, true, "listing", catalog), products);
  assert.equal(resolveProducts(products, 1, true, "pdp", catalog), products);
});

test("401 や取得失敗では SOLD OUT を足さない", () => {
  const products = [product({ forceSoldOut: false, soldOut: false, slug: "hex2" })];
  assert.equal(resolveProducts(products, 3, true, "listing", { status: "unauthorized", items: null }), products);
  assert.equal(resolveProducts(products, 3, true, "listing", { status: "error", items: null }), products);
});

test("forceSoldOut は BASE に在庫があっても LP を売り切れにする", () => {
  const peer = product({
    slug: "noboribo",
    name: "上り棒セット",
    price: 3980,
    baseUrl: "https://shop.zukeplants.com/items/162757270",
    soldOut: false,
    forceSoldOut: false,
    soldOutAlt: undefined,
  });
  const items = new Map<string, BaseItem>([
    ["117375069", item()],
    ["162757270", item({ id: "162757270", name: "上り棒", price: 3980, stock: 10 })],
  ]);
  const [hex5, noboribo] = overlayCatalog([product(), peer], items);
  assert.equal(hex5.soldOut, true);
  assert.equal(hex5.price, 1500);
  assert.equal(hex5.fullName, "BASE名");
  assert.equal(hex5.soldOutAlt?.href, "/products/noboribo");
  assert.equal(hex5.soldOutAlt?.note, undefined);
  assert.equal(noboribo.soldOut, undefined);
  assert.equal(noboribo.stockNote, undefined);
});

test("価格が null の商品はファイルの価格を残す。一覧に無い商品は触らない", () => {
  const kept = product({ slug: "hex2", baseUrl: "https://shop.zukeplants.com/items/124680568", forceSoldOut: false, soldOut: false, price: 770 });
  const [over, same] = overlayCatalog(
    [product({ forceSoldOut: false, soldOut: false }), kept],
    new Map([["117375069", item({ price: null, stock: 3 })]]),
  );
  assert.equal(over.price, 1320);
  assert.equal(over.soldOut, undefined);
  assert.equal(same, kept);
});

test("一部の色だけ在庫0なら売り切れにせず但し書きを出す", () => {
  const [p] = overlayCatalog(
    [product({ forceSoldOut: false, soldOut: false, stockNote: "古い但し書き" })],
    new Map([["117375069", item({ variations: [{ name: "ブラック", stock: 0 }, { name: "ホワイト", stock: 4 }], stock: 4 })]]),
  );
  assert.equal(p.soldOut, undefined);
  assert.equal(p.stockNote, "いまホワイトのみ（ブラックは品切れ）");
  assert.equal(variationStockNote([{ name: "ブラック", stock: 2 }, { name: "ホワイト", stock: 2 }]), undefined);
});

test("非公開・販売終了・在庫0は買えない", () => {
  assert.equal(basePurchasable(item({ visible: false })), false);
  assert.equal(basePurchasable(item({ salesStatus: "item_end_of_sale" })), false);
  assert.equal(basePurchasable(item({ stock: 0, variations: [{ name: "ブラック", stock: 0 }] })), false);
  assert.equal(basePurchasable(item()), true);
});

test("壊れた JSON は null。在庫0の一覧にはしない", () => {
  assert.equal(parseBaseItems({ nope: true }), null);
  assert.equal(parseBaseItems([{ id: "x" }]), null);
  const parsed = parseBaseItems([
    { id: 1, name: "A", price: 100, stock: 2, visible: true, sales_status: "item_now_on_sale", variations: [] },
  ]);
  assert.equal(parsed?.[0].id, "1");
  assert.equal(parsed?.[0].price, 100);
});

test("点検ログは上書き商品を載せ、401 では在庫を0にしない", () => {
  const products = [product(), product({ slug: "hex2", baseUrl: "https://shop.zukeplants.com/items/124680568", forceSoldOut: false, soldOut: false, price: 770, fullName: "別" })];
  const denied = buildMismatchReport(products, 1, { status: "unauthorized" });
  assert.equal(denied.status, "unauthorized");
  assert.equal(denied.overrides.length, 1);
  assert.equal(denied.overrides[0].slug, "hex5");
  assert.equal(denied.overrides[0].baseStock, null);
  assert.equal(denied.mismatches.length, 0);

  const items = new Map<string, BaseItem>([
    ["117375069", item({ stock: 40 })],
    ["124680568", item({ id: "124680568", name: "BASEの2つの六角形", price: 770, stock: 8 })],
    ["999", item({ id: "999", name: "6本セット" })],
  ]);
  const ok = buildMismatchReport(products, 1, { status: "ok", items });
  assert.equal(ok.overrides[0].basePurchasable, true);
  assert.equal(ok.overrides[0].baseStock, 40);
  assert.ok(ok.mismatches.some((m) => m.slug === "hex2" && m.fields.includes("fullName")));
  assert.ok(ok.missingOnSite.some((m) => m.itemId === "999"));
  assert.equal(ok.missingOnBase.some((m) => m.slug === "hex5"), false);
});

test("点検をしない段階でも、上書き商品の名前はログに残す", () => {
  const report = buildMismatchReport([product()], 0, { status: "skipped", reason: "stage-below-1" });
  assert.equal(report.checked, false);
  assert.equal(report.overrides[0]?.slug, "hex5");
  assert.equal(report.overrides[0]?.baseStock, null);
});

test("hex5 だけ forceSoldOut。ホームの8点は今は売り切れではない", () => {
  const forced = PRODUCTS.filter((p) => p.forceSoldOut);
  assert.deepEqual(forced.map((p) => p.slug), ["hex5"]);
  assert.equal(PRODUCTS.find((p) => p.slug === "hex5")?.soldOut, true);
  assert.equal(itemIdFromBaseUrl(PRODUCTS.find((p) => p.slug === "hex5")!.baseUrl), "117375069");
  const cards = homeFeaturedCards(PRODUCTS);
  assert.equal(cards.length, 8);
  assert.ok(cards.every((c) => c.soldOut === false && c.external && c.url.includes("utm_source=zukeplants_guide")));
});
