import type { Metadata } from "next";
import Image from "next/image";
import EntryForm from "./EntryForm";

export const metadata: Metadata = {
  title: "掲載情報のご提供 | 植欲マップ",
  description:
    "「植欲マップ」に掲載する園芸店さま向けの情報入力フォームです。店舗写真・オーナーのお写真・ひとことコメントなどをお送りいただけます。",
  openGraph: {
    title: "掲載情報のご提供 | 植欲マップ",
    description:
      "「植欲マップ」に掲載する園芸店さま向けの情報入力フォームです。掲載は無料です。",
    images: ["/shokuyoku-og.png"],
  },
};

export default function Home() {
  return (
    <>
      <header className="border-b border-stone-100">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center">
          <Image
            src="/shokuyoku-logo.webp"
            alt="植欲マップ"
            width={1144}
            height={266}
            priority
            className="h-9 w-auto"
          />
        </div>
      </header>

      <main className="flex-1 px-6 py-14 md:py-20">
        {/* イントロ */}
        <div className="max-w-xl mx-auto text-center mb-14">
          <p className="text-xs tracking-[0.4em] text-green-700 uppercase mb-4">Entry Form</p>
          <h1 className="text-2xl md:text-3xl font-bold text-stone-800 tracking-tight mb-6">
            掲載情報のご提供のお願い
          </h1>
          <p className="text-sm text-stone-600 leading-relaxed">
            「植欲マップ」は、植物好きが&ldquo;行きたい園芸店&rdquo;を探せる地図アプリです。<br className="hidden md:block" />
            全国2,000店以上を掲載中で、掲載は無料。より魅力的にお店をご紹介するため、<br className="hidden md:block" />
            下記のご提供にご協力いただけたら嬉しいです。
          </p>
        </div>

        <EntryForm />

        <p className="max-w-xl mx-auto text-center text-xs text-stone-400 mt-12 leading-relaxed">
          ＊は必須項目です。ご提供いただいた情報は掲載目的以外には使用しません。
        </p>
      </main>

      <footer className="border-t border-stone-100 py-10 px-6 mt-8">
        <div className="max-w-6xl mx-auto flex flex-col items-center gap-3">
          <Image
            src="/shokuyoku-logo.webp"
            alt="植欲マップ"
            width={1144}
            height={266}
            className="h-6 w-auto"
          />
          <p className="text-xs text-stone-400">© 植欲マップ</p>
        </div>
      </footer>
    </>
  );
}
