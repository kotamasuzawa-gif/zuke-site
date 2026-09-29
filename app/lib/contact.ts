// 2026-09-29 増澤さん指示「卸売用の案内、ボタンなどもLPに設置して。メールが問い合わせ」:
// 卸売の問い合わせ先はメール。宛先と mailto はここだけで管理する（ページ・ヘッダー・フッター・JSON-LD 共通）。
// ※ 掛け率・卸価格はサイトに載せない（お取引要綱 PDF をメールで送る運用）。
export const WHOLESALE_EMAIL = "zuke.plantspole@gmail.com";

/** メールに書いてほしい項目（本文テンプレートとページ上の案内で共通） */
export const WHOLESALE_MAIL_FIELDS = ["店舗名（会社名）", "ご担当者名", "所在地", "電話番号", "ご希望の商品・数量", "ホームページ・Instagram"];

const SUBJECT = "【卸売のご相談】";
const BODY = [
  "ZUKE ご担当者さま",
  "",
  "PLANTS POLE の卸売について相談させてください。",
  "",
  ...WHOLESALE_MAIL_FIELDS.map((f) => `■ ${f}：`),
  "",
].join("\r\n");

/** 件名・本文テンプレート入りの mailto（RFC 6068 に合わせて各値を URL エンコード） */
export const WHOLESALE_MAILTO = `mailto:${WHOLESALE_EMAIL}?subject=${encodeURIComponent(SUBJECT)}&body=${encodeURIComponent(BODY)}`;
