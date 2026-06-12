import Header from "./components/Header";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Products from "./components/Products";
import { PhotoBreak1, PhotoStrip } from "./components/Gallery";
import About from "./components/About";
import HowTo from "./components/HowTo";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />          {/* フルスクリーン写真＋パララックス */}
        <Marquee />       {/* 無限スクロールバー */}
        <Products />      {/* グラスカード＋ティルト */}
        <About />         {/* 写真＋テキスト＋gallery-4 */}
        <HowTo />         {/* ステップ */}
        <PhotoBreak1 />   {/* 縦型スライダー */}
        <PhotoStrip />    {/* 縦型3枚 */}
        <Contact />       {/* CTA */}
      </main>
      <Footer />
    </>
  );
}
