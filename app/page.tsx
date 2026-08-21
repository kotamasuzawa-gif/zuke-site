import Header from "./components/Header";
import Hero from "./components/Hero";
import InfoCards from "./components/InfoCards";
import News from "./components/News";
import Products from "./components/Products";
import { PhotoBreak1, PhotoStrip } from "./components/Gallery";
import About from "./components/About";
import HowTo from "./components/HowTo";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { JsonLd } from "./components/JsonLd";

export default function Home() {
  return (
    <>
      <JsonLd />
      <Header />
      <main>
        <Hero />          {/* 写真 */}
        <InfoCards />     {/* NOTICE＋2×2カード */}
        <Products />      {/* テキスト */}
        <About />         {/* 写真＋テキスト＋gallery-4 */}
        <HowTo />         {/* テキスト */}
        <PhotoBreak1 />   {/* 写真スライダー */}
        <PhotoStrip />    {/* 写真3枚 */}
        <News />          {/* お知らせ */}
        <Contact />       {/* テキスト */}
      </main>
      <Footer />
    </>
  );
}
