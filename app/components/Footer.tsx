export default function Footer() {
  return (
    <footer className="border-t border-[var(--line)] bg-[var(--bg)] px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex items-center gap-2.5">
          <span className="inline-block h-1.5 w-1.5 rotate-45 bg-[var(--accent)]" style={{ boxShadow: "0 0 8px var(--glow)" }} />
          <span className="text-base font-bold tracking-[0.3em] text-[var(--fg)]">ZUKE</span>
        </div>
        <p className="font-mono text-[10px] tracking-wider text-[var(--muted)]/70">© 2025 ZUKE. All rights reserved.</p>
        <div className="flex gap-6">
          {["プライバシーポリシー", "特定商取引法に基づく表記"].map((l) => (
            <a key={l} href="#" className="text-xs text-[var(--muted)]/70 transition-colors hover:text-[var(--accent)]">
              {l}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
