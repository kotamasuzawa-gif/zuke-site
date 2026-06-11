"use client";

import { useEffect, useRef, useState } from "react";

// --- hexagon-chain pole geometry (mirrors the actual product) ---
const R = 60;
const CX = 150;
const SP = 90; // vertical spacing (overlapping chain)
const X = 0.866 * R; // 51.96
const Y = 0.5 * R; // 30
const centers = [90, 180, 270, 360];
const hex = (cy: number) =>
  `M ${CX} ${cy - R} L ${CX + X} ${cy - Y} L ${CX + X} ${cy + Y} L ${CX} ${cy + R} L ${CX - X} ${cy + Y} L ${CX - X} ${cy - Y} Z`;
const lastBottom = centers[centers.length - 1]; // 360
// legs from the lower vertices of the bottom hexagon
const legs = `M ${CX - X} ${lastBottom + Y} L ${CX - X - 8} ${lastBottom + Y + 150} M ${CX + X} ${lastBottom + Y} L ${CX + X + 8} ${lastBottom + Y + 150}`;
const POLE_PATH = centers.map(hex).join(" ") + " " + legs;

const WORDS = ["支える", "魅せる", "育てる"];

export default function Showcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [word, setWord] = useState(0);

  // cycle kinetic word
  useEffect(() => {
    const id = setInterval(() => setWord((w) => (w + 1) % WORDS.length), 2200);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const path = pathRef.current;
    if (reduce) {
      if (path) path.style.strokeDashoffset = "0";
      return;
    }

    let raf = 0;
    let mx = 0,
      my = 0;

    const draw = () => {
      const sec = sectionRef.current;
      if (sec && path) {
        const rect = sec.getBoundingClientRect();
        const vh = window.innerHeight;
        // 0 when entering from bottom → 1 when scrolled near top
        let p = (vh - rect.top) / (vh * 0.85);
        p = Math.max(0, Math.min(1, p));
        path.style.strokeDashoffset = `${1 - p}`;
      }
      if (wrapRef.current) {
        wrapRef.current.style.transform = `perspective(1000px) rotateX(${(-my * 10).toFixed(2)}deg) rotateY(${(mx * 16).toFixed(2)}deg)`;
      }
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(draw);
    };
    const onMove = (e: PointerEvent) => {
      if (window.matchMedia("(pointer: coarse)").matches) return;
      mx = e.clientX / window.innerWidth - 0.5;
      my = e.clientY / window.innerHeight - 0.5;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(draw);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onMove, { passive: true });
    draw();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[100svh] items-center overflow-hidden border-t border-[var(--line)] px-6 py-24"
    >
      {/* glow field + grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(45% 55% at 30% 50%, rgba(92,242,176,0.12), transparent 70%)" }}
        aria-hidden
      />
      <div className="bg-grid bg-grid-fade pointer-events-none absolute inset-0 opacity-50" aria-hidden />

      {/* floating particles */}
      {[
        { l: "18%", t: "22%", d: "0s", s: 3 },
        { l: "72%", t: "30%", d: "1.2s", s: 2 },
        { l: "60%", t: "70%", d: "0.6s", s: 4 },
        { l: "30%", t: "78%", d: "1.8s", s: 2 },
        { l: "85%", t: "55%", d: "0.3s", s: 3 },
      ].map((p, i) => (
        <span
          key={i}
          aria-hidden
          className="animate-float absolute rounded-full bg-[var(--accent)]"
          style={{ left: p.l, top: p.t, width: p.s, height: p.s, animationDelay: p.d, boxShadow: "0 0 10px var(--glow)", opacity: 0.6 }}
        />
      ))}

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 md:grid-cols-2">
        {/* kinetic copy */}
        <div className="order-2 md:order-1">
          <p className="mb-6 font-mono text-[11px] tracking-[0.45em] text-[var(--accent)]">// STRUCTURE IN MOTION</p>
          <h2 className="text-5xl font-thin leading-tight tracking-tight text-[var(--fg)] md:text-6xl">
            植物を、
            <br />
            <span className="relative inline-grid">
              {WORDS.map((w, i) => (
                <span
                  key={w}
                  className="accent text-glow col-start-1 row-start-1 transition-all duration-500"
                  style={{
                    opacity: i === word ? 1 : 0,
                    transform: i === word ? "translateY(0)" : "translateY(0.4em)",
                    filter: i === word ? "blur(0)" : "blur(6px)",
                  }}
                >
                  {w}。
                </span>
              ))}
            </span>
          </h2>
          <p className="mt-8 max-w-sm text-sm font-light leading-loose text-[var(--muted)]">
            一本の鉄が描く六角形の連なり。
            <br />
            その構造そのものが、空間に佇むオブジェになる。
          </p>
          <div className="mt-10 flex items-center gap-4">
            <span className="h-px w-12 bg-[var(--accent)]" style={{ boxShadow: "0 0 8px var(--glow)" }} />
            <span className="font-mono text-[10px] tracking-[0.4em] text-[var(--muted)]">SCROLL TO CONSTRUCT</span>
          </div>
        </div>

        {/* self-drawing hexagon pole */}
        <div className="order-1 flex justify-center md:order-2">
          <div ref={wrapRef} className="animate-float" style={{ willChange: "transform" }}>
            <svg
              viewBox="0 0 300 600"
              className="h-[60vh] max-h-[520px] w-auto"
              style={{ filter: "drop-shadow(0 0 10px var(--glow))" }}
              aria-label="ZUKE プランツポール（六角形チェーン）"
            >
              {/* faint ghost of full shape */}
              <path d={POLE_PATH} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={2} />
              {/* animated drawing stroke */}
              <path
                ref={pathRef}
                d={POLE_PATH}
                fill="none"
                stroke="var(--accent)"
                strokeWidth={2.5}
                strokeLinejoin="round"
                strokeLinecap="round"
                pathLength={1}
                style={{ strokeDasharray: 1, strokeDashoffset: 1 }}
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
