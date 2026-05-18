export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-[#faf9f6] overflow-hidden">
      {/* 和紙風の薄いテクスチャライン */}
      <div className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, #8b7355 0px, #8b7355 1px, transparent 1px, transparent 60px)",
        }}
      />

      {/* 抹茶のぼかし */}
      <div className="absolute top-1/4 right-1/3 w-80 h-80 rounded-full bg-[#8fa882] opacity-10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/4 w-96 h-96 rounded-full bg-[#c8b89a] opacity-15 blur-3xl pointer-events-none" />

      <div className="relative z-10 text-center px-8 max-w-2xl mx-auto">
        {/* 細い横線アクセント */}
        <div className="flex items-center justify-center gap-4 mb-10">
          <div className="w-12 h-px bg-[#8b7a6a]" />
          <p className="text-[10px] tracking-[0.5em] text-[#8b7a6a] uppercase">Plants Pole Brand</p>
          <div className="w-12 h-px bg-[#8b7a6a]" />
        </div>

        <h1
          className="text-6xl md:text-8xl font-light tracking-[0.25em] text-[#1c1a17] mb-6 leading-none"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          ZUKE
        </h1>

        {/* 縦線区切り */}
        <div className="w-px h-10 bg-[#c8b89a] mx-auto mb-8" />

        <p
          className="text-base md:text-lg text-[#6b6456] leading-loose mb-14 font-light tracking-wide"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          植物とインテリアの間に、<br />
          美しい支柱を。
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#products"
            className="px-10 py-3.5 bg-[#3d3830] text-[#faf9f6] text-xs tracking-[0.25em] hover:bg-[#2a2520] transition-colors"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            商　品　を　見　る
          </a>
          <a
            href="https://zukeplants.base.shop/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-10 py-3.5 border border-[#c8b89a] text-[#6b6456] text-xs tracking-[0.25em] hover:border-[#8b7a6a] hover:text-[#3d3830] transition-colors"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            シ　ョ　ッ　プ　へ　→
          </a>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
        <span className="text-[9px] text-[#b0a898] tracking-[0.4em]">SCROLL</span>
        <div className="w-px h-14 bg-gradient-to-b from-[#b0a898] to-transparent" />
      </div>
    </section>
  );
}
