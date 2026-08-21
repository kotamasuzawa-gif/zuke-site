const steps = [
  {
    step: "01",
    title: "植物と支柱のサイズを合わせる",
    body: "株の高さに合わせてサイズを選びます。蔓性植物には六角形タイプ、横広がりの植物にはうねうねタイプが適しています。",
  },
  {
    step: "02",
    title: "鉢の土に差し込む",
    body: "支柱の先端を根に当たらない位置に差し込みます。安定するまで深めに刺すのがポイントです。",
  },
  {
    step: "03",
    title: "茎や蔓を支柱に沿わせる",
    body: "蔓を六角形のフレームにくぐらせたり、茎を添わせて麻紐でゆるく結んだりして、植物を誘引します。",
  },
  {
    step: "04",
    title: "成長に合わせて調整する",
    body: "植物が成長したら、より大きなサイズへの移行や複数本での使用も。育てながら自分だけの飾り方を見つけてください。",
  },
];

export default function HowTo() {
  return (
    <section id="howto" className="py-24 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <p className="zk-label mb-5">( GUIDE )</p>
          <h2 className="font-[family-name:var(--font-geist-mono)] text-2xl md:text-3xl tracking-[0.12em] text-neutral-100">HOW TO</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-[#2a2a28]">
          {steps.map((s) => (
            <div key={s.step} className="bg-[#151514] p-8 hover:bg-[#1b1b1a] transition-colors">
              <p className="font-[family-name:var(--font-geist-mono)] text-4xl text-neutral-700 mb-6 leading-none">{s.step}</p>
              <h3 className="font-semibold text-neutral-100 text-sm tracking-wide mb-3">{s.title}</h3>
              <p className="text-sm text-neutral-400 leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
