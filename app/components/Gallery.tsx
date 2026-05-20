"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

const slides = [
  { src: "/gallery-2.jpg",  alt: "ZUKE nordic room" },
  { src: "/hero-1.jpg",     alt: "ZUKE warm natural" },
  { src: "/gallery-3.jpg",  alt: "ZUKE desk setting" },
  { src: "/hero-3.jpg",     alt: "ZUKE shelf scene" },
  { src: "/gallery-4.webp", alt: "ZUKE bathroom shelf" },
];

// Products直後：自動スライダー（5秒）
export function PhotoBreak1() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[60vh] overflow-hidden">
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
            sizes="100vw"
            priority={i === 0}
          />
        </div>
      ))}
      <div className="absolute inset-0 bg-black/10" />
      <div className="absolute bottom-10 left-8 md:left-16 z-10">
        <p className="text-[10px] tracking-[0.5em] text-white/70 font-light">
          PLANTS POLE — FOR YOUR LIVING SPACE
        </p>
      </div>
      {/* インジケーター */}
      <div className="absolute bottom-10 right-8 md:right-16 z-10 flex gap-1.5">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-4 h-px transition-all duration-300 ${
              i === current ? "bg-white" : "bg-white/40"
            }`}
          />
        ))}
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
      <div className="relative aspect-[3/4] overflow-hidden">
        <Image
          src="/hero-1.jpg"
          alt="ZUKE warm setting"
          fill
          className="object-cover hover:scale-105 transition-transform duration-700 ease-out"
          sizes="33vw"
        />
      </div>
      <div className="relative aspect-[3/4] overflow-hidden">
        <Image
          src="/hero-3.jpg"
          alt="ZUKE nordic shelf"
          fill
          className="object-cover hover:scale-105 transition-transform duration-700 ease-out"
          sizes="33vw"
        />
      </div>
      <div className="relative aspect-[3/4] overflow-hidden">
        <Image
          src="/hero-2.jpg"
          alt="ZUKE urban minimal"
          fill
          className="object-cover hover:scale-105 transition-transform duration-700 ease-out"
          sizes="33vw"
        />
      </div>
    </div>
  );
}
