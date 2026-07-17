# 植欲マップ 掲載情報フォームのセットアップ

園芸店向けの入力フォーム（`/entry`）と、その送信先（Google スプレッドシート＋Google ドライブ）の接続手順です。

## 構成

```
園芸店（ブラウザ）
   │  写真はブラウザ内で自動圧縮 → base64
   ▼
/entry フォーム（app/entry/EntryForm.tsx）
   │  JSON を POST
   ▼
/api/shop-entry（app/api/shop-entry/route.ts）  ← サーバー側で再バリデーション
   │  Google Apps Script へ転送
   ▼
Google Apps Script（google-apps-script/Code.gs）
   ├─ スプレッドシートに1行追記
   └─ 写真を Google ドライブの店舗別フォルダに保存
```

> `GOOGLE_APPS_SCRIPT_URL` を設定しない状態でもフォームは動作します（`delivered:false` を返す）。
> その場合データは保存されず、サーバーログに警告が出るだけです。本番前に必ず下記を設定してください。

## 1. スプレッドシートとドライブフォルダを用意

1. Google スプレッドシートを新規作成し、URL の `/d/` と `/edit` の間の文字列（**SHEET_ID**）を控える。
2. Google ドライブに写真保存用フォルダを新規作成し、URL 末尾の文字列（**DRIVE_FOLDER_ID**）を控える。

## 2. Google Apps Script を作成・デプロイ

2通りあります。どちらも最後に発行される **ウェブアプリの URL** を控える
（`GOOGLE_APPS_SCRIPT_URL`）。初回は権限承認のダイアログが出るので許可する。

### 方式A: ローダー方式（現在の運用・貼り付け最小）

本体コードはリポジトリ直下の `gas.js`（設定値埋め込み済み）にあり、
Apps Script 側は毎回 raw.githubusercontent.com から取得して実行する。
`gas.js` を main に push するだけで再デプロイなしで反映される。

1. [script.google.com](https://script.google.com) で新規プロジェクトを作成。
2. 下記のローダーだけを貼り付ける。

   ```javascript
   var U = 'https://raw.githubusercontent.com/kotamasuzawa-gif/zuke-site/main/gas.js';

   function doPost(e) {
     var src = UrlFetchApp.fetch(U).getContentText();
     return eval(src + '\nMAIN(e);');
   }

   function scopes_() {
     DriveApp.getRootFolder();
     SpreadsheetApp.openById('x');
     ContentService.createTextOutput('');
   }
   ```

3. **デプロイ → 新しいデプロイ → 種類「ウェブアプリ」**。
   - 実行するユーザー: **自分**
   - アクセスできるユーザー: **全員**

※ `scopes_()` は使わない関数だが削除しないこと。Apps Script は静的解析で
必要権限を決めるため、eval で読み込む本体が使うサービスへの参照をローダー側に
置いておく必要がある。`gas.js` で新しい Google サービスを使う場合はここにも追加する。

### 方式B: 全文貼り付け方式

1. [script.google.com](https://script.google.com) で新規プロジェクトを作成。
2. `google-apps-script/Code.gs` の中身をエディタに貼り付ける。
3. 左メニュー **プロジェクトの設定 → スクリプト プロパティ** に以下を追加。

   | プロパティ名 | 値 |
   |---|---|
   | `SHEET_ID` | 手順1のスプレッドシートID |
   | `DRIVE_FOLDER_ID` | 手順1のフォルダID |
   | `SHARED_SECRET` | 任意の長いランダム文字列（推奨） |

4. 方式Aの手順3と同様にウェブアプリとしてデプロイ。

## 3. Next.js 側の環境変数を設定

`.env.local`（本番はホスティングの環境変数）に設定します。

```bash
GOOGLE_APPS_SCRIPT_URL="https://script.google.com/macros/s/xxxxxxxx/exec"
ENTRY_SHARED_SECRET="手順2の SHARED_SECRET と同じ値"
```

`.env.example` にひな形があります。

## 4. 動作確認

```bash
npm run dev
# http://localhost:3000/entry を開いて送信
```

- スプレッドシートに行が追加され、ドライブに店舗別フォルダ＋写真ができれば成功。
- 未設定のまま送信すると完了画面は出ますが保存されません（サーバーログに警告）。

## フォームの入力項目

| 項目 | 必須 | 備考 |
|---|---|---|
| 店舗名 | ○ | |
| 所在地（都道府県・市区町村） | ○ | 掲載店舗の特定用 |
| 「植欲マップ」への掲載状況 | | 掲載済み／未掲載／わからない |
| ご担当者・オーナー名 | ○ | |
| メールアドレス | ○ | 確認連絡用 |
| 店舗／店内のお写真 | | 最大5枚・送信前に自動圧縮 |
| オーナーのお写真 or イラスト | | 1枚 |
| ひとことコメント | | 300文字まで |
| チラシ設置可否 | ○ | はい／検討したい／見送る |
| その他ご連絡 | | 500文字まで |
| 利用同意 | ○ | 掲載・SNS紹介での利用同意 |
| アプリ内利用同意 | | メッセージ・イラスト・写真のアプリ内利用への同意（任意） |

> 確定後の内容変更は随時受け付ける旨をフォーム内・完了画面に明記しています。

## メモ

- 写真はブラウザ側で長辺1600px・JPEG品質0.82に圧縮してから送信するため、Apps Script のペイロード上限に収まりやすくなっています。
- サーバー側でも必須項目・メール形式・合計サイズ（20MB）を再チェックしています。
- `/entry` は `robots: noindex` を設定済み（検索結果に出さない想定）。案内は Threads/DM のリンクから行う運用を想定しています。
