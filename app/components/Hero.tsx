import Image from "next/image";

export default function Hero() {
  return (
    <section className="pt-16">
      {/* フルスクリーン写真 */}
      <div className="relative h-[95vh] overflow-hidden">
        <Image
          src="/hero-4.jpg"
          alt="ZUKE PLANTS POLE"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        {/* 暗めのグラデーションオーバーレイ */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        {/* 左下：キャッチコピー */}
        <div className="absolute bottom-16 left-8 md:left-16 z-10">
          <p className="text-[11px] tracking-[0.5em] text-white/60 mb-3 font-light">"魅せる"園芸支柱</p>
          <h1 className="text-6xl md:text-8xl font-thin tracking-[0.15em] text-white leading-none">
            ZUKE
          </h1>
        </div>

        {/* 右下：CTA */}
        <div className="absolute bottom-16 right-8 md:right-16 z-10">
          <a
            href="#products"
            className="text-[10px] tracking-[0.4em] text-white border-b border-white pb-0.5 hover:text-white/60 hover:border-white/60 transition-colors font-light"
          >
            VIEW ITEMS
          </a>
        </div>
      </div>

      {/* サブコピーバー */}
      <div className="bg-white border-b border-gray-100 py-4 px-8">
        <p className="text-center text-[10px] tracking-[0.5em] text-gray-400 font-light">
          Plants Pole Brand — Designed in Japan
        </p>
      </div>
    </section>
  );
}
