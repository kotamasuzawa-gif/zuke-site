export default function Footer() {
  return (
    <footer className="bg-[#1c1a17] py-8 px-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="text-sm font-light tracking-[0.4em] text-[#6b6456]" style={{ fontFamily: "var(--font-serif)" }}>
          ZUKE
        </span>
        <p className="text-[10px] text-[#4a4540] tracking-wider">© 2025 ZUKE. All rights reserved.</p>
        <div className="flex gap-8">
          {["プライバシーポリシー", "特定商取引法に基づく表記"].map((l) => (
            <a key={l} href="#" className="text-[10px] text-[#4a4540] hover:text-[#6b6456] transition-colors tracking-wider">
              {l}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
