export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 py-8 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="text-xs tracking-[0.3em] text-gray-400">ZUKE</span>
        <p className="text-[10px] text-gray-300">© 2025 ZUKE. All rights reserved.</p>
        <div className="flex gap-8">
          {["プライバシーポリシー", "特定商取引法に基づく表記"].map((l) => (
            <a key={l} href="#" className="text-[10px] text-gray-300 hover:text-gray-600 transition-colors">
              {l}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
