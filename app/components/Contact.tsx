export default function Contact() {
  return (
    <section id="contact" className="py-28 px-6 bg-stone-800 text-white">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-xs tracking-[0.4em] text-green-400 uppercase mb-4">Contact</p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
          お気軽にご相談ください
        </h2>
        <p className="text-stone-400 text-sm leading-relaxed mb-12">
          商品についてのご質問、大口注文、卸売のご相談など、<br className="hidden md:block" />
          お気軽にお問い合わせください。
        </p>
        <a
          href="https://zukeplants.base.shop/contact"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-10 py-4 border border-stone-500 text-white text-sm tracking-widest hover:border-white hover:bg-white hover:text-stone-800 transition-all duration-200"
        >
          お問い合わせフォームへ →
        </a>

        <div className="mt-16 flex justify-center gap-10">
          <a
            href="https://www.instagram.com/zuke.plantspole/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-2 text-stone-500 hover:text-stone-300 transition-colors group"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
            </svg>
            <span className="text-xs tracking-widest">@zuke.plantspole</span>
          </a>
          <a
            href="https://zukeplants.base.shop/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-2 text-stone-500 hover:text-stone-300 transition-colors group"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            <span className="text-xs tracking-widest">BASE SHOP</span>
          </a>
        </div>
      </div>
    </section>
  );
}
