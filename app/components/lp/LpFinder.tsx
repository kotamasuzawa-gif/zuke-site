import PlantFinder from "@/app/components/PlantFinder";

export function LpFinder() {
  return (
    <section aria-labelledby="finder-heading" className="mx-auto w-full max-w-[1120px] px-5 py-12 min-[601px]:px-8 min-[601px]:py-16">
      <div className="rounded-[20px] border border-[#E5DDCF] bg-[#FFFDF8] p-6 min-[601px]:p-10">
        <p className="text-[12px] font-bold tracking-[0.22em] text-[#6B6259]">FIND YOUR POLE</p>
        <h2 id="finder-heading" className="mt-3 text-[26px] font-black leading-snug min-[601px]:text-[32px]">
          質問に答えて、合う一本を選ぶ。
        </h2>
        <p className="mt-4 max-w-[36em] text-[15px] leading-relaxed text-[#6B6259]">
          鉢の大きさ、アイアンか樹脂か。いまの株に近い答えを選ぶと、合う商品が出ます。
        </p>
        <a
          href="#plant-finder"
          className="mt-6 inline-flex min-h-12 items-center rounded-full border border-[#5E7F3B] px-7 text-[15px] font-bold text-[#5E7F3B] hover:bg-[#5E7F3B] hover:text-white"
        >
          診断して選ぶ
        </a>
        <div id="plant-finder" className="mt-10 scroll-mt-24 border-t border-[#E5DDCF] pt-8">
          <PlantFinder />
        </div>
      </div>
    </section>
  );
}
