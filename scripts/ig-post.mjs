#!/usr/bin/env node
// ZUKE公式Instagramへの投稿スクリプト（IG Graph API, 2段階: メディア作成→公開）
// 必須の環境変数（.env.local または shell export）:
//   IG_USER_ID      Instagramビジネスアカウント(連携したFacebookページ経由)のID
//   IG_ACCESS_TOKEN 長期アクセストークン（Meta for Developersで発行）
//
// 使い方:
//   node scripts/ig-post.mjs --image-url "https://www.zukeplants.com/products/xxx.jpg" --caption "キャプション本文"
//   node scripts/ig-post.mjs --video-url "https://.../reel.mp4" --caption "..." --reel
//
// 画像/動画は公開URLである必要がある（zuke-siteのpublic配下 or BASEの商品画像URLなどを使う）。

const API_VERSION = "v21.0";

function parseArgs(argv) {
  const out = { reel: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--image-url") out.imageUrl = argv[++i];
    else if (a === "--video-url") out.videoUrl = argv[++i];
    else if (a === "--caption") out.caption = argv[++i];
    else if (a === "--reel") out.reel = true;
    else throw new Error(`不明な引数: ${a}`);
  }
  return out;
}

async function callGraphApi(path, params) {
  const url = new URL(`https://graph.facebook.com/${API_VERSION}/${path}`);
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(params),
  });
  const json = await res.json();
  if (!res.ok || json.error) {
    throw new Error(`Graph API error: ${JSON.stringify(json.error ?? json)}`);
  }
  return json;
}

async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function waitUntilReady(creationId, accessToken) {
  for (let i = 0; i < 20; i++) {
    const url = new URL(`https://graph.facebook.com/${API_VERSION}/${creationId}`);
    url.searchParams.set("fields", "status_code");
    url.searchParams.set("access_token", accessToken);
    const res = await fetch(url);
    const json = await res.json();
    if (json.status_code === "FINISHED") return;
    if (json.status_code === "ERROR") throw new Error("メディア処理エラー(status_code=ERROR)");
    await sleep(3000);
  }
  throw new Error("メディア処理がタイムアウトしました");
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const igUserId = process.env.IG_USER_ID;
  const accessToken = process.env.IG_ACCESS_TOKEN;

  if (!igUserId || !accessToken) {
    throw new Error(
      "IG_USER_ID / IG_ACCESS_TOKEN が未設定です（Facebookページ×IGビジネスアカウント連携とMeta for Developersでのアプリ作成・長期アクセストークン発行が先に必要）"
    );
  }
  if (!args.caption) throw new Error("--caption は必須です");
  if (!args.imageUrl && !args.videoUrl) throw new Error("--image-url か --video-url のどちらかが必須です");

  const createParams = { caption: args.caption, access_token: accessToken };
  if (args.videoUrl) {
    createParams.media_type = args.reel ? "REELS" : "VIDEO";
    createParams.video_url = args.videoUrl;
  } else {
    createParams.image_url = args.imageUrl;
  }

  console.log("メディアコンテナを作成中...");
  const created = await callGraphApi(`${igUserId}/media`, createParams);
  const creationId = created.id;
  console.log(`creation_id: ${creationId}`);

  if (args.videoUrl) {
    console.log("動画の処理完了を待機中...");
    await waitUntilReady(creationId, accessToken);
  }

  console.log("公開中...");
  const published = await callGraphApi(`${igUserId}/media_publish`, {
    creation_id: creationId,
    access_token: accessToken,
  });
  console.log("投稿完了:", published);
}

main().catch((err) => {
  console.error("投稿失敗:", err.message);
  process.exit(1);
});
