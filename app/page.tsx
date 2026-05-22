import Header from "./components/Header";
import Hero from "./components/Hero";
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
        <Hero />          {/* 写真 */}
        <Products />      {/* テキスト */}
        <About />         {/* 写真＋テキスト＋gallery-4 */}
        <HowTo />         {/* テキスト */}
        <PhotoBreak1 />   {/* 写真スライダー */}
        <PhotoStrip />    {/* 写真3枚 */}
        <Contact />       {/* テキスト */}
      </main>
      <Footer />
    </>
  );
}
