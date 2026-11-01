import Image from "next/image";
import { lpShopUrl } from "./utm";

export function LpHero() {
  return (
    <section className="mx-auto grid w-full max-w-[1120px] items-center gap-8 px-5 py-10 min-[601px]:px-8 min-[601px]:py-16 min-[901px]:grid-cols-2 min-[901px]:gap-14">
      <div>
        <p className="text-[12px] font-bold tracking-[0.22em] text-[#6B6259]">PLANTS POLE</p>
        <h1 className="mt-4 text-[32px] font-black leading-[1.3] tracking-tight min-[601px]:text-[44px] min-[1100px]:text-[52px]">
          垂らすだけの植物を、“魅せる”かたちに。
        </h1>
        <p className="mt-5 max-w-[34em] text-[15px] leading-relaxed text-[#6B6259] min-[601px]:text-[16px]">
          モンステラやポトスの垂れた蔓を、六角形の支柱で立ち上げる。鉢に挿すだけ。インテリアに馴染む園芸支柱、ZUKE の PLANTS POLE。
        </p>
        <a
          id="fv-cta"
          href={lpShopUrl("fv")}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex min-h-12 items-center rounded-full bg-[#F06A1E] px-7 text-[15px] font-bold text-white hover:opacity-90"
        >
          ショップで見る
        </a>
        <p className="mt-4 max-w-[34em] text-[13px] leading-relaxed text-[#6B6259]">
          アイアンはブラック・ホワイト。3Dプリントはブラック・ホワイト・ライトグレー・オレンジ。
        </p>
      </div>
      <div className="relative aspect-square overflow-hidden rounded-[20px] border border-[#E5DDCF] bg-[#FFFDF8]">
        <Image
          src="/guide/marupot-planted-hex3.webp"
          alt="黒い丸鉢に植えた植物と、オレンジの六角形支柱。隣にオレンジの鉢カバー"
          fill
          priority
          sizes="(max-width: 600px) 92vw, 540px"
          className="object-contain"
        />
      </div>
    </section>
  );
}
