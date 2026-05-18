export default function Contact() {
  return (
    <section id="contact" className="py-28 px-8 bg-[#2a2520] text-[#faf9f6]">
      <div className="max-w-3xl mx-auto text-center">

        <div className="flex items-center justify-center gap-4 mb-10">
          <div className="w-12 h-px bg-[#8b7a6a]" />
          <p className="text-[10px] tracking-[0.5em] text-[#8fa882] uppercase">Contact</p>
          <div className="w-12 h-px bg-[#8b7a6a]" />
        </div>

        <h2
          className="text-2xl md:text-3xl font-light tracking-[0.15em] mb-6"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          お気軽にご相談ください
        </h2>

        <div className="w-px h-8 bg-[#6b6456] mx-auto mb-8" />

        <p className="text-[#a09080] text-sm leading-loose mb-12 tracking-wide" style={{ fontFamily: "var(--font-serif)" }}>
          商品についてのご質問、大口注文、<br />
          卸売のご相談などお気軽にどうぞ。
        </p>

        <a
          href="https://zukeplants.base.shop/contact"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-12 py-4 border border-[#6b6456] text-[#d9d2c5] text-xs tracking-[0.3em] hover:border-[#faf9f6] hover:text-[#faf9f6] transition-colors duration-300"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          お　問　い　合　わ　せ　→
        </a>

        <div className="mt-16 flex justify-center gap-12 border-t border-[#3d3830] pt-12">
          <a
            href="https://www.instagram.com/zuke.plantspole/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-3 text-[#6b6456] hover:text-[#a09080] transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
            </svg>
            <span className="text-[10px] tracking-[0.2em]">@zuke.plantspole</span>
          </a>
          <a
            href="https://zukeplants.base.shop/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-3 text-[#6b6456] hover:text-[#a09080] transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            <span className="text-[10px] tracking-[0.2em]">SHOP</span>
          </a>
        </div>
      </div>
    </section>
  );
}
