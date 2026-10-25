// 2026-10-25 増澤さん指示「LPからnoteを見れるように」: ZUKE 公式 note の新着記事をホームに出す（1時間ごとに更新）。
// 画像は note の CDN をそのまま <img> で表示（next/image の remotePatterns に足さない）。
const NOTE_URL = "https://note.com/zuke_plantspole";

type NoteItem = { key: string; name: string; eyecatch: string | null; publishAt: string; price: number };

async function fetchNotes(): Promise<NoteItem[]> {
  try {
    const r = await fetch("https://note.com/api/v2/creators/zuke_plantspole/contents?kind=note&page=1", { next: { revalidate: 3600 } });
    if (!r.ok) return [];
    const j = await r.json();
    return (j?.data?.contents ?? []).slice(0, 6).map((n: Record<string, unknown>) => ({
      key: String(n.key), name: String(n.name), eyecatch: (n.eyecatch as string) ?? null, publishAt: String(n.publishAt ?? ""), price: Number(n.price ?? 0),
    }));
  } catch {
    return [];
  }
}

export async function NoteArticles() {
  const notes = await fetchNotes();
  if (notes.length === 0) return null;
  return (
    <section className="px-4 md:px-6 py-14 max-w-6xl mx-auto" aria-label="note の読みもの">
      <div className="flex items-baseline justify-between mb-6">
        <h2 className="text-xl md:text-2xl font-bold tracking-wide text-[#222]">読みもの（note）</h2>
        <a href={NOTE_URL} target="_blank" rel="noopener noreferrer" className="text-sm text-[#5E7F3B] hover:underline">すべて見る →</a>
      </div>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.map((n) => (
          <li key={n.key}>
            <a href={`${NOTE_URL}/n/${n.key}`} target="_blank" rel="noopener noreferrer" className="block group">
              {n.eyecatch && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={n.eyecatch} alt="" loading="lazy" className="w-full aspect-[1280/670] object-cover rounded-lg border border-[#e5e5e0]" />
              )}
              <p className="mt-3 text-sm leading-relaxed text-[#222] group-hover:underline line-clamp-2">{n.name}</p>
              <p className="mt-1 text-xs text-neutral-500">{n.publishAt.slice(0, 10).replace(/-/g, "/")}{n.price > 0 ? `・有料 ${n.price.toLocaleString()}円` : ""}</p>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
