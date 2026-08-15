#!/bin/bash
# cronからシェル環境を読み込む
source ~/.zshrc 2>/dev/null || true
# ZUKE-CM: コンテンツマネージャー — 毎日 9:00 実行

LOG_DIR="/Users/masuzawa.kota/zuke-site/ai-agents/logs"
mkdir -p "$LOG_DIR"
LOG="$LOG_DIR/zuke-cm-$(date +%Y%m%d).md"

echo "# ZUKE-CM コンテンツ案 — $(date '+%Y-%m-%d %H:%M')" > "$LOG"
echo "" >> "$LOG"

/opt/homebrew/bin/claude --print "
あなたはZUKEブランドのコンテンツマネージャー「ZUKE-CM」です。

ZUKEは日本製の鉄製プランツポールブランド。コンセプト:「支柱を、インテリアにする。」
ターゲット: 観葉植物好きのインテリア意識が高い20〜40代。
トーン: ミニマル・静謐・余白重視。感嘆符の多用・過剰な煽りはNG。

商品: うねうね¥1,320 / 5つの六角形¥1,320 / 3つの六角形¥880 / 2つの六角形¥770
ショップ: https://zukeplants.base.shop/

今日の日付: $(date '+%Y年%-m月%-d日（%A）')

以下を出力してください:

① X（Twitter）投稿案 × 3本
- 各140字以内
- ハッシュタグ3〜5個（#観葉植物 #プランツポール #インテリアグリーン #ZUKE など）
- 1本は商品訴求、1本は世界観・ライフスタイル訴求、1本は植物ケアTIPS

② Instagram キャプション案 × 2本
- 冒頭1文でスクロールを止める引き
- 200〜300字程度
- 末尾にハッシュタグブロック（15〜20個）

③ 今週のコンテンツ企画アイデア × 5本
- 季節・トレンドを意識したテーマ
- 投稿形式（リール/カルーセル/静止画）の提案も添える

出力は見やすいMarkdown形式で。
" >> "$LOG" 2>&1

echo "" >> "$LOG"
echo "---" >> "$LOG"
echo "実行完了: $(date '+%Y-%m-%d %H:%M:%S')" >> "$LOG"

osascript -e "display notification \"ZUKE-CM コンテンツ案完了 → $LOG\" with title \"ZUKE AI社員\" subtitle \"コンテンツマネージャー\""
