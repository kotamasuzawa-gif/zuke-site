import Image from "next/image";

// 2026-08-21 Ducks(plants.)風: フルブリード写真の中央にタイプライター調ワードマーク
export default function Hero() {
  return (
    <section className="pt-16">
      <div className="relative h-[92vh] overflow-hidden">
        <Image
          src="/hero-4.jpg"
          alt="ZUKE PLANTS POLE を使った観葉植物のあるインテリア"
          fill
          className="object-cover object-[50%_44%]"
          priority
          sizes="100vw"
        />
        {/* 落ち着いた暗幕（文字可読性） */}
        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />

        {/* 中央ワードマーク */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6">
          <h1 className="font-[family-name:var(--font-geist-mono)] text-white text-5xl md:text-7xl tracking-[0.08em] text-center leading-tight [text-shadow:0_2px_24px_rgba(0,0,0,.55)]">
            ZUKE
            <span className="block text-2xl md:text-4xl mt-2 tracking-[0.04em]">( plants pole. )</span>
          </h1>
          <p className="mt-6 text-[11px] tracking-[0.5em] text-white/70 font-light">
            &quot;魅せる&quot;園芸支柱
          </p>
        </div>

        {/* 左下：所在ラベル / 右下：CTA */}
        <div className="absolute bottom-8 left-6 md:left-10 z-10">
          <p className="font-[family-name:var(--font-geist-mono)] text-[10px] tracking-[0.4em] text-white/60">
            DESIGNED&nbsp;IN&nbsp;JAPAN
          </p>
        </div>
        <div className="absolute bottom-8 right-6 md:right-10 z-10">
          <a
            href="#products"
            className="font-[family-name:var(--font-geist-mono)] text-[10px] tracking-[0.4em] text-white border-b border-white/70 pb-1 hover:text-white/60 hover:border-white/40 transition-colors"
          >
            VIEW&nbsp;ITEMS&nbsp;→
          </a>
        </div>
      </div>
    </section>
  );
}
