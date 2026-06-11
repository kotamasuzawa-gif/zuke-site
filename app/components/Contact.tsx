import Reveal from "./Reveal";

export default function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden border-t border-[var(--line)] px-6 py-32 md:py-40">
      {/* glow field */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(50% 60% at 50% 50%, rgba(92,242,176,0.10), transparent 70%)" }}
        aria-hidden
      />
      <div className="bg-grid bg-grid-fade pointer-events-none absolute inset-0 opacity-40" aria-hidden />

      <div className="relative mx-auto max-w-3xl text-center">
        <Reveal>
          <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.4em] text-[var(--accent)]">[ 04 ] Contact</p>
          <h2 className="mb-6 text-4xl font-thin tracking-tight text-[var(--fg)] md:text-5xl">
            お気軽に<span className="accent text-glow">ご相談</span>ください
          </h2>
          <p className="mb-12 text-sm font-light leading-relaxed text-[var(--muted)]">
            商品についてのご質問、大口注文、卸売のご相談など、<br className="hidden md:block" />
            お気軽にお問い合わせください。
          </p>
        </Reveal>

        <Reveal delay={120}>
          <a
            href="https://zukeplants.base.shop/contact"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-block overflow-hidden rounded-full border border-[var(--accent)]/60 px-10 py-4 font-mono text-[12px] tracking-[0.3em] text-[var(--accent)] transition-colors duration-300 hover:text-black"
            style={{ boxShadow: "0 0 24px rgba(92,242,176,0.18)" }}
          >
            <span className="relative z-10">お問い合わせフォームへ →</span>
            <span className="absolute inset-0 -translate-x-full bg-[var(--accent)] transition-transform duration-500 group-hover:translate-x-0" aria-hidden />
          </a>
        </Reveal>

        <Reveal delay={200}>
          <div className="mt-16 flex justify-center gap-12">
            <a
              href="https://www.instagram.com/zuke.plantspole/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-2 text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
              <span className="font-mono text-[10px] tracking-widest">@zuke.plantspole</span>
            </a>
            <a
              href="https://zukeplants.base.shop/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-2 text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              <span className="font-mono text-[10px] tracking-widest">SHOP</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
