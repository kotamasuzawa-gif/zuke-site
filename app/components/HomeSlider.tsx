"use client";

// 2026-11-22 増澤さん（11:05 JST）: トップ動画の直下。スワイプ、自動送り、ループ。
// 外部ライブラリは使わない。画像と文言は app/lib/homeSlider.ts。
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { HOME_SLIDER_CARDS, type HomeSliderCard } from "@/app/lib/homeSlider";

const INTERVAL_MS = 4800;
const COPIES = [0, 1, 2] as const;

type HoldKey = "pointer" | "hover" | "focus" | "hidden" | "user" | "reduce" | "scrolling";

function slideEls(el: HTMLElement) {
  return [...el.querySelectorAll<HTMLElement>("[data-slide]")];
}

function stepOf(el: HTMLElement) {
  const slides = slideEls(el);
  if (slides.length < 2) return 0;
  return slides[1].offsetLeft - slides[0].offsetLeft;
}

/** 1周ぶんのスクロール量。真ん中の組の先頭まで。 */
function strideOf(el: HTMLElement, count: number) {
  const slides = slideEls(el);
  if (slides.length < count + 1) return 0;
  return slides[count].offsetLeft - slides[0].offsetLeft;
}

function logicalFromScroll(el: HTMLElement, count: number) {
  const step = stepOf(el);
  if (step <= 0) return 0;
  const raw = Math.round(el.scrollLeft / step);
  return ((raw % count) + count) % count;
}

