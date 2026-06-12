"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

const slides = [
  { src: "/gallery-2.jpg", alt: "ZUKE nordic room" },
  { src: "/hero-1.jpg",    alt: "ZUKE warm natural" },
  { src: "/gallery-3.jpg", alt: "ZUKE desk setting" },
  { src: "/hero-3.jpg",    alt: "ZUKE shelf scene" },
];

// HowTo直後：縦型写真スライダー（5秒）
export function PhotoBreak1() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-stone-50 py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-10 md:gap-20">

        {/* 縦型写真コンテナ */}
        <div className="relative w-full max-w-xs md:max-w-sm flex-shrink-0 aspect-[3/4] overflow-hidden">
          {slides.map((slide, i) => (
            <div
              key={slide.src}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                i === current ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 80vw, 384px"
                priority={i === 0}
              />
            </div>
          ))}
        </div>

        {/* 右：テキスト＋インジケーター */}
        <div className="flex flex-col gap-8">
          <p className="text-[10px] tracking-[0.5em] text-stone-400 font-light">
            PLANTS POLE — FOR YOUR LIVING SPACE
          </p>
          <p className="text-sm text-stone-500 font-light leading-relaxed max-w-xs">
            植物の成長とともに、<br />
            空間もまた育っていく。<br />
            ZUKEは暮らしに馴染む支柱です。
          </p>
          <div className="flex gap-3">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-6 h-px transition-all duration-300 ${
                  i === current ? "bg-stone-800" : "bg-stone-300"
                }`}
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

// About直後：左大・右小の非対称エディトリアル（高さ統一）
export function PhotoBreak2() {
  return (
    <div className="grid grid-cols-3 gap-0.5 h-[50vw] md:h-[40vw]">
      {/* 左：大きい */}
      <div className="col-span-2 relative overflow-hidden">
        <Image
          src="/gallery-3.jpg"
          alt="ZUKE desk scene"
          fill
          className="object-cover hover:scale-105 transition-transform duration-700 ease-out"
          sizes="66vw"
        />
      </div>
      {/* 右：クローズアップ */}
      <div className="relative overflow-hidden">
        <Image
          src="/gallery-1.jpg"
          alt="ZUKE close-up"
          fill
          className="object-cover hover:scale-105 transition-transform duration-700 ease-out"
          sizes="33vw"
        />
      </div>
    </div>
  );
}

// Contact直前：横3枚ストリップ
export function PhotoStrip() {
  return (
    <div className="grid grid-cols-3 gap-0.5">
      <div className="relative aspect-[3/4] md:aspect-[4/5] overflow-hidden">
        <Image
          src="/hero-1.jpg"
          alt="ZUKE warm setting"
          fill
          className="object-cover object-top hover:scale-105 transition-transform duration-700 ease-out"
          sizes="33vw"
        />
      </div>
      <div className="relative aspect-[3/4] md:aspect-[4/5] overflow-hidden">
        <Image
          src="/hero-3.jpg"
          alt="ZUKE nordic shelf"
          fill
          className="object-cover object-top hover:scale-105 transition-transform duration-700 ease-out"
          sizes="33vw"
        />
      </div>
      <div className="relative aspect-[3/4] md:aspect-[4/5] overflow-hidden">
        <Image
          src="/hero-2.jpg"
          alt="ZUKE urban minimal"
          fill
          className="object-cover object-top hover:scale-105 transition-transform duration-700 ease-out"
          sizes="33vw"
        />
      </div>
    </div>
  );
}
