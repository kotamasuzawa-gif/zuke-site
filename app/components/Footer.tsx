export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 py-10 px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <span className="text-[11px] tracking-[0.4em] text-black font-light">ZUKE</span>
        <p className="text-[9px] tracking-[0.2em] text-gray-300 font-light">© 2025 ZUKE. All rights reserved.</p>
        <div className="flex gap-8">
          {["プライバシーポリシー", "特定商取引法に基づく表記"].map((l) => (
            <a key={l} href="#" className="text-[9px] tracking-[0.2em] text-gray-300 hover:text-black transition-colors font-light">
              {l}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
