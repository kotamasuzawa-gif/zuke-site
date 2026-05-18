export default function About() {
  return (
    <section id="about" className="py-24 px-6 bg-[#f7f5f2]">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-20 items-center">

          {/* テキスト */}
          <div>
            <p className="text-xs tracking-[0.4em] text-gray-400 mb-10">ABOUT</p>
            <h2 className="text-2xl md:text-3xl font-light text-gray-900 leading-relaxed tracking-wide mb-10">
              支柱を、<br />インテリアにする。
            </h2>
            <p className="text-sm text-gray-500 leading-loose mb-10">
              ZUKEは「植物の支柱」という実用品に、<br />
              デザインの視点を持ち込んだブランドです。
            </p>
            <p className="text-sm text-gray-500 leading-loose">
              観葉植物が部屋に溶け込むように、<br />
              支柱もまた空間の一部であるべき——<br />
              そんな考えから生まれた、鉄製のプランツポールです。
            </p>
          </div>

          {/* ビジュアル */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Design", text: "インテリアとして成立するデザイン" },
              { label: "Material", text: "スチール製。錆びにくく長く使える" },
              { label: "Form", text: "植物の個性に寄り添う形状" },
              { label: "Size", text: "4サイズで植物に合わせて選べる" },
            ].map((item) => (
              <div key={item.label} className="bg-white p-6">
                <p className="text-[10px] tracking-[0.3em] text-gray-300 mb-3">{item.label}</p>
                <p className="text-xs text-gray-600 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
