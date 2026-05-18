const steps = [
  {
    step: "一",
    title: "植物と支柱のサイズを合わせる",
    body: "株の高さに合わせてサイズを選びます。蔓性植物には六角形タイプ、横広がりの植物にはうねうねタイプが適しています。",
  },
  {
    step: "二",
    title: "鉢の土に差し込む",
    body: "支柱の先端を根に当たらない位置に差し込みます。安定するまで深めに刺すのがポイントです。",
  },
  {
    step: "三",
    title: "茎や蔓を支柱に沿わせる",
    body: "蔓を六角形のフレームにくぐらせたり、茎を添わせて麻紐でゆるく結んだりして、植物を誘引します。",
  },
  {
    step: "四",
    title: "成長に合わせて調整する",
    body: "植物が成長したら、より大きなサイズへの移行や複数本での使用も。育てながら自分だけの飾り方を見つけてください。",
  },
];

export default function HowTo() {
  return (
    <section id="howto" className="py-28 px-8 bg-[#faf9f6]">
      <div className="max-w-6xl mx-auto">

        <div className="flex items-center gap-6 mb-16">
          <div className="w-px h-12 bg-[#8fa882]" />
          <div>
            <p className="text-[10px] tracking-[0.5em] text-[#8b7a6a] uppercase mb-1">How to use</p>
            <h2 className="text-2xl md:text-3xl font-light text-[#1c1a17] tracking-[0.1em]" style={{ fontFamily: "var(--font-serif)" }}>
              使い方ガイド
            </h2>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-0 border-t border-l border-[#e0d8ce]">
          {steps.map((s) => (
            <div key={s.step} className="border-b border-r border-[#e0d8ce] p-8 hover:bg-[#f5f0e8] transition-colors">
              <p
                className="text-3xl font-light text-[#d9d2c5] mb-6"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                {s.step}
              </p>
              <h3
                className="text-sm font-medium text-[#1c1a17] tracking-wide mb-3"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                {s.title}
              </h3>
              <p className="text-xs text-[#6b6456] leading-loose">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
