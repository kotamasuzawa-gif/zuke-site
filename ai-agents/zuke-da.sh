#!/bin/bash
# cronからシェル環境を読み込む
source ~/.zshrc 2>/dev/null || true
# ZUKE-DA: データアナリスト — 毎週月曜 9:00 実行

LOG_DIR="/Users/masuzawa.kota/zuke-site/ai-agents/logs"
mkdir -p "$LOG_DIR"
LOG="$LOG_DIR/zuke-da-$(date +%Y%m%d).md"

echo "# ZUKE-DA 週次レポート — $(date '+%Y-%m-%d %H:%M')" > "$LOG"
echo "" >> "$LOG"

/opt/homebrew/bin/claude --print "
あなたはZUKEブランドのデータアナリスト「ZUKE-DA」です。

ZUKEは鉄製プランツポールをBASEで販売するECブランド。
商品: うねうね¥1,320 / 5つの六角形¥1,320 / 3つの六角形¥880 / 2つの六角形¥770
ショップ: https://zukeplants.base.shop/

今週の分析期間: $(date -v-7d '+%Y/%m/%d') 〜 $(date '+%Y/%m/%d')

以下の週次パフォーマンスレポートを出力してください:

① 【先週KPIチェックリスト】
確認すべき指標と「良い状態」の目安を提示。
（BASEアクセス数 / 注文数 / 転換率 / 平均客単価 / SNSフォロワー増減 / エンゲージメント率）

② 【商品別パフォーマンス分析軸】
どの商品が伸びているか・停滞しているかを判断するための質問集と考え方。

③ 【今週の改善仮説 × 3】
データから考えられる「やってみると良さそうなこと」を仮説形式で提示。

④ 【来週までに測定すべき指標】
施策の効果を判断するためのKPI設定案。

出力は表・箇条書き中心で、一目でわかる形式に。
" >> "$LOG" 2>&1

echo "" >> "$LOG"
echo "---" >> "$LOG"
echo "実行完了: $(date '+%Y-%m-%d %H:%M:%S')" >> "$LOG"

osascript -e "display notification \"ZUKE-DA 週次レポート完了 → $LOG\" with title \"ZUKE AI社員\" subtitle \"データアナリスト\""
