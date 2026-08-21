import Image from "next/image";

// 2026-08-21 Ducks(plants.)風: NOTICEカード＋2×2のリンクカードグリッド
const STORE_URL = "https://zukeplants.base.shop/";
const IG_URL = "https://www.instagram.com/zuke.plantspole/";

export default function InfoCards() {
  return (
    <section className="px-4 md:px-6 py-16 max-w-6xl mx-auto" aria-label="ご案内">
      {/* NOTICE */}
      <a
        href="#howto"
        className="group relative block bg-white border border-[#e5e5e0] overflow-hidden mb-4 hover:border-neutral-400 transition-colors"
      >
        <div className="relative z-10 p-7 md:p-9 max-w-[70%]">
          <p className="zk-label mb-5">( NOTICE )</p>
          <h2 className="text-2xl md:text-3xl font-medium text-neutral-900 mb-3">ご購入前のご案内</h2>
          <p className="text-xs text-neutral-600 mb-6">使い方・サイズ・素材について</p>
          <span className="inline-block font-[family-name:var(--font-geist-mono)] text-[10px] tracking-[0.3em] text-neutral-800 border border-neutral-400 px-4 py-2 group-hover:bg-black group-hover:text-white group-hover:border-black transition-colors">
            確認する →
          </span>
        </div>
        {/* 右端イメージ */}
        <div className="absolute top-0 right-0 bottom-0 w-[30%] opacity-70">
          <Image src="/gallery-3.jpg" alt="" fill className="object-cover" sizes="30vw" />
          <div className="absolute inset-0 bg-gradient-to-r from-white to-transparent" />
        </div>
      </a>

      {/* 2×2 グリッド */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          {
            label: "( SNS )",
            title: "INSTAGRAM",
            desc: "制作風景・スタイリング例をチェック",
            cta: "FOLLOW →",
            href: IG_URL,
            img: "/gallery-2.jpg",
            external: true,
          },
          {
            label: "( STORE )",
            title: "ONLINE STORE",
            desc: "公式ストアで全商品を販売中",
            cta: "SHOP →",
            href: STORE_URL,
            img: "/hero-1.jpg",
            external: true,
          },
          {
            label: "( PRODUCTS )",
            title: "LINE UP",
            desc: "六角形とうねうね、全4デザイン",
            cta: "VIEW →",
            href: "#products",
            img: "/products/product-hex5-black.webp",
            external: false,
          },
          {
            label: "( GUIDE )",
            title: "HOW TO",
            desc: "差して、沿わせて、育てながら飾る",
            cta: "READ →",
            href: "#howto",
            img: "/gallery-1.jpg",
            external: false,
          },
        ].map((c) => (
          <a
            key={c.title}
            href={c.href}
            {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="group flex items-stretch justify-between bg-white border border-[#e5e5e0] hover:border-neutral-400 transition-colors overflow-hidden"
          >
            <div className="p-6 md:p-7 flex flex-col justify-between min-h-[150px]">
              <div>
                <p className="zk-label mb-4">{c.label}</p>
                <h3 className="font-[family-name:var(--font-geist-mono)] text-xl md:text-2xl tracking-[0.06em] text-neutral-900">
                  {c.title}
                </h3>
                <p className="text-[11px] text-neutral-500 mt-2">{c.desc}</p>
              </div>
              <span className="mt-5 font-[family-name:var(--font-geist-mono)] text-[10px] tracking-[0.3em] text-neutral-700 group-hover:text-black transition-colors">
                {c.cta}
              </span>
            </div>
            <div className="relative w-[104px] md:w-[128px] flex-shrink-0 m-4 overflow-hidden bg-[#f2f2ef]">
              <Image
                src={c.img}
                alt=""
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="128px"
              />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
