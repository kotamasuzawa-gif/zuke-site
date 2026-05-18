export default function Hero() {
  return (
    <section className="pt-14 min-h-screen flex flex-col">
      {/* メインビジュアル */}
      <div className="flex-1 bg-[#f4f2ee] flex items-center justify-center relative overflow-hidden">
        {/* 商品シルエットの背景 */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.06]">
          <svg viewBox="0 0 400 600" className="w-64 h-auto">
            <rect x="185" y="0" width="30" height="480" rx="15" fill="#1a1a1a" />
            <polygon points="200,600 160,480 240,480" fill="#1a1a1a" />
            {[100, 200, 320, 430].map((cy, i) => (
              <polygon
                key={i}
                points={`200,${cy - 50} 243,${cy - 25} 243,${cy + 25} 200,${cy + 50} 157,${cy + 25} 157,${cy - 25}`}
                fill="none"
                stroke="#1a1a1a"
                strokeWidth="6"
              />
            ))}
          </svg>
        </div>

        <div className="relative text-center px-8 py-32">
          <p className="text-xs tracking-[0.4em] text-gray-400 mb-8">Plants Pole Brand</p>
          <h1 className="text-[80px] md:text-[120px] font-thin tracking-[0.2em] text-gray-900 leading-none mb-8">
            ZUKE
          </h1>
          <p className="text-sm text-gray-400 tracking-[0.15em] leading-loose">
            Products inspired by plants.
          </p>
        </div>
      </div>

      {/* 下部アクション */}
      <div className="bg-white py-10 px-8 flex flex-col sm:flex-row items-center justify-center gap-6 border-t border-gray-100">
        <a
          href="#products"
          className="text-xs tracking-[0.3em] text-gray-900 border-b border-gray-900 pb-0.5 hover:text-gray-500 hover:border-gray-500 transition-colors"
        >
          VIEW ITEMS
        </a>
        <span className="hidden sm:block w-px h-4 bg-gray-200" />
        <a
          href="https://zukeplants.base.shop/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs tracking-[0.3em] text-gray-400 hover:text-gray-900 transition-colors"
        >
          ONLINE SHOP →
        </a>
      </div>
    </section>
  );
}
