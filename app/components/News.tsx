// 2026-08-21 Ducks(plants.)風: 日付＋タイトルのNEWSリスト
const news = [
  { date: "2026/08/21", title: "ホームページをリニューアルしました" },
  { date: "2026/08/15", title: "Google検索への対応を強化しました" },
  { date: "2026/05/13", title: "卸売のお取引に関するご案内を開始しました" },
];

export default function News() {
  return (
    <section id="news" className="px-4 md:px-6 py-16 max-w-6xl mx-auto" aria-label="お知らせ">
      <h2 className="font-[family-name:var(--font-geist-mono)] text-2xl md:text-3xl tracking-[0.12em] text-neutral-900 mb-8">
        NEWS
      </h2>
      <ul className="border-t border-[#e5e5e0]">
        {news.map((n) => (
          <li
            key={n.date + n.title}
            className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-8 py-5 border-b border-[#e5e5e0]"
          >
            <span className="font-[family-name:var(--font-geist-mono)] text-xs tracking-[0.15em] text-neutral-500 flex-shrink-0">
              {n.date}
            </span>
            <span className="text-sm text-neutral-800">{n.title}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
