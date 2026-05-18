export default function Contact() {
  return (
    <section id="contact" className="py-24 px-6 bg-[#f7f5f2]">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-md">
          <p className="text-xs tracking-[0.4em] text-gray-400 mb-10">CONTACT</p>
          <h2 className="text-xl font-light text-gray-900 leading-relaxed mb-6">
            お気軽にご相談ください
          </h2>
          <p className="text-sm text-gray-500 leading-loose mb-10">
            商品のご質問、大口注文、卸売のご相談など。
          </p>
          <a
            href="https://zukeplants.base.shop/contact"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-xs tracking-[0.3em] text-gray-900 border-b border-gray-900 pb-0.5 hover:text-gray-400 hover:border-gray-400 transition-colors"
          >
            CONTACT FORM →
          </a>

          <div className="mt-16 flex gap-8">
            <a
              href="https://www.instagram.com/zuke.plantspole/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] tracking-[0.3em] text-gray-400 hover:text-gray-900 transition-colors"
            >
              INSTAGRAM
            </a>
            <a
              href="https://zukeplants.base.shop/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] tracking-[0.3em] text-gray-400 hover:text-gray-900 transition-colors"
            >
              SHOP
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
