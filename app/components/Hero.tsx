export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-stone-50 overflow-hidden">
      {/* Background grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(#1a1a1a 1px, transparent 1px), linear-gradient(90deg, #1a1a1a 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full bg-green-100 opacity-40 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full bg-stone-200 opacity-60 blur-3xl pointer-events-none" />

      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <p className="text-xs tracking-[0.4em] text-green-700 mb-6 uppercase">
          Plants Pole Brand
        </p>
        <h1 className="text-7xl md:text-9xl font-bold tracking-[0.15em] text-stone-800 mb-8 leading-none">
          ZUKE
        </h1>
        <p className="text-lg md:text-xl text-stone-500 leading-relaxed mb-12 font-light">
          植物とインテリアの間に、<br />
          美しい支柱を。
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#products"
            className="px-8 py-3.5 bg-stone-800 text-white text-sm tracking-widest hover:bg-stone-700 transition-colors"
          >
            商品を見る
          </a>
          <a
            href="https://zukeplants.base.shop/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3.5 border border-stone-400 text-stone-600 text-sm tracking-widest hover:border-stone-600 hover:text-stone-800 transition-colors"
          >
            ショップへ →
          </a>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-xs text-stone-400 tracking-widest">SCROLL</span>
        <div className="w-px h-12 bg-gradient-to-b from-stone-400 to-transparent" />
      </div>
    </section>
  );
}
