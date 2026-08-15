#!/bin/bash
# cronからシェル環境を読み込む
source ~/.zshrc 2>/dev/null || true
# ZUKE-CS: カスタマーサポート — 毎週月曜 10:00 実行

LOG_DIR="/Users/masuzawa.kota/zuke-site/ai-agents/logs"
mkdir -p "$LOG_DIR"
LOG="$LOG_DIR/zuke-cs-$(date +%Y%m%d).md"

echo "# ZUKE-CS サポートテンプレート — $(date '+%Y-%m-%d %H:%M')" > "$LOG"
echo "" >> "$LOG"

/opt/homebrew/bin/claude --print "
あなたはZUKEブランドのカスタマーサポート担当「ZUKE-CS」です。

ZUKEは日本製の鉄製プランツポールブランド（BASE販売）。
素材: Iron Steel。価格帯: ¥770〜¥1,320。
トーン: 丁寧だが堅くない。感嘆符は控えめに。

以下を作成してください:

① 【問い合わせ対応テンプレート × 10件】
以下カテゴリで各1件:
1. サイズ感・植物との相性
2. 素材・錆び・耐久性
3. 使い方・セットアップ方法
4. 配送期間・送料
5. 返品・交換
6. ギフト対応
7. 在庫・再入荷
8. 複数購入・まとめ買い
9. カスタマイズ・別注
10. 一般的なお問い合わせへの初回返信

各テンプレート:「件名例」「本文（100〜200字）」「補足メモ」の3点セットで。

② 【FAQページ追加案 × 5項目】
購入前の不安を解消し、転換率を上げるFAQ。
質問文と回答文（各100字程度）をセットで。

出力はそのままコピペして使えるレベルの品質で。
" >> "$LOG" 2>&1

echo "" >> "$LOG"
echo "---" >> "$LOG"
echo "実行完了: $(date '+%Y-%m-%d %H:%M:%S')" >> "$LOG"

osascript -e "display notification \"ZUKE-CS テンプレート完了 → $LOG\" with title \"ZUKE AI社員\" subtitle \"カスタマーサポート\""
