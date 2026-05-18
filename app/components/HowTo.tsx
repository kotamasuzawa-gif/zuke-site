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
    <section id="howto" className="py-28 px-8 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto">

        <div className="flex items-baseline gap-16 mb-20">
          <p className="text-[10px] tracking-[0.5em] text-gray-300 font-light">HOW TO USE</p>
        </div>

        <div className="grid md:grid-cols-4 gap-16">
          {steps.map((s) => (
            <div key={s.step}>
              <p className="text-[9px] tracking-[0.4em] text-gray-200 mb-8 font-light">{s.step}</p>
              <h3 className="text-[13px] font-light text-black mb-5 tracking-wide">{s.title}</h3>
              <p className="text-[11px] font-light text-gray-400 leading-loose">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
