import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-0">

        {/* 左：ライフスタイル写真 */}
        <div className="relative aspect-[4/5] overflow-hidden">
          <Image
            src="/hero-1.jpg"
            alt="ZUKE ライフスタイル"
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        {/* 右：テキスト ＋ gallery-4 縦型カード */}
        <div className="flex flex-col justify-center px-10 md:px-16 py-16">
          <p className="text-[10px] tracking-[0.5em] text-gray-300 mb-10 font-light">ABOUT ZUKE</p>
          <h2 className="text-3xl md:text-4xl font-thin text-black tracking-wide leading-relaxed mb-8">
            支柱を、<br />インテリアにする。
          </h2>
          <p className="text-xs font-light text-gray-500 leading-loose mb-4">
            ZUKEは「植物の支柱」という実用品に、<br />
            デザインの視点を持ち込んだブランドです。
          </p>
          <p className="text-xs font-light text-gray-500 leading-loose mb-10">
            観葉植物が部屋に溶け込むように、<br />
            支柱もまた空間の一部であるべき——<br />
            そんな考えから生まれた、鉄製のプランツポールです。
          </p>

          {/* gallery-4：縦型カード（右側の被写体にフォーカス） */}
          <div className="relative w-full max-w-[260px] aspect-[3/4] overflow-hidden mb-10">
            <Image
              src="/gallery-4.webp"
              alt="ZUKE インテリアシーン"
              fill
              className="object-cover object-right"
              sizes="260px"
            />
          </div>

          <div className="grid grid-cols-2 gap-6 border-t border-gray-100 pt-8">
            {[
              { k: "Material", v: "Iron Steel" },
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
    </section>
  );
}
