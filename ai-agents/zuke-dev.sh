#!/bin/bash
# cronからシェル環境を読み込む
source ~/.zshrc 2>/dev/null || true
# ZUKE-DEV: 開発エージェント — 毎週金曜 17:00 実行

LOG_DIR="/Users/masuzawa.kota/zuke-site/ai-agents/logs"
mkdir -p "$LOG_DIR"
LOG="$LOG_DIR/zuke-dev-$(date +%Y%m%d).md"
REPO="/Users/masuzawa.kota/zuke-site"

echo "# ZUKE-DEV コードレビューレポート — $(date '+%Y-%m-%d %H:%M')" > "$LOG"
echo "" >> "$LOG"

# コードの現状をスナップショット
echo "## 対象ファイル一覧" >> "$LOG"
find "$REPO/app" -name "*.tsx" -o -name "*.ts" | grep -v node_modules >> "$LOG"
echo "" >> "$LOG"

/opt/homebrew/bin/claude --print "
あなたはZUKEブランドサイトの開発エージェント「ZUKE-DEV」です。

技術スタック: Next.js (App Router) / TypeScript / Tailwind CSS / next/image
リポジトリ: /Users/masuzawa.kota/zuke-site

主要コンポーネント:
- Hero.tsx: フルスクリーンビジュアル + CTA
- About.tsx: ブランドストーリー + スペック
- Products.tsx: 商品グリッド（BASEへの外部リンク）
- Gallery.tsx, HowTo.tsx, Contact.tsx, Header.tsx, Footer.tsx

以下の観点で週次コードレビューレポートを作成してください:

① 【パフォーマンスチェック】
- next/image の sizes, priority, lazy loading の使い方
- 不要な再レンダリングが起きそうな箇所
- フォント・CSS最適化の状況

② 【SEOチェック】
- メタタグ（title, description, OGP）の設定状況
- 構造化データ（JSON-LD）の有無
- alt属性・heading構造の適切さ

③ 【アクセシビリティチェック】
- キーボード操作・フォーカス管理
- コントラスト比の懸念箇所
- aria属性の不足

④ 【コード品質チェック】
- 重複コード・共通化できる箇所
- TypeScriptの型安全性
- コンポーネントの責務分離

⑤ 【今週の改善提案 TOP3】
優先度（高/中/低）を明示した上で、具体的なコード例付きで提示。

出力は優先度を明示した構造化レポートで。
" >> "$LOG" 2>&1

echo "" >> "$LOG"
echo "---" >> "$LOG"
echo "実行完了: $(date '+%Y-%m-%d %H:%M:%S')" >> "$LOG"

osascript -e "display notification \"ZUKE-DEV コードレビュー完了 → $LOG\" with title \"ZUKE AI社員\" subtitle \"開発エージェント\""
