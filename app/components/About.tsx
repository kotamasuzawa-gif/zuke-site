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
    <section id="about" className="py-28 px-8 bg-[#f5f0e8]">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-20 items-center">

          {/* テキスト */}
          <div>
            <div className="flex items-center gap-6 mb-12">
              <div className="w-px h-12 bg-[#8fa882]" />
              <div>
                <p className="text-[10px] tracking-[0.5em] text-[#8b7a6a] uppercase mb-1">About</p>
                <h2 className="text-2xl md:text-3xl font-light text-[#1c1a17] tracking-[0.1em]" style={{ fontFamily: "var(--font-serif)" }}>
                  支柱を、<br />インテリアにする。
                </h2>
              </div>
            </div>

            <p className="text-sm text-[#6b6456] leading-loose mb-12 tracking-wide" style={{ fontFamily: "var(--font-serif)" }}>
              ZUKEは「植物の支柱」という実用品に、<br />
              デザインの視点を持ち込んだブランドです。<br /><br />
              観葉植物が部屋に溶け込むように、<br />
              支柱もまた空間の一部であるべき——
            </p>

            <div className="space-y-8">
              {values.map((v, i) => (
                <div key={v.title} className="flex gap-6">
                  <div className="flex-shrink-0 pt-1">
                    <span className="text-[10px] text-[#8fa882] tracking-widest">0{i + 1}</span>
                  </div>
                  <div className="border-t border-[#d9d2c5] pt-4 flex-1">
                    <h3 className="text-sm font-medium text-[#1c1a17] mb-2 tracking-wide" style={{ fontFamily: "var(--font-serif)" }}>
                      {v.title}
                    </h3>
                    <p className="text-xs text-[#6b6456] leading-loose">{v.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ビジュアル */}
          <div className="relative flex justify-center">
            <div className="w-64 h-80 bg-[#ede8e0] flex items-center justify-center relative">
              {/* 六角形モチーフ */}
              <svg viewBox="0 0 160 220" width="120" className="text-[#b0a898]">
                {[35, 85, 135, 185].map((cy, i) => (
                  <polygon
                    key={i}
                    points={`80,${cy - 22} 99,${cy - 11} 99,${cy + 11} 80,${cy + 22} 61,${cy + 11} 61,${cy - 11}`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={i === 1 ? "1.5" : "0.8"}
                    opacity={i === 1 ? "1" : "0.4"}
                  />
                ))}
                <line x1="80" y1="10" x2="80" y2="210" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
              </svg>
            </div>
            {/* オフセット装飾 */}
            <div className="absolute -bottom-3 -right-3 w-20 h-20 border border-[#c8b89a] -z-10" />
            <div className="absolute -top-3 -left-3 w-10 h-10 bg-[#8fa882] opacity-20 -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
