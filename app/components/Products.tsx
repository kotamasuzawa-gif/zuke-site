import Image from "next/image";

const products = [
  {
    id: 1,
    name: 'PLANTS POLE "うねうね"',
    subtitle: "横に広がる植物を矯正できる支柱",
    price: "¥1,320",
    size: "高さ約35cm / 幅約8cm",
    description: "横に広がりやすいアロカシアなどに。うねりのある独自フォルムが植物の動きに寄り添います。",
    image: "https://baseec-img-mng.akamaized.net/images/item/origin/ae57f1835d16cb0c83c4dea585cdb1df.png",
    externalUrl: "https://zukeplants.base.shop/items/130117282",
    tag: "NEW",
  },
  {
    id: 2,
    name: 'PLANTS POLE "5つの六角形"',
    subtitle: "蔓性植物をインテリアに馴染むように飾る支柱",
    price: "¥1,320",
    size: "高さ約39cm / 幅約7cm",
    description: "モンステラやポトスに。5つの六角形が連なるデザインは、部屋のインテリアとして成立します。",
    image: "https://baseec-img-mng.akamaized.net/images/item/origin/99d4b0564f5e6d6c2729f19eee010bc7.png",
    externalUrl: "https://zukeplants.base.shop/items/117375069",
    tag: "人気",
  },
  {
    id: 3,
    name: 'PLANTS POLE "3つの六角形"',
    subtitle: "蔓性植物をインテリアに馴染むように飾る支柱",
    price: "¥880",
    size: "高さ約22cm / 幅約8cm",
    description: "コンパクトな蔓性植物に。3つの六角形のすっきりとしたサイズ感で、小さな鉢にも合います。",
    image: "https://baseec-img-mng.akamaized.net/images/item/origin/6973a4ba33d405fdeff104d2e5fa6d67.png",
    externalUrl: "https://zukeplants.base.shop/items/128906974",
    tag: null,
  },
  {
    id: 4,
    name: 'PLANTS POLE "2つの六角形"',
    subtitle: "蔓性植物をインテリアに馴染むように飾る支柱",
    price: "¥770",
    size: "高さ約19.5cm / 幅約8cm",
    description: "小型種やラフィドフォラに。2つの六角形の最もミニマルなモデル。",
    image: "https://baseec-img-mng.akamaized.net/images/item/origin/b7dd362adfcf4f97ebeb1728eaa73918.png",
    externalUrl: "https://zukeplants.base.shop/items/124680568",
    tag: null,
  },
];

export default function Products() {
  return (
    <section id="products" className="py-28 px-8 bg-[#faf9f6]">
      <div className="max-w-6xl mx-auto">

        {/* セクションヘッダー */}
        <div className="flex items-center gap-6 mb-16">
          <div className="w-px h-12 bg-[#8fa882]" />
          <div>
            <p className="text-[10px] tracking-[0.5em] text-[#8b7a6a] uppercase mb-1">Products</p>
            <h2 className="text-2xl md:text-3xl font-light text-[#1c1a17] tracking-[0.1em]" style={{ fontFamily: "var(--font-serif)" }}>
              商品ラインナップ
            </h2>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product.id} className="group flex flex-col">
              {/* 商品画像 */}
              <div className="aspect-square bg-[#f5f0e8] relative overflow-hidden mb-5">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain p-6 group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                {product.tag && (
                  <span className="absolute top-3 left-3 text-[9px] tracking-[0.2em] bg-[#3d3830] text-[#faf9f6] px-2 py-1">
                    {product.tag}
                  </span>
                )}
              </div>

              {/* 商品情報 */}
              <div className="flex flex-col flex-1">
                <h3 className="text-sm font-medium text-[#1c1a17] tracking-wide mb-1" style={{ fontFamily: "var(--font-serif)" }}>
                  {product.name}
                </h3>
                <p className="text-[11px] text-[#8b7a6a] mb-1 leading-snug">{product.subtitle}</p>
                <p className="text-[11px] text-[#b0a898] mb-3">{product.size}</p>
                <p className="text-xs text-[#6b6456] leading-relaxed mb-5 flex-1">{product.description}</p>

                <div className="flex items-baseline justify-between mb-4 border-t border-[#e8e0d4] pt-4">
                  <span className="text-base font-light text-[#1c1a17]" style={{ fontFamily: "var(--font-serif)" }}>{product.price}</span>
                  <span className="text-[10px] text-[#b0a898] tracking-wider">税込</span>
                </div>

                <a
                  href={product.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center py-2.5 border border-[#3d3830] text-[#3d3830] text-[11px] tracking-[0.2em] hover:bg-[#3d3830] hover:text-[#faf9f6] transition-colors duration-300"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  購 入 す る
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 text-center">
          <a
            href="https://zukeplants.base.shop/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 text-[11px] text-[#8b7a6a] tracking-[0.25em] hover:text-[#3d3830] transition-colors"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            <span className="w-8 h-px bg-current" />
            オンラインショップで全商品を見る
            <span className="w-8 h-px bg-current" />
          </a>
        </div>
      </div>
    </section>
  );
}
