"use client";

import { useState, useEffect } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "商品", href: "#products" },
    { label: "ブランドについて", href: "#about" },
    { label: "使い方", href: "#howto" },
    { label: "お問い合わせ", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-[#faf9f6]/95 backdrop-blur-sm border-b border-[#d9d2c5]" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-8 h-16 flex items-center justify-between">
        <a href="#" className="font-serif text-lg tracking-[0.3em] text-[#1c1a17]" style={{ fontFamily: "var(--font-serif)" }}>
          ZUKE
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-10">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-xs text-[#6b6456] hover:text-[#1c1a17] transition-colors tracking-[0.15em]"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="メニュー"
        >
          <span className={`block w-5 h-px bg-[#1c1a17] transition-transform duration-200 ${menuOpen ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`block w-5 h-px bg-[#1c1a17] transition-opacity duration-200 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-px bg-[#1c1a17] transition-transform duration-200 ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-[#faf9f6] border-t border-[#d9d2c5] px-8 py-6 flex flex-col gap-5">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="text-sm text-[#6b6456] hover:text-[#1c1a17] transition-colors tracking-[0.15em]"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
