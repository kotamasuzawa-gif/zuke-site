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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-sm shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="text-xl font-bold tracking-[0.2em] text-stone-800">
          ZUKE
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-stone-600 hover:text-stone-900 transition-colors tracking-wide"
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
          <span className={`block w-6 h-0.5 bg-stone-800 transition-transform duration-200 ${menuOpen ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`block w-6 h-0.5 bg-stone-800 transition-opacity duration-200 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-stone-800 transition-transform duration-200 ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-stone-100 px-6 py-4 flex flex-col gap-4">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="text-sm text-stone-600 hover:text-stone-900 transition-colors py-1"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
