import Image from "next/image";

export default function Hero() {
  return (
    <section className="pt-14 min-h-screen flex flex-col md:flex-row">

      {/* 左：テキスト */}
      <div className="flex flex-col justify-center px-10 py-20 md:py-0 md:w-2/5 bg-white order-2 md:order-1">
        <p className="text-[10px] tracking-[0.4em] text-gray-400 mb-8">ZUKE / Plants Pole Brand</p>
        <h1 className="text-2xl md:text-3xl font-light text-gray-900 leading-relaxed tracking-wide mb-8">
          "魅せる"ための<br />園芸支柱
        </h1>
        <p className="text-xs text-gray-400 tracking-[0.15em] leading-loose mb-12">
          支柱を、インテリアにする。<br />
          鉄の美しさを、植物と共に。
        </p>
        <div className="flex flex-col gap-4">
          <a
            href="#products"
            className="inline-block text-xs tracking-[0.3em] text-gray-900 border-b border-gray-900 pb-0.5 w-fit hover:text-gray-400 hover:border-gray-400 transition-colors"
          >
            VIEW ITEMS
          </a>
          <a
            href="https://zukeplants.base.shop/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-xs tracking-[0.3em] text-gray-400 hover:text-gray-900 transition-colors w-fit"
          >
            ONLINE SHOP →
          </a>
        </div>
      </div>

      {/* 右：画像 */}
      <div className="relative md:w-3/5 bg-[#f4f2ee] order-1 md:order-2" style={{ minHeight: "60vw" }}>
        <Image
          src="https://baseec-img-mng.akamaized.net/images/item/origin/99d4b0564f5e6d6c2729f19eee010bc7.png"
          alt="PLANTS POLE 5つの六角形"
          fill
          className="object-contain p-16 md:p-24 mix-blend-multiply"
          priority
          sizes="(max-width: 768px) 100vw, 60vw"
        />
      </div>

    </section>
  );
}
