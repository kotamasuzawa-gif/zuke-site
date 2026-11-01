import { Noto_Sans_JP } from "next/font/google";
import { LpFaq } from "./LpFaq";
import { LpFeatures } from "./LpFeatures";
import { LpFinalCta } from "./LpFinalCta";
import { LpFinder } from "./LpFinder";
import { LpFooter } from "./LpFooter";
import { LpHeader } from "./LpHeader";
import { LpHero } from "./LpHero";
import { LpLibrary } from "./LpLibrary";
import { LpLineup } from "./LpLineup";
import { LpStickyBuy } from "./LpStickyBuy";
import { stickyBuyLabel } from "./lineup";

// トップだけ 900 を足す。layout の 400/700 はそのまま（他ページの見た目を変えない）。
const lpFont = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  display: "swap",
});

export function HomeLanding() {
  return (
    <div className={`${lpFont.className} min-h-screen bg-[#F6F1E7] text-[#1A1A1A] antialiased max-[600px]:pb-20`}>
      <LpHeader />
      <main>
        <LpHero />
        <LpFeatures />
        <LpFinder />
        <LpLineup />
        <LpFaq />
        <LpFinalCta />
        <LpLibrary />
      </main>
      <LpFooter />
      <LpStickyBuy label={stickyBuyLabel()} />
    </div>
  );
}
