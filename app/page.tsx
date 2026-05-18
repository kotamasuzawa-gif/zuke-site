import Header from "./components/Header";
import Hero from "./components/Hero";
import Products from "./components/Products";
import { PhotoBreak1, PhotoBreak2, PhotoStrip } from "./components/Gallery";
import About from "./components/About";
import HowTo from "./components/HowTo";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Products />
        <PhotoBreak1 />
        <About />
        <PhotoBreak2 />
        <HowTo />
        <PhotoStrip />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
