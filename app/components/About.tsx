import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="bg-white">

      {/* フルワイドの帯 */}
      <div className="border-t border-b border-gray-100 py-20 px-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">

          {/* 画像 */}
          <div className="relative aspect-square overflow-hidden">
            <Image
              src="/about-lifestyle.jpg"
              alt="ZUKE PLANTS POLE ライフスタイル"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          {/* テキスト */}
          <div className="py-8">
            <p className="text-[10px] tracking-[0.5em] text-gray-300 mb-10 font-light">ABOUT ZUKE</p>
            <h2 className="text-3xl md:text-4xl font-thin text-black tracking-wide leading-relaxed mb-10">
              支柱を、<br />インテリアにする。
            </h2>
            <p className="text-xs font-light text-gray-500 leading-loose mb-6">
              ZUKEは「植物の支柱」という実用品に、<br />
              デザインの視点を持ち込んだブランドです。
            </p>
            <p className="text-xs font-light text-gray-500 leading-loose mb-12">
              観葉植物が部屋に溶け込むように、<br />
              支柱もまた空間の一部であるべき——<br />
              そんな考えから生まれた、鉄製のプランツポールです。
            </p>
            <div className="grid grid-cols-2 gap-6 border-t border-gray-100 pt-10">
              {[
                { k: "Material", v: "Iron Steel" },
                { k: "Design", v: "Made in Japan" },
                { k: "Type", v: "4 Designs" },
                { k: "Use", v: "Indoor Plants" },
              ].map((item) => (
                <div key={item.k}>
                  <p className="text-[9px] tracking-[0.3em] text-gray-300 mb-1 font-light">{item.k}</p>
                  <p className="text-[11px] text-black font-light">{item.v}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
