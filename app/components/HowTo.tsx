import Reveal from "./Reveal";

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
    <section id="howto" className="relative border-t border-[var(--line)] px-6 py-28 md:py-36">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="mb-16">
            <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.4em] text-[var(--accent)]">[ 03 ] How to use</p>
            <h2 className="text-4xl font-thin tracking-tight text-[var(--fg)] md:text-5xl">使い方ガイド</h2>
          </div>
        </Reveal>

        <div className="grid gap-px bg-[var(--line)] md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal key={s.step} delay={i * 100}>
              <div className="group relative h-full overflow-hidden bg-[var(--bg)] p-8 transition-colors duration-300 hover:bg-white/[0.02]">
                <span
                  className="block text-5xl font-thin leading-none text-transparent transition-all duration-300"
                  style={{
                    WebkitTextStroke: "1px rgba(92,242,176,0.45)",
                  }}
                >
                  {s.step}
                </span>
                <span className="my-6 block h-px w-8 bg-[var(--accent)] transition-all duration-500 group-hover:w-16" />
                <h3 className="mb-3 text-sm font-semibold tracking-wide text-[var(--fg)]">{s.title}</h3>
                <p className="text-sm leading-relaxed text-[var(--muted)]">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
