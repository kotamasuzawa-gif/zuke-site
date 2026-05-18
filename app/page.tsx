import Header from "./components/Header";
import Hero from "./components/Hero";
import Products from "./components/Products";
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
        <About />
        <HowTo />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