export default function HomeSlider() {
  const cards = HOME_SLIDER_CARDS;
  const count = cards.length;
  const sectionRef = useRef<HTMLElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const holds = useRef<Record<HoldKey, boolean>>({
    pointer: false,
    hover: false,
    focus: false,
    hidden: false,
    user: false,
    reduce: false,
    scrolling: false,
  });
  const logicalRef = useRef(0);
  const programmaticRef = useRef(false);
  const jumpingRef = useRef(false);
  const pendingAnnounceRef = useRef(false);
  const justDraggedRef = useRef(false);
  const finePointerRef = useRef(false);
  const reduceRef = useRef(false);
  const dragRef = useRef<{ x: number; left: number; moved: boolean; id: number } | null>(null);
  const draggingRef = useRef(false);
  const goRef = useRef<(dir: number, announce: boolean) => void>(() => {});

  const [index, setIndex] = useState(0);
  const [running, setRunning] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [reduce, setReduce] = useState(false);
  const [status, setStatus] = useState("");

  const recompute = () => {
    const blocked = Object.values(holds.current).some(Boolean);
    setRunning((prev) => (prev === !blocked ? prev : !blocked));
  };

  const setHold = (key: HoldKey, value: boolean) => {
    if (holds.current[key] === value) return;
    holds.current[key] = value;
    recompute();
  };

  const behavior = (): ScrollBehavior => (reduceRef.current ? "auto" : "smooth");

  const placeAt = (absoluteIndex: number, scrollBehavior: ScrollBehavior) => {
    const el = scrollerRef.current;
    if (!el) return;
    const slides = slideEls(el);
    const target = slides[absoluteIndex];
    if (!target) return;
    const left = target.offsetLeft - slides[0].offsetLeft;
    programmaticRef.current = true;
    if (scrollBehavior === "auto") {
      const prevSnap = el.style.scrollSnapType;
      el.style.scrollSnapType = "none";
      el.scrollLeft = left;
      el.style.scrollSnapType = prevSnap;
      programmaticRef.current = false;
      return;
    }
    el.scrollTo({ left, behavior: scrollBehavior });
  };

  // 複製の端まで送ったあと、見た目を変えずに真ん中の組へ戻す。
  const normalize = () => {
    const el = scrollerRef.current;
    if (!el || jumpingRef.current) return;
    const stride = strideOf(el, count);
    if (stride <= 0) return;
    // 端の複製まで来たら、同じカードの真ん中の組へ戻す。
    // 右端はスクロールしきりで stride*2 に届かないことがあるので、少し手前から戻す。
    let left = el.scrollLeft;
    if (left < stride - 1) left += stride;
    else if (left >= stride * 2 - stepOf(el) * 0.25) left -= stride;
    else return;
    jumpingRef.current = true;
    const prevSnap = el.style.scrollSnapType;
    el.style.scrollSnapType = "none";
    el.scrollLeft = left;
    el.style.scrollSnapType = prevSnap;
    jumpingRef.current = false;
  };

  const syncIndex = () => {
    const el = scrollerRef.current;
    if (!el) return;
    const next = logicalFromScroll(el, count);
    logicalRef.current = next;
    setIndex((prev) => (prev === next ? prev : next));
    return next;
  };

  const finishScroll = () => {
    if (jumpingRef.current) return;
    normalize();
    const next = syncIndex() ?? logicalRef.current;
    const announce = pendingAnnounceRef.current;
    pendingAnnounceRef.current = false;
    programmaticRef.current = false;
    setHold("scrolling", false);
    if (announce) {
      const card = cards[next];
      setStatus(`${next + 1} / ${count}、${card.title}`);
    }
  };

  useEffect(() => {
    goRef.current = (dir: number, announce: boolean) => {
      const el = scrollerRef.current;
      if (!el) return;
      const step = stepOf(el);
      const stride = strideOf(el, count);
      if (step <= 0 || stride <= 0) return;
      let left = el.scrollLeft;
      const dest = left + dir * step;
      // 端の複製に入る直前で、見た目を変えずに1周ぶん戻してから送る。
      if (dest >= stride * 2 || dest < stride) {
        const shift = dest >= stride * 2 ? -stride : stride;
        jumpingRef.current = true;
        const prevSnap = el.style.scrollSnapType;
        el.style.scrollSnapType = "none";
        el.scrollLeft = left + shift;
        el.style.scrollSnapType = prevSnap;
        jumpingRef.current = false;
        left = el.scrollLeft;
      }
      if (announce) pendingAnnounceRef.current = true;
      programmaticRef.current = true;
      el.scrollTo({ left: left + dir * step, behavior: behavior() });
      if (reduceRef.current) finishScroll();
    };
  });

  const scrollToLogical = (i: number) => {
    pendingAnnounceRef.current = true;
    const normalized = ((i % count) + count) % count;
    placeAt(count + normalized, behavior());
    if (reduceRef.current) finishScroll();
  };

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const stride = strideOf(el, count);
    if (stride > 0) {
      jumpingRef.current = true;
      const prevSnap = el.style.scrollSnapType;
      el.style.scrollSnapType = "none";
      el.scrollLeft = stride;
      el.style.scrollSnapType = prevSnap;
      jumpingRef.current = false;
    }

    const reduceMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fineMq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const applyReduce = () => {
      reduceRef.current = reduceMq.matches;
      holds.current.reduce = reduceMq.matches;
      setReduce(reduceMq.matches);
      recompute();
    };
    const applyFine = () => {
      finePointerRef.current = fineMq.matches;
    };
    applyReduce();
    applyFine();
    reduceMq.addEventListener("change", applyReduce);
    fineMq.addEventListener("change", applyFine);

    const onVis = () => setHold("hidden", document.hidden);
    document.addEventListener("visibilitychange", onVis);
    onVis();

    // 最初の位置合わせで読み上げない。ユーザーが触ったら解除する。
    let booting = true;
    const bootTimer = window.setTimeout(() => {
      booting = false;
      pendingAnnounceRef.current = false;
    }, 400);
    el.addEventListener("pointerdown", () => { booting = false; }, { once: true });

    let timer = 0;
    const scheduleFinish = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        if (draggingRef.current) return;
        if (booting) {
          pendingAnnounceRef.current = false;
          programmaticRef.current = false;
          normalize();
          syncIndex();
          return;
        }
        finishScroll();
      }, 80);
    };
    const onScroll = () => {
      if (jumpingRef.current || draggingRef.current) return;
      syncIndex();
      if (booting) return;
      if (!programmaticRef.current) {
        pendingAnnounceRef.current = true;
        setHold("scrolling", true);
      }
      scheduleFinish();
    };
    const onScrollEnd = () => {
      if (draggingRef.current) return;
      scheduleFinish();
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    el.addEventListener("scrollend", onScrollEnd);

    let width = el.clientWidth;
    const ro = new ResizeObserver(() => {
      if (el.clientWidth === width) return;
      width = el.clientWidth;
      const strideNow = strideOf(el, count);
      const stepNow = stepOf(el);
      if (strideNow <= 0 || stepNow <= 0) return;
      jumpingRef.current = true;
      const prevSnap = el.style.scrollSnapType;
      el.style.scrollSnapType = "none";
      el.scrollLeft = strideNow + logicalRef.current * stepNow;
      el.style.scrollSnapType = prevSnap;
      jumpingRef.current = false;
    });
    ro.observe(el);

    return () => {
      window.clearTimeout(bootTimer);
      window.clearTimeout(timer);
      reduceMq.removeEventListener("change", applyReduce);
      fineMq.removeEventListener("change", applyFine);
      document.removeEventListener("visibilitychange", onVis);
      el.removeEventListener("scroll", onScroll);
      el.removeEventListener("scrollend", onScrollEnd);
      ro.disconnect();
    };
    // マウント時だけ張る。スクロール処理は ref 経由。
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => goRef.current(1, false), INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [running]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.altKey || e.metaKey || e.ctrlKey) return;
    if (e.key === "ArrowRight") {
      e.preventDefault();
      goRef.current(1, true);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      goRef.current(-1, true);
    }
  };

  return (
    <section
      ref={sectionRef}
      aria-roledescription="カルーセル"
      aria-label="注目のシリーズ"
      className="bg-white pt-6 pb-8 md:pt-8 md:pb-10"
      onKeyDown={onKeyDown}
      onMouseEnter={() => {
        if (finePointerRef.current) setHold("hover", true);
      }}
      onMouseLeave={() => setHold("hover", false)}
      onFocusCapture={() => {
        if (holds.current.pointer) return;
        setHold("focus", true);
      }}
      onBlurCapture={(e) => {
        const next = e.relatedTarget;
        if (next instanceof Node && sectionRef.current?.contains(next)) return;
        setHold("focus", false);
      }}
    >
      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {status}
      </p>
      <div
        ref={scrollerRef}
        id="home-slider"
        className="flex w-full min-w-0 snap-x snap-mandatory gap-5 overflow-x-auto px-4 scroll-pl-4 overscroll-x-contain [-ms-overflow-style:none] [scrollbar-width:none] md:gap-10 md:px-8 md:scroll-pl-8 [&::-webkit-scrollbar]:hidden"
        onPointerDown={(e) => {
          setHold("pointer", true);
          if (e.pointerType === "touch") return;
          const el = scrollerRef.current;
          if (!el) return;
          draggingRef.current = true;
          dragRef.current = { x: e.clientX, left: el.scrollLeft, moved: false, id: e.pointerId };
          el.style.scrollSnapType = "none";
          el.setPointerCapture(e.pointerId);
        }}
        onPointerMove={(e) => {
          const drag = dragRef.current;
          const el = scrollerRef.current;
          if (!drag || !el || e.pointerId !== drag.id) return;
          const dx = e.clientX - drag.x;
          if (Math.abs(dx) > 6) drag.moved = true;
          el.scrollLeft = drag.left - dx;
        }}
        onPointerUp={(e) => {
          const drag = dragRef.current;
          const el = scrollerRef.current;
          setHold("pointer", false);
          draggingRef.current = false;
          if (!drag || !el || e.pointerId !== drag.id) return;
          dragRef.current = null;
          el.style.scrollSnapType = "";
          if (drag.moved) {
            justDraggedRef.current = true;
            pendingAnnounceRef.current = true;
            const step = stepOf(el);
            if (step > 0) {
              const raw = Math.round(el.scrollLeft / step);
              programmaticRef.current = true;
              el.scrollTo({ left: raw * step, behavior: behavior() });
              if (reduceRef.current) finishScroll();
            }
          }
        }}
        onPointerCancel={() => {
          const el = scrollerRef.current;
          draggingRef.current = false;
          dragRef.current = null;
          if (el) el.style.scrollSnapType = "";
          setHold("pointer", false);
        }}
        onClickCapture={(e) => {
          if (!justDraggedRef.current) return;
          justDraggedRef.current = false;
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        {COPIES.map((copy) =>
          cards.map((card, i) => {
            const real = copy === 1;
            return (
              <div
                key={`${copy}-${card.id}`}
                data-slide
                role="group"
                aria-roledescription="スライド"
                aria-label={`${i + 1} / ${count}`}
                aria-hidden={!real}
                inert={real ? undefined : true}
                className="flex w-[82%] shrink-0 snap-start sm:w-[46%] lg:w-[31%]"
              >
                <SliderCard card={card} />
              </div>
            );
          }),
        )}
        {/* 最後のカードも先頭に揃えられるよう、1画面ぶん余白を足す */}
        <div aria-hidden className="w-full shrink-0" />
      </div>

      <div className="mt-4 flex items-center justify-center gap-1 px-4 md:px-8">
        <SliderButton label="前のカード" onClick={() => goRef.current(-1, true)}>
          <Chevron dir="left" />
        </SliderButton>
        <div className="flex items-center">
          {cards.map((card, i) => (
            <button
              key={card.id}
              type="button"
              aria-label={`${card.title}、${i + 1} / ${count}`}
              aria-current={i === index ? "true" : undefined}
              onClick={() => scrollToLogical(i)}
              className="inline-flex h-11 w-8 items-center justify-center"
            >
              <span
                className={`block h-1.5 rounded-full bg-[#222] transition-[width] motion-reduce:transition-none ${
                  i === index ? "w-5" : "w-1.5 opacity-30"
                }`}
              />
            </button>
          ))}
        </div>
        {!reduce && (
          <button
            type="button"
            aria-pressed={userPaused}
            aria-label={userPaused ? "自動送りを再生" : "自動送りを停止"}
            onClick={() => {
              const next = !userPaused;
              setUserPaused(next);
              setHold("user", next);
            }}
            className="inline-flex h-11 items-center justify-center px-3 text-[11px] tracking-[0.15em] text-[#222]"
          >
            {userPaused ? "再生" : "停止"}
          </button>
        )}
        <SliderButton label="次のカード" onClick={() => goRef.current(1, true)}>
          <Chevron dir="right" />
        </SliderButton>
      </div>
    </section>
  );
}

function SliderCard({ card }: { card: HomeSliderCard }) {
  return (
    <Link
      href={card.href}
      className="block w-full outline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#222]"
    >
      {/* 1200×800 のまま出す。object-fit で正方形に切らない */}
      <Image
        src={card.image}
        alt={card.imageAlt}
        width={1200}
        height={800}
        sizes="(max-width: 640px) 82vw, (max-width: 1024px) 46vw, 31vw"
        className="block h-auto w-full"
        draggable={false}
      />
    </Link>
  );
}

function SliderButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="inline-flex h-11 w-11 items-center justify-center border border-[#222] text-[#222] hover:bg-[#222] hover:text-white"
    >
      {children}
    </button>
  );
}

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      {dir === "left" ? <path d="M15 5 L8 12 L15 19" /> : <path d="M9 5 L16 12 L9 19" />}
    </svg>
  );
}
