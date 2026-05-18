const steps = [
  {
    step: "01",
    title: "サイズを選ぶ",
    body: "株の高さに合わせてサイズを選びます。蔓性には六角形タイプ、横広がりにはうねうねタイプ。",
  },
  {
    step: "02",
    title: "土に差し込む",
    body: "根に当たらない位置に支柱を深めに差し込みます。",
  },
  {
    step: "03",
    title: "植物を沿わせる",
    body: "蔓をフレームにくぐらせたり、茎を麻紐でゆるく結んで誘引します。",
  },
  {
    step: "04",
    title: "成長に合わせる",
    body: "大きくなったらサイズアップや複数本使いで、自分だけの飾り方を。",
  },
];

export default function HowTo() {
  return (
    <section id="howto" className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">

        <p className="text-xs tracking-[0.4em] text-gray-400 mb-16">HOW TO USE</p>

        <div className="grid md:grid-cols-4 gap-px bg-gray-100">
          {steps.map((s) => (
            <div key={s.step} className="bg-white px-8 py-10">
              <p className="text-[10px] tracking-[0.3em] text-gray-300 mb-6">{s.step}</p>
              <h3 className="text-sm text-gray-900 mb-4 font-medium">{s.title}</h3>
              <p className="text-xs text-gray-500 leading-loose">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
