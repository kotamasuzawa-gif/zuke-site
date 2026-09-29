// 2026-09-29 SEO R4: 構造化データ・OGP の共通ヘルパー。
export const SITE = "https://www.zukeplants.com";

// Next の metadata は親子で浅くマージされ、子ページが openGraph を持つと root の
// siteName / locale / type が消える。各ページの openGraph にこれを展開して補う。
export const OG_BASE = { siteName: "ZUKE", locale: "ja_JP", type: "website" } as const;

// JSON-LD を <script> に埋め込むときは "<" をエスケープする（Next のドキュメント推奨の書き方）
export const jsonLdHtml = (data: unknown) => ({ __html: JSON.stringify(data).replace(/</g, "\\u003c") });
