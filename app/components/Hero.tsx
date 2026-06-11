"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Hero() {
  const imgRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // trigger entrance after mount
    const t = setTimeout(() => setMounted(true), 80);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return () => clearTimeout(t);

    let raf = 0;
    let mx = 0,
      my = 0;

    const apply = () => {
      const y = window.scrollY;
      if (imgRef.current) {
        // scroll parallax (image drifts slower) + subtle mouse parallax
        imgRef.current.style.transform = `translate3d(${mx * 12}px, ${y * 0.18 + my * 8}px, 0) scale(1.12)`;
      }
      if (textRef.current) {
        textRef.current.style.transform = `translate3d(${mx * -16}px, ${my * -10}px, 0)`;
      }
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(apply);
    };
    const onMove = (e: PointerEvent) => {
      if (window.matchMedia("(pointer: coarse)").matches) return;
      mx = e.clientX / window.innerWidth - 0.5;
      my = e.clientY / window.innerHeight - 0.5;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(apply);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onMove, { passive: true });
    apply();
    return () => {
      clearTimeout(t);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="relative h-[100svh] w-full overflow-hidden hud-corners">
      {/* full-bleed photo (hero-4 is portrait-friendly; object-top keeps subject) */}
      <div ref={imgRef} className="absolute inset-0 will-change-transform" style={{ transform: "scale(1.12)" }}>
        <Image src="/hero-4.jpg" alt="ZUKE PLANTS POLE" fill className="object-cover object-top" priority sizes="100vw" />
      </div>

      {/* darkening + accent wash for near-future depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-black/65" />
      <div
        className="absolute inset-0 mix-blend-soft-light"
        style={{ background: "radial-gradient(60% 50% at 50% 80%, rgba(92,242,176,0.18), transparent 70%)" }}
      />
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-[0.18]" />

      {/* top status line */}
      <div className="absolute left-6 right-6 top-20 z-10 flex items-center justify-between md:left-16 md:right-16">
        <div className="flex items-center gap-2.5">
          <span className="h-1.5 w-1.5 animate-blink rounded-full bg-[var(--accent)]" style={{ boxShadow: "0 0 8px var(--glow)" }} />
          <span className="font-mono text-[10px] tracking-[0.4em] text-white/70">SYSTEM / PLANTS POLE</span>
        </div>
        <span className="hidden font-mono text-[10px] tracking-[0.4em] text-white/50 md:block">EST. JAPAN</span>
      </div>

      {/* main copy */}
      <div ref={textRef} className="absolute bottom-24 left-6 z-10 will-change-transform md:bottom-28 md:left-16">
        <p
          className={`mb-4 font-mono text-[11px] tracking-[0.5em] text-[var(--accent)] transition-all duration-700 ${mounted ? "opacity-100" : "translate-y-3 opacity-0"}`}
        >
          &quot;魅せる&quot;園芸支柱
        </p>
        <h1
          className="text-[22vw] font-thin leading-[0.82] tracking-[0.04em] text-white text-glow md:text-[14vw]"
          style={{
            clipPath: mounted ? "inset(0 0 0 0)" : "inset(0 0 100% 0)",
            transition: "clip-path 1.1s cubic-bezier(0.2,0.7,0.2,1)",
          }}
        >
          ZUKE
        </h1>
        <p
          className={`mt-5 max-w-xs text-sm font-light leading-relaxed text-white/65 transition-all delay-300 duration-700 ${mounted ? "opacity-100" : "translate-y-3 opacity-0"}`}
        >
          支柱という実用品を、空間を構成するデザインへ。
        </p>
      </div>

      {/* CTA + scroll cue */}
      <div className="absolute bottom-24 right-6 z-10 flex flex-col items-end gap-10 md:bottom-28 md:right-16">
        <a
          href="#products"
          className="group relative overflow-hidden rounded-full border border-white/25 px-7 py-3 font-mono text-[11px] tracking-[0.35em] text-white transition-colors duration-300 hover:border-[var(--accent)] hover:text-[var(--accent)]"
        >
          <span className="relative z-10">VIEW ITEMS</span>
          <span
            className="absolute inset-0 -translate-x-full bg-[var(--accent)]/10 transition-transform duration-500 group-hover:translate-x-0"
            aria-hidden
          />
        </a>
      </div>

      {/* center-bottom scroll indicator */}
      <div className="absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2">
        <span className="font-mono text-[9px] tracking-[0.4em] text-white/40">SCROLL</span>
        <span className="relative flex h-9 w-px justify-center overflow-hidden bg-white/15">
          <span className="absolute top-0 h-3 w-px animate-scroll-cue bg-[var(--accent)]" />
        </span>
      </div>
    </section>
  );
}
