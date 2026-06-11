import Image from "next/image";
import Reveal from "./Reveal";

export default function About() {
  return (
    <section id="about" className="relative border-t border-[var(--line)]">
      <div className="mx-auto grid max-w-7xl gap-0 md:grid-cols-2">
        {/* 左：ライフスタイル写真（縦型 aspect-[4/5]） */}
        <Reveal className="relative">
          <div className="group relative aspect-[4/5] overflow-hidden">
            <Image
              src="/hero-1.jpg"
              alt="ZUKE ライフスタイル"
              fill
              className="object-cover object-center transition-transform duration-[1.2s] ease-out group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/40" />
            {/* corner readout */}
            <span className="absolute bottom-5 left-5 font-mono text-[10px] tracking-[0.3em] text-white/60">
              FIG.01 — IN SITU
            </span>
          </div>
        </Reveal>

        {/* 右：テキスト＋gallery-4 縦型カード */}
        <div className="flex flex-col justify-center px-8 py-16 md:px-16 md:py-20">
          <Reveal>
            <p className="mb-10 font-mono text-[11px] tracking-[0.45em] text-[var(--accent)]">[ 02 ] ABOUT ZUKE</p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mb-8 text-4xl font-thin leading-snug tracking-wide text-[var(--fg)] md:text-5xl">
              支柱を、<br />
              <span className="accent text-glow">インテリア</span>にする。
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="mb-4 text-sm font-light leading-loose text-[var(--muted)]">
              ZUKEは「植物の支柱」という実用品に、<br />
              デザインの視点を持ち込んだブランドです。
            </p>
            <p className="mb-10 text-sm font-light leading-loose text-[var(--muted)]">
              観葉植物が部屋に溶け込むように、<br />
              支柱もまた空間の一部であるべき——<br />
              そんな考えから生まれた、鉄製のプランツポールです。
            </p>
          </Reveal>

          {/* gallery-4：縦型カード（被写体が右側 → object-right） */}
          <Reveal delay={180}>
            <div className="relative mb-10 aspect-[3/4] w-full max-w-[260px] overflow-hidden border border-[var(--line)]">
              <Image
                src="/gallery-4.webp"
                alt="ZUKE インテリアシーン"
                fill
                className="object-cover object-right transition-transform duration-[1.2s] ease-out hover:scale-105"
                sizes="260px"
              />
            </div>
          </Reveal>

          <Reveal delay={220}>
            <div className="grid grid-cols-3 gap-6 border-t border-[var(--line)] pt-8">
              {[
                { k: "MATERIAL", v: "Iron Steel" },
                { k: "TYPE", v: "4 Designs" },
                { k: "USE", v: "Indoor Plants" },
              ].map((item) => (
                <div key={item.k}>
                  <p className="mb-1.5 font-mono text-[9px] tracking-[0.3em] text-[var(--accent)]/70">{item.k}</p>
                  <p className="text-[12px] font-light text-[var(--fg)]">{item.v}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
