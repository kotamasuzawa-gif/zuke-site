"use client";

import { useState, useEffect } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "商品", href: "#products", idx: "01" },
    { label: "ブランドについて", href: "#about", idx: "02" },
    { label: "使い方", href: "#howto", idx: "03" },
    { label: "お問い合わせ", href: "#contact", idx: "04" },
  ];

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "border-b border-[var(--line)] bg-black/55 backdrop-blur-xl" : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="#" className="group flex items-center gap-2.5">
          <span
            className="inline-block h-1.5 w-1.5 rotate-45 bg-[var(--accent)] transition-transform duration-300 group-hover:rotate-[135deg]"
            style={{ boxShadow: "0 0 10px var(--glow)" }}
          />
          <span className="text-lg font-bold tracking-[0.3em] text-[var(--fg)] text-glow">ZUKE</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden gap-9 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="group relative flex items-center gap-1.5 py-1">
              <span className="font-mono text-[9px] text-[var(--accent)] opacity-70">{l.idx}</span>
              <span className="text-[13px] tracking-wide text-[var(--muted)] transition-colors duration-200 group-hover:text-[var(--fg)]">
                {l.label}
              </span>
              <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-[var(--accent)] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Mobile menu button */}
        <button
          className="flex flex-col gap-1.5 p-1 md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="メニュー"
        >
          <span className={`block h-0.5 w-6 bg-[var(--fg)] transition-transform duration-200 ${menuOpen ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`block h-0.5 w-6 bg-[var(--fg)] transition-opacity duration-200 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block h-0.5 w-6 bg-[var(--fg)] transition-transform duration-200 ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="flex flex-col gap-1 border-t border-[var(--line)] bg-black/85 px-6 py-4 backdrop-blur-xl md:hidden">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2.5 py-2.5 text-sm text-[var(--muted)] transition-colors hover:text-[var(--fg)]"
            >
              <span className="font-mono text-[10px] text-[var(--accent)]">{l.idx}</span>
              {l.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
