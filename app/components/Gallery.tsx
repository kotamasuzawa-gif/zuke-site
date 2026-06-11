"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Reveal from "./Reveal";

const slides = [
  { src: "/gallery-2.jpg", alt: "ZUKE nordic room" },
  { src: "/hero-1.jpg", alt: "ZUKE warm natural" },
  { src: "/gallery-3.jpg", alt: "ZUKE desk setting" },
  { src: "/hero-3.jpg", alt: "ZUKE shelf scene" },
];

// HowTo直後：縦型写真スライダー（5秒、Ken Burns）
export function PhotoBreak1() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative border-t border-[var(--line)] py-20 md:py-28">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-10 px-6 md:flex-row md:gap-20">
        {/* 縦型写真コンテナ（aspect-[3/4]） */}
        <Reveal className="w-full max-w-xs flex-shrink-0 md:max-w-sm">
          <div className="relative aspect-[3/4] overflow-hidden border border-[var(--line)] hud-corners">
            {slides.map((slide, i) => (
              <div key={slide.src} className={`absolute inset-0 transition-opacity duration-1000 ${i === current ? "opacity-100" : "opacity-0"}`}>
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  className={`object-cover object-center ${i === current ? "animate-kenburns" : ""}`}
                  sizes="(max-width: 768px) 80vw, 384px"
                  priority={i === 0}
                />
              </div>
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            <span className="absolute bottom-4 left-4 font-mono text-[10px] tracking-[0.3em] text-white/70">
              0{current + 1} / 0{slides.length}
            </span>
          </div>
        </Reveal>

        {/* 右：テキスト＋インジケーター */}
        <Reveal delay={120} className="flex flex-col gap-8">
          <p className="font-mono text-[11px] tracking-[0.45em] text-[var(--accent)]">PLANTS POLE — FOR YOUR LIVING SPACE</p>
          <p className="max-w-xs text-base font-light leading-relaxed text-[var(--fg)]">
            植物の成長とともに、<br />
            空間もまた育っていく。<br />
            <span className="text-[var(--muted)]">ZUKEは暮らしに馴染む支柱です。</span>
          </p>
          <div className="flex gap-3">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`スライド ${i + 1}`}
                className={`h-px transition-all duration-300 ${i === current ? "w-10 bg-[var(--accent)]" : "w-6 bg-[var(--line)] hover:bg-[var(--muted)]"}`}
                style={i === current ? { boxShadow: "0 0 8px var(--glow)" } : undefined}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </div>
  );
}

// Contact直前：縦型3枚ストリップ（全画像が縦型なので aspect 縦で統一）
export function PhotoStrip() {
  const shots = [
    { src: "/hero-1.jpg", alt: "ZUKE warm setting", cap: "WARM" },
    { src: "/hero-3.jpg", alt: "ZUKE nordic shelf", cap: "NORDIC" },
    { src: "/hero-2.jpg", alt: "ZUKE urban minimal", cap: "URBAN" },
  ];
  return (
    <div className="grid grid-cols-3 gap-px bg-[var(--line)]">
      {shots.map((s, i) => (
        <Reveal key={s.src} delay={i * 100}>
          <div className="group relative aspect-[3/4] overflow-hidden bg-[var(--bg)] md:aspect-[4/5]">
            <Image
              src={s.src}
              alt={s.alt}
              fill
              className="object-cover object-top transition-transform duration-[1.2s] ease-out group-hover:scale-110"
              sizes="33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-30" />
            <span className="absolute bottom-4 left-4 font-mono text-[10px] tracking-[0.35em] text-white/80 opacity-0 transition-all duration-500 group-hover:opacity-100">
              {s.cap}
            </span>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
