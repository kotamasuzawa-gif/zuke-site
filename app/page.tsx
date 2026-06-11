import Header from "./components/Header";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Products from "./components/Products";
import About from "./components/About";
import HowTo from "./components/HowTo";
import Showcase from "./components/Showcase";
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
        <About />         {/* 写真1枚＋テキスト */}
        <HowTo />         {/* ステップ */}
        <Showcase />      {/* 自己描画する六角形ポール（純モーション・写真なし） */}
        <Contact />       {/* CTA */}
      </main>
      <Footer />
    </>
  );
}
