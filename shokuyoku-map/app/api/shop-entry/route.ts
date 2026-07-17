import { NextResponse } from "next/server";

// 園芸店からの掲載情報を受け取り、Google Apps Script(Webアプリ)へ転送する。
// Apps Script 側でスプレッドシートへの追記と、写真の Google ドライブ保存を行う。
//
// 環境変数:
//   GOOGLE_APPS_SCRIPT_URL … Apps Script WebアプリのデプロイURL(必須)
//   ENTRY_SHARED_SECRET     … Apps Script と共有する簡易トークン(任意・推奨)
//
// GOOGLE_APPS_SCRIPT_URL が未設定の場合は「バックエンド未設定」として
// delivered:false を返す（フォームの動作確認は可能／データは保存されない）。

export const runtime = "nodejs";

type IncomingImage = { name: string; type: string; dataUrl: string };

type Payload = {
  shopName?: string;
  location?: string;
  listingStatus?: string;
  ownerName?: string;
  email?: string;
  comment?: string;
  note?: string;
  flyer?: string;
  appUse?: boolean;
  shopPhotos?: IncomingImage[];
  ownerPhoto?: IncomingImage | null;
};

const MAX_TOTAL_BYTES = 20 * 1024 * 1024; // 全画像合計の上限(圧縮後・base64概算)
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// 既定の送信先(Apps Script Webアプリ)。環境変数 GOOGLE_APPS_SCRIPT_URL があればそちらを優先。
const DEFAULT_APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxa3PvKhGapxW8C0NxZ8D_6Lsu-ltPLfbIu5iQOZ_OOKjeeJ6XY0UVh8l27uidxPRHn/exec";

function approxBytes(images: IncomingImage[]): number {
  return images.reduce((sum, img) => {
    const base64 = img.dataUrl.split(",")[1] ?? "";
    return sum + Math.floor((base64.length * 3) / 4);
  }, 0);
}

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "リクエストの形式が正しくありません。" }, { status: 400 });
  }

  // --- サーバー側バリデーション(クライアントを信用しない) ---
  const shopName = (body.shopName ?? "").trim();
  const location = (body.location ?? "").trim();
  const ownerName = (body.ownerName ?? "").trim();
  const email = (body.email ?? "").trim();
  const flyer = (body.flyer ?? "").trim();

  if (!shopName || !location || !ownerName || !email || !flyer) {
    return NextResponse.json({ ok: false, message: "必須項目が入力されていません。" }, { status: 400 });
  }
  if (!emailPattern.test(email)) {
    return NextResponse.json({ ok: false, message: "メールアドレスの形式が正しくありません。" }, { status: 400 });
  }

  const shopPhotos = Array.isArray(body.shopPhotos) ? body.shopPhotos.slice(0, 5) : [];
  const ownerPhoto = body.ownerPhoto ?? null;
  const allImages = [...shopPhotos, ...(ownerPhoto ? [ownerPhoto] : [])].filter(
    (img): img is IncomingImage => !!img && typeof img.dataUrl === "string" && img.dataUrl.startsWith("data:image/"),
  );
  if (approxBytes(allImages) > MAX_TOTAL_BYTES) {
    return NextResponse.json(
      { ok: false, message: "画像の合計サイズが大きすぎます。枚数を減らしてお試しください。" },
      { status: 413 },
    );
  }

  const record = {
    shopName,
    location,
    listingStatus: body.listingStatus ?? "unknown",
    ownerName,
    email,
    comment: (body.comment ?? "").trim(),
    note: (body.note ?? "").trim(),
    flyer,
    appUse: body.appUse === true,
    shopPhotos,
    ownerPhoto,
  };

  const endpoint = process.env.GOOGLE_APPS_SCRIPT_URL || DEFAULT_APPS_SCRIPT_URL;
  if (!endpoint) {
    // バックエンド未設定でもフォーム自体の動作は確認できるようにする。
    console.warn(
      "[shop-entry] GOOGLE_APPS_SCRIPT_URL が未設定のため、データは保存されていません。" +
        ` 受信: ${shopName} / ${location} / ${email} / 画像 ${allImages.length} 枚`,
    );
    return NextResponse.json({ ok: true, delivered: false });
  }

  // --- Google Apps Script へ転送 ---
  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...record, secret: process.env.ENTRY_SHARED_SECRET ?? "" }),
      // Apps Script はリダイレクトを返すことがあるため follow のまま
      redirect: "follow",
    });

    // Apps Script はエラー時もHTTP 200でHTMLやok:falseを返すことがあるため、
    // ステータスだけでなく本文が {ok:true} のJSONであることまで確認する。
    const text = await res.text();
    let gasResult: { ok?: boolean; message?: string } | null = null;
    try {
      gasResult = JSON.parse(text);
    } catch {
      gasResult = null;
    }

    if (!res.ok || !gasResult || gasResult.ok !== true) {
      const hint = (gasResult?.message ?? text).slice(0, 200).replace(/\s+/g, " ");
      console.error(`[shop-entry] Apps Script エラー: status=${res.status} body=${hint}`);
      return NextResponse.json(
        { ok: false, message: `送信先の処理でエラーが発生しました。管理者向け情報: ${hint}` },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true, delivered: true });
  } catch (err) {
    console.error("[shop-entry] Apps Script への転送に失敗:", err);
    return NextResponse.json(
      { ok: false, message: "送信に失敗しました。ネットワーク状況をご確認のうえ再度お試しください。" },
      { status: 502 },
    );
  }
}
