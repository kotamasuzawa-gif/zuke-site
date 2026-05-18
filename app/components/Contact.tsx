export default function Contact() {
  return (
    <section id="contact" className="bg-[#111111]">
      <div className="max-w-7xl mx-auto px-8 py-20 grid md:grid-cols-2 gap-16 items-end">

        {/* 左：テキスト */}
        <div>
          <p className="text-[10px] tracking-[0.5em] text-gray-500 mb-10 font-light">CONTACT</p>
          <h2 className="text-3xl md:text-4xl font-thin text-white tracking-wide leading-relaxed mb-8">
            お気軽にご相談ください
          </h2>
          <p className="text-[11px] font-light text-gray-500 leading-loose mb-14">
            商品のご質問、大口注文、卸売のご相談など。
          </p>
          <a
            href="https://zukeplants.base.shop/contact"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-[10px] tracking-[0.35em] text-white border-b border-white pb-1 hover:text-gray-400 hover:border-gray-400 transition-colors font-light"
          >
            CONTACT FORM →
          </a>
        </div>

        {/* 右：SNSリンク */}
        <div className="flex flex-col gap-5 md:items-end">
          <a
            href="https://www.instagram.com/zuke.plantspole/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[9px] tracking-[0.4em] text-gray-500 hover:text-white transition-colors font-light"
          >
            INSTAGRAM →
          </a>
          <a
            href="https://zukeplants.base.shop/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[9px] tracking-[0.4em] text-gray-500 hover:text-white transition-colors font-light"
          >
            SHOP →
          </a>
        </div>

      </div>
    </section>
  );
}
