export default function Footer() {
  return (
    <footer className="bg-stone-900 py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="text-base font-bold tracking-[0.3em] text-stone-300">ZUKE</span>
        <p className="text-xs text-stone-600">© 2025 ZUKE. All rights reserved.</p>
        <div className="flex gap-6">
          {["プライバシーポリシー", "特定商取引法に基づく表記"].map((l) => (
            <a key={l} href="#" className="text-xs text-stone-600 hover:text-stone-400 transition-colors">
              {l}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
