import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import { bindItemCampaigns, campaignFromSlug, shopItemUrl, withUtm } from "./shopUrl.ts";

const productsSrc = fs.readFileSync(new URL("./products.ts", import.meta.url), "utf8");

function catalog() {
  const pairs = [];
  const re = /^    slug: "([^"]+)",[\s\S]*?^    baseUrl: `\$\{SHOP\}\/items\/(\d+)`,/gm;
  for (const match of productsSrc.matchAll(re)) {
    pairs.push({ slug: match[1], baseUrl: `https://shop.zukeplants.com/items/${match[2]}`, itemId: match[2] });
  }
  return pairs;
}

// 商品ページの slug。ハイフンだけアンダースコアにする（カテゴリ名 pole / extension は使わない）。
const CAMPAIGN = {
  hex5: "hex5",
  hex3: "hex3",
  hex2: "hex2",
  uneune: "uneune",
  "hexpot-set": "hexpot_set",
  "hexpot-set2": "hexpot_set2",
  "hex-set-2pcs": "hex_set_2pcs",
  noboribo: "noboribo",
  hexhanging: "hexhanging",
  hexwallplate: "hexwallplate",
  hexwallpot: "hexwallpot",
  "hexwall-set": "hexwall_set",
  soilstick: "soilstick",
  scoop: "scoop",
  hexpot: "hexpot",
  "marupot-stand": "marupot_stand",
  pole3pla: "pole3pla",
  pole2pla: "pole2pla",
  pole1pla: "pole1pla",
  hexparts: "hexparts",
  hexclip5: "hexclip5",
};

test("products.ts binds the catalog into the helper", () => {
  assert.match(productsSrc, /bindItemCampaigns\(PRODUCTS\)/);
  const items = catalog();
  assert.deepEqual(items.map((p) => p.slug).sort(), Object.keys(CAMPAIGN).sort());
  bindItemCampaigns(items);
});

test("item links use the product slug as utm_campaign", () => {
  bindItemCampaigns(catalog());
  for (const product of catalog()) {
    const url = new URL(withUtm(product.baseUrl));
    assert.equal(url.origin, "https://shop.zukeplants.com");
    assert.equal(url.pathname, `/items/${product.itemId}`);
    assert.equal(url.searchParams.get("utm_source"), "zukeplants");
    assert.equal(url.searchParams.get("utm_medium"), "article");
    assert.equal(url.searchParams.get("utm_campaign"), CAMPAIGN[product.slug]);
    assert.equal(url.searchParams.get("utm_content"), null);
    assert.equal(campaignFromSlug(product.slug), CAMPAIGN[product.slug]);
  }
});

test("campaign is never a category name", () => {
  for (const campaign of Object.values(CAMPAIGN)) {
    assert.notEqual(campaign, "pole");
    assert.notEqual(campaign, "extension");
    assert.match(campaign, /^[a-z0-9_]+$/);
  }
});

test("shop top, collection, and unmapped items use always", () => {
  bindItemCampaigns(catalog());
  for (const href of [
    "https://shop.zukeplants.com",
    "https://shop.zukeplants.com/",
    "https://shop.zukeplants.com/privacy",
    "https://shop.zukeplants.com/law",
    "https://shop.zukeplants.com/contact",
    "https://shop.zukeplants.com/collections/iron",
  ]) {
    const url = new URL(withUtm(href));
    assert.equal(url.searchParams.get("utm_campaign"), "always");
    assert.equal(url.searchParams.get("utm_source"), "zukeplants");
    assert.equal(url.searchParams.get("utm_medium"), "article");
  }
  const unknown = new URL(withUtm("https://shop.zukeplants.com/items/999"));
  assert.equal(unknown.pathname, "/items/999");
  assert.equal(unknown.searchParams.get("utm_campaign"), "always");
});

test("legacy host is rewritten and the item id stays", () => {
  bindItemCampaigns(catalog());
  const url = new URL(withUtm("http://zukeplants.base.shop/items/117375069/"));
  assert.equal(url.href, "https://shop.zukeplants.com/items/117375069?utm_source=zukeplants&utm_medium=article&utm_campaign=hex5");
});

test("existing utm_content is kept and old utm_source is replaced", () => {
  bindItemCampaigns(catalog());
  const kept = new URL(withUtm("https://shop.zukeplants.com/items/159039931?utm_source=zukeplants_guide&utm_content=altpick_hexpot-set"));
  assert.equal(kept.searchParams.get("utm_source"), "zukeplants");
  assert.equal(kept.searchParams.get("utm_campaign"), "hexpot_set");
  assert.equal(kept.searchParams.get("utm_content"), "altpick_hexpot-set");
  assert.equal(kept.searchParams.getAll("utm_source").length, 1);

  const explicit = new URL(withUtm("https://shop.zukeplants.com/items/124680568", "finder"));
  assert.equal(explicit.searchParams.get("utm_content"), "finder");
  assert.equal(explicit.searchParams.get("utm_campaign"), "hex2");
});

test("from stays on the redirect URL and is not an invented utm", () => {
  bindItemCampaigns(catalog());
  const url = new URL(shopItemUrl("162757270", { from: "guide-taoreru", utmContent: "guide_sec1" }));
  assert.equal(
    url.href,
    "https://shop.zukeplants.com/items/162757270?from=guide-taoreru&utm_source=zukeplants&utm_medium=article&utm_campaign=noboribo&utm_content=guide_sec1",
  );
});

test("withUtm leaves non-shop URLs alone and is idempotent", () => {
  bindItemCampaigns(catalog());
  const other = "https://www.instagram.com/zuke.plantspole/";
  assert.equal(withUtm(other), other);
  const once = withUtm("https://shop.zukeplants.com/items/130117282", "guide");
  assert.equal(withUtm(once), once);
});

test("an item id shared by two slugs is always", () => {
  bindItemCampaigns([
    { slug: "hex2", baseUrl: "https://shop.zukeplants.com/items/1" },
    { slug: "hex3", baseUrl: "https://shop.zukeplants.com/items/1" },
  ]);
  const url = new URL(withUtm("https://shop.zukeplants.com/items/1"));
  assert.equal(url.searchParams.get("utm_campaign"), "always");
  bindItemCampaigns(catalog());
});
