import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SHOP, PRODUCTS } from "@/app/lib/products";

// 2026-10-10 EC店長依頼(#7630): BASE の注文API(`/api/base-orders`)には流入元の項目が無く、
// UTM も BASE 側に残らないため「ガイド経由でBASEへ出ていったクリック数」を社内で数える手段が無かった。
// そこで購入リンクを自社ドメインの 302 中継に通し、クリック1回につきログ1行を残す。
// 読み方: `cd ~/zuke-site && vercel logs <本番URL> | grep BASECLICK`
//   （Hobby のランタイムログは直近分のみ。期間の累計は Vercel Web Analytics の有効化が前提
//     = outbox 2026-10-10 06:4x の承認待ち項目。クリック自体はこの中継で必ずログに出る）

/** 中継先は BASE 本店の商品だけ。products.ts に載っている item_id 以外は受け付けない（オープンリダイレクト防止） */
const ALLOWED_ITEM_IDS = new Set(
  PRODUCTS.map((p) => p.baseUrl.match(/\/items\/(\d+)$/)?.[1]).filter((v): v is string => !!v),
);

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

  const dest = new URL(`${SHOP}/items/${itemId}`);
  dest.searchParams.set("utm_source", "zukeplants_guide");
  if (content) dest.searchParams.set("utm_content", content);
  if (from) dest.searchParams.set("from", from);

  const ua = req.headers.get("user-agent") ?? "";
  // クローラ・OGPプレビューのアクセスはクリック数に混ぜない
  if (!BOT_UA.test(ua)) {
    console.log(
      `BASECLICK ${JSON.stringify({
        at: new Date().toISOString(),
        item: itemId,
        from: from ?? "",
        content: content ?? "",
        ref: req.headers.get("referer") ?? "",
      })}`,
    );
  }

  return NextResponse.redirect(dest.toString(), {
    status: 302,
    headers: { "cache-control": "no-store", "x-robots-tag": "noindex, nofollow" },
  });
}
