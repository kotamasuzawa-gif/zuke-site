const items = ['"魅せる"園芸支柱', "PLANTS POLE", "DESIGNED IN JAPAN", "IRON STEEL", "FOR INDOOR PLANTS"];

export default function Marquee() {
  // duplicate the run so the -50% translate loops seamlessly
  const run = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-[var(--line)] bg-[var(--bg-soft)] py-4">
      <div className="flex w-max animate-marquee whitespace-nowrap will-change-transform">
        {run.map((t, i) => (
          <span key={i} className="flex items-center text-[11px] tracking-[0.45em] text-[var(--muted)] font-mono uppercase">
            <span className="px-8">{t}</span>
            <span
              aria-hidden
              className="inline-block h-1 w-1 rotate-45 bg-[var(--accent)]"
              style={{ boxShadow: "0 0 8px var(--glow)" }}
            />
          </span>
        ))}
      </div>
      {/* edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[var(--bg-soft)] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[var(--bg-soft)] to-transparent" />
    </div>
  );
}
