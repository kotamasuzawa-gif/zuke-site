const values = [
  {
    title: "インテリアとして成立するデザイン",
    body: "支柱を隠す必要はない。六角形やうねりのフォルムは、それ自体が部屋に飾れるオブジェとして設計されています。",
  },
  {
    title: "植物の個性に寄り添う形",
    body: "蔓性植物、横広がりの葉、立ち上がる茎。植物ごとの成長の方向性に合わせた形状を追求しています。",
  },
  {
    title: "鉄素材の誠実さ",
    body: "スチール製だから錆びにくく、長く使える。使い込むほど出る風合いも、ZUKEの支柱ならではの味わいです。",
  },
];

export default function About() {
  return (
    <section id="about" className="py-28 px-6 bg-stone-50">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Text side */}
          <div>
            <p className="text-xs tracking-[0.4em] text-green-700 uppercase mb-3">About</p>
            <h2 className="text-3xl md:text-4xl font-bold text-stone-800 tracking-tight mb-8 leading-snug">
              支柱を、<br />
              インテリアにする。
            </h2>
            <p className="text-stone-500 leading-relaxed mb-10 text-sm">
              ZUKEは「植物の支柱」という実用品に、デザインの視点を持ち込んだブランドです。<br /><br />
              観葉植物が部屋に溶け込むように、支柱もまた空間の一部であるべき——
              そんな考えから生まれた、鉄製のプランツポールです。
            </p>

            <div className="space-y-8">
              {values.map((v) => (
                <div key={v.title} className="flex gap-6">
                  <div className="w-px bg-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-stone-800 text-sm mb-2 tracking-wide">{v.title}</h3>
                    <p className="text-stone-500 text-sm leading-relaxed">{v.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual side — hexagon motif */}
          <div className="relative">
            <div className="aspect-[3/4] bg-stone-100 flex items-center justify-center overflow-hidden">
              <svg viewBox="0 0 200 280" width="160" className="text-stone-300">
                {/* Stacked hexagons as abstract pole shape */}
                {[40, 100, 160, 220].map((cy, i) => (
                  <polygon
                    key={i}
                    points={`100,${cy - 28} 124,${cy - 14} 124,${cy + 14} 100,${cy + 28} 76,${cy + 14} 76,${cy - 14}`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={i === 1 ? "2" : "1"}
                    opacity={i === 1 ? "1" : "0.5"}
                  />
                ))}
                {/* Vertical connector */}
                <line x1="100" y1="12" x2="100" y2="248" stroke="currentColor" strokeWidth="1" opacity="0.2" />
              </svg>
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-green-100 -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
