"use client";

import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { label: "ITEMS", href: "#products" },
    { label: "ABOUT", href: "#about" },
    { label: "HOW TO USE", href: "#howto" },
    { label: "CONTACT", href: "#contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        <a href="#" className="text-sm font-medium tracking-[0.25em] text-gray-900">
          ZUKE
        </a>

        <nav className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-xs text-gray-500 hover:text-gray-900 transition-colors tracking-[0.15em]"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="https://zukeplants.base.shop/"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:block text-xs text-gray-500 hover:text-gray-900 transition-colors tracking-[0.15em]"
        >
          SHOP →
        </a>

        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="メニュー"
        >
          <div className="flex flex-col gap-1.5">
            <span className={`block w-5 h-px bg-gray-900 transition-transform ${menuOpen ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`block w-5 h-px bg-gray-900 transition-opacity ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-5 h-px bg-gray-900 transition-transform ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
          </div>
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-6 flex flex-col gap-5">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="text-xs text-gray-500 hover:text-gray-900 tracking-[0.15em]"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
