import { NextResponse, after } from "next/server";
import type { NextRequest } from "next/server";
import { SHOP, PRODUCTS } from "@/app/lib/products";
import { productsForSurface } from "@/app/lib/live-product";
import { itemIdFromBaseUrl } from "@/app/lib/base-sync";

// 2026-10-10 EC店長依頼(#7630): BASE の注文API(`/api/base-orders`)には流入元の項目が無く、
// UTM も BASE 側に残らないため「ガイド経由でBASEへ出ていったクリック数」を社内で数える手段が無かった。
// そこで購入リンクを自社ドメインの 302 中継に通し、クリック1回につきログ1行を残す。
// 読み方: `cd ~/zuke-site && vercel logs <本番URL> | grep BASECLICK`
//   （Hobby のランタイムログは直近分のみ。期間の累計は残らない）
//
// 2026-10-15 秘書(#10014): 累計を残すため、同じ1行をマイビジ `POST /api/base-clicks` にも送る。
// 集計の読み方: `GET /api/base-clicks?from=YYYY-MM-DD&to=YYYY-MM-DD`（マイビジのログイン必須）
//   → {total, by_content, by_from, by_item, by_date}
// 合言葉は Vercel の環境変数 MAIBIZ_CLICK_KEY。未設定なら送信ごと丸ごとスキップする（302 は壊さない）。

const MAIBIZ_CLICKS_URL = "https://inventory-app-production-660b.up.railway.app/api/base-clicks";

/** 中継先は BASE 本店の商品だけ。products.ts に載っている item_id 以外は受け付けない（オープンリダイレクト防止） */
const ALLOWED_ITEM_IDS = new Set(
  PRODUCTS.map((p) => itemIdFromBaseUrl(p.baseUrl)).filter((v): v is string => !!v),
);

// 2026-10-23 SEO(#12803 EC店長): 品切れの商品は BASE へ出さず、自社の商品ページへ送る。
// 2026-10-31: 段階2かつトークンがあるときは、同じ判定を BASE の在庫（と forceSoldOut）で行う。
// 段階0やトークン無しでは products.ts の soldOut のまま。

/** from / utm_content は自分で付けている値だけを通す（ログと転送先に任意文字列を混ぜない） */
const sanitizeTag = (v: string | null) => (v && /^[A-Za-z0-9_-]{1,40}$/.test(v) ? v : null);

const BOT_UA = /bot|crawler|spider|crawling|preview|facebookexternalhit|slurp|bingpreview|headless/i;

export async function GET(req: NextRequest, { params }: { params: Promise<{ itemId: string }> }) {
  const { itemId } = await params;

  // 不正な item_id はショップトップへ（404 を見せるより購入可能なページに着地させる）
  if (!ALLOWED_ITEM_IDS.has(itemId)) {
    return NextResponse.redirect(SHOP, { status: 302, headers: { "cache-control": "no-store" } });
  }

  const from = sanitizeTag(req.nextUrl.searchParams.get("from"));
  const content = sanitizeTag(req.nextUrl.searchParams.get("c"));

  const live = await productsForSurface("pdp");
  const match = live.find((p) => itemIdFromBaseUrl(p.baseUrl) === itemId);
  const soldOutSlug = match?.soldOut ? match.slug : undefined;
  const dest = soldOutSlug
    ? new URL(`/products/${soldOutSlug}`, req.nextUrl.origin)
    : new URL(`${SHOP}/items/${itemId}`);
  if (!soldOutSlug) {
    dest.searchParams.set("utm_source", "zukeplants_guide");
    if (content) dest.searchParams.set("utm_content", content);
    if (from) dest.searchParams.set("from", from);
  }

  const ua = req.headers.get("user-agent") ?? "";
  // クローラ・OGPプレビューのアクセスはクリック数に混ぜない
  if (!BOT_UA.test(ua)) {
    const click = {
      at: new Date().toISOString(),
      item: itemId,
      from: from ?? "",
      content: content ?? "",
      ref: req.headers.get("referer") ?? "",
    };
    console.log(`BASECLICK ${JSON.stringify(click)}`);

    const clickKey = process.env.MAIBIZ_CLICK_KEY;
    if (clickKey) {
      // 302 を待たせないよう、レスポンス後に送る（失敗してもクリック自体は上のログに残る）
      after(async () => {
        try {
          const res = await fetch(MAIBIZ_CLICKS_URL, {
            method: "POST",
            headers: { "content-type": "application/json", "x-zk-click-key": clickKey },
            body: JSON.stringify(click),
            cache: "no-store",
            signal: AbortSignal.timeout(3000),
          });
          // マイビジは未知のパスにもログイン画面(HTML・200)を返すので、JSON が返ったかまで見る
          const ct = res.headers.get("content-type") ?? "";
          if (!res.ok || !ct.includes("application/json")) {
            console.log(`BASECLICK_POST_FAIL status=${res.status} type=${ct} content=${click.content}`);
          }
        } catch (e) {
          console.log(`BASECLICK_POST_FAIL ${e instanceof Error ? e.name : "error"} content=${click.content}`);
        }
      });
    }
  }

  return NextResponse.redirect(dest.toString(), {
    status: 302,
    headers: { "cache-control": "no-store", "x-robots-tag": "noindex, nofollow" },
  });
}
