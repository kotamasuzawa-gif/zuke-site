export default function Contact() {
  return (
    <section id="contact" className="py-28 px-8 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-lg">
          <p className="text-[10px] tracking-[0.5em] text-gray-300 mb-16 font-light">CONTACT</p>
          <h2 className="text-2xl md:text-3xl font-thin text-black tracking-wide leading-relaxed mb-8">
            お気軽にご相談ください
          </h2>
          <p className="text-[11px] font-light text-gray-400 leading-loose mb-14">
            商品のご質問、大口注文、卸売のご相談など。
          </p>
          <a
            href="https://zukeplants.base.shop/contact"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-[10px] tracking-[0.35em] text-black border-b border-black pb-1 hover:text-gray-400 hover:border-gray-400 transition-colors font-light"
          >
            CONTACT FORM →
          </a>

          <div className="mt-20 flex gap-10">
            <a
              href="https://www.instagram.com/zuke.plantspole/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[9px] tracking-[0.4em] text-gray-300 hover:text-black transition-colors font-light"
            >
              INSTAGRAM
            </a>
            <a
              href="https://zukeplants.base.shop/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[9px] tracking-[0.4em] text-gray-300 hover:text-black transition-colors font-light"
            >
              SHOP
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
