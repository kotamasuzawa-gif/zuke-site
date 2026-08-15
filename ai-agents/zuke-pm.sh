#!/bin/bash
# cronからシェル環境を読み込む
source ~/.zshrc 2>/dev/null || true
# ZUKE-PM: 秘書/PMアシスタント — 毎日 8:30 実行

LOG_DIR="/Users/masuzawa.kota/zuke-site/ai-agents/logs"
mkdir -p "$LOG_DIR"
LOG="$LOG_DIR/zuke-pm-$(date +%Y%m%d).md"

echo "# ZUKE-PM レポート — $(date '+%Y-%m-%d %H:%M')" > "$LOG"
echo "" >> "$LOG"

/opt/homebrew/bin/claude --print "
あなたはZUKEブランドの秘書兼PMアシスタント「ZUKE-PM」です。

ZUKEは日本製の鉄製プランツポールブランド（コンセプト:「支柱を、インテリアにする。」）。
BASEでEC販売中。商品: うねうね¥1,320 / 5つの六角形¥1,320 / 3つの六角形¥880 / 2つの六角形¥770。

以下を構造的に出力してください:

① 【今日の優先タスク TOP5】
ZUKEブランドの成長に直結するアクションを、重要度×緊急度でランク付けして提示。
（SNS投稿・商品ページ改善・写真撮影・レビュー対応・新商品企画など）

② 【今週のマイルストーン確認】
今週やるべきことを曜日別に整理。

③ 【積み残し・リスク】
放置すると問題になりそうな事項を2〜3点ピックアップ。

④ 【今日の一言メモ】
ブランド運営者へのショートアドバイス（1〜2文）

出力は箇条書きで簡潔に。
" >> "$LOG" 2>&1

echo "" >> "$LOG"
echo "---" >> "$LOG"
echo "実行完了: $(date '+%Y-%m-%d %H:%M:%S')" >> "$LOG"

# macOS通知
osascript -e "display notification \"ZUKE-PM レポート完了 → $LOG\" with title \"ZUKE AI社員\" subtitle \"秘書/PMアシスタント\""
