// 2026-10-14 増澤さん指示: 同じ会社が運営する「植欲マップ」アプリの App Store / Google Play 導線を
// 全ページのフッター直上に1回だけ置く。バッジは Apple / Google の公式配布物（public/shokuyoku/）。
// Apple ガイドライン: バッジ高さ 40px 以上・周囲に高さの 1/4 以上の余白。Google も同等に扱う。
import Image from "next/image";

const APP_STORE =
  "https://apps.apple.com/jp/app/id6782267450?utm_source=zukeplants&utm_medium=footer";
const GOOGLE_PLAY =
  "https://play.google.com/store/apps/details?id=jp.shokuyoku.map&hl=ja&utm_source=zukeplants&utm_medium=footer&referrer=utm_source%3Dzukeplants%26utm_medium%3Dfooter";

// バッジ高さ 48px（Apple 公式 SVG は 108.85×40 → 48px 高で幅 130.6px / Google PNG は 646×250 → 48px 高で幅 124px）
const BADGE_H = 48;

// SiteFooter は自前で border-t を持つので二重線にならないよう bordered=false で呼ぶ
export default function ShokuyokuAppBanner({ bordered = true }: { bordered?: boolean }) {
  return (
    <section
      aria-labelledby="shokuyoku-app-heading"
      className={`px-6 py-14 bg-[#fafaf8] ${bordered ? "border-t border-gray-100" : "border-b border-gray-100"}`}
    >
      <div className="max-w-3xl mx-auto flex flex-col items-center gap-6 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center">
          <Image
            src="/shokuyoku/icon-192.png"
            alt="植欲マップ"
            width={64}
            height={64}
            className="h-16 w-16 shrink-0 rounded-xl"
          />
          <div>
            <p className="text-[11px] tracking-[0.2em] text-gray-500">APP</p>
            <h2 id="shokuyoku-app-heading" className="mt-1 text-[15px] font-bold tracking-[0.1em] text-[#222]">
              植欲マップ
            </h2>
            <p className="mt-2 text-[13px] leading-relaxed text-gray-600">
              全国の園芸店と植物イベントが探せるアプリ。ZUKE と同じ会社が運営しています。
            </p>
          </div>
        </div>
        {/* バッジ: スマホは縦積み、sm 以上で横並び。余白は高さの 1/4（12px）以上を確保 */}
        <div className="flex flex-col items-center gap-3 p-3 sm:flex-row sm:shrink-0">
          <a
            href={APP_STORE}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="App Storeからダウンロード（植欲マップ）"
            className="inline-block hover:opacity-80 transition-opacity"
          >
            <Image
              src="/shokuyoku/app-store-badge-ja.svg"
              alt="App Storeからダウンロード"
              width={Math.round((108.85157 / 40) * BADGE_H)}
              height={BADGE_H}
              unoptimized
            />
          </a>
          <a
            href={GOOGLE_PLAY}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Google Play で手に入れよう（植欲マップ）"
            className="inline-block hover:opacity-80 transition-opacity"
          >
            <Image
              src="/shokuyoku/google-play-badge-ja.png"
              alt="Google Play で手に入れよう"
              width={Math.round((646 / 250) * BADGE_H)}
              height={BADGE_H}
            />
          </a>
        </div>
      </div>
    </section>
  );
}
