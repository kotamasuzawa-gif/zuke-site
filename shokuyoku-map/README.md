# 植欲マップ — 園芸店向け掲載情報フォーム

zuke-site リポジトリ内の独立アプリ。Vercel では Root Directory を `shokuyoku-map` に
設定した別プロジェクトとしてデプロイする（本体の zuke-site とはサイト分離）。

- フォームはトップページ (`/`)
- 送信は `/api/shop-entry` → Google Apps Script → スプレッドシート＋ドライブ
- Apps Script 本体コードはリポジトリルートの `gas.js`（配信元URLが Apps Script の
  ローダーに焼き込まれているため移動しないこと）
- セットアップ手順: リポジトリルートの `docs/entry-form-setup.md`
