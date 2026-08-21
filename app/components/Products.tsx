import Image from "next/image";

const products = [
  {
    id: 1,
    name: 'PLANTS POLE "うねうね"',
    subtitle: "横に広がる植物を矯正できる支柱",
    price: "¥1,320",
    size: "高さ約35cm / 幅約8cm",
    description: "横に広がりやすいアロカシアなどに。うねりのある独自フォルムが植物の動きに寄り添います。",
    image: "/products/product-uneune.webp",
    imageWhite: null,
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
    image: "/products/product-hex5-black.webp",
    imageWhite: "/products/product-hex5-white.webp",
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
    image: "/products/product-hex3-black.webp",
    imageWhite: "/products/product-hex3-white.webp",
    externalUrl: "https://zukeplants.base.shop/items/128906974",
    tag: null,
  },
  {
    id: 4,
    name: 'PLANTS POLE "2つの六角形"',
    subtitle: "蔓性植物をインテリアに馴染むように飾る支柱",
    price: "¥770",
    size: "高さ約19.5cm / 幅約8cm",
    description: "小型種やラフィドフォラに。2つの六角形の最もミニマルなモデル。育て始めの株にちょうど良い高さ。",
    image: "/products/product-hex2-black.webp",
    imageWhite: "/products/product-hex2-white.webp",
    externalUrl: "https://zukeplants.base.shop/items/124680568",
    tag: null,
  },
];

export default function Products() {
  return (
    <section id="products" className="py-24 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-14">
          <p className="zk-label mb-5">( PRODUCTS )</p>
          <h2 className="font-[family-name:var(--font-geist-mono)] text-2xl md:text-3xl tracking-[0.12em] text-neutral-100">LINE UP</h2>
          <p className="text-xs text-neutral-500 mt-4">全商品はオンラインストアにてご購入いただけます。</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="group bg-[#151514] border border-[#2a2a28] hover:border-neutral-600 transition-colors duration-300 flex flex-col"
            >
              {/* Product image（hoverで白バリエーションに切替） */}
              <div className="aspect-square bg-[#f4f4f2] relative overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className={`object-contain p-4 transition-opacity duration-500 ${product.imageWhite ? "group-hover:opacity-0" : "group-hover:scale-105 transition-transform"}`}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                {product.imageWhite && (
                  <Image
                    src={product.imageWhite}
                    alt={`${product.name}（ホワイト）`}
                    fill
                    className="object-contain p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                )}
                {product.tag && (
                  <span className="absolute top-3 left-3 font-[family-name:var(--font-geist-mono)] text-[10px] tracking-widest bg-black text-white px-2.5 py-1">
                    {product.tag}
                  </span>
                )}
              </div>

              {/* Product info */}
              <div className="p-5 flex flex-col flex-1">
                <div className="flex-1">
                  <h3 className="font-bold text-neutral-100 text-sm tracking-wide">{product.name}</h3>
                  <p className="text-xs text-neutral-500 mt-0.5 mb-2 leading-snug">{product.subtitle}</p>
                  <p className="text-xs text-neutral-500 mb-3">{product.size}</p>
                  <p className="text-xs text-neutral-400 leading-relaxed mb-4">{product.description}</p>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-bold text-neutral-100">{product.price}</span>
                  <span className="text-xs text-neutral-500">税込</span>
                </div>
                <a
                  href={product.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center py-3 border border-neutral-500 text-neutral-100 text-xs tracking-widest hover:bg-white hover:text-black hover:border-white transition-colors duration-200"
                >
                  購入する →
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href="https://zukeplants.base.shop/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 border border-neutral-600 text-neutral-300 text-xs tracking-widest hover:border-white hover:text-white transition-colors font-[family-name:var(--font-geist-mono)]"
          >
            全商品を見る →
          </a>
        </div>
      </div>
    </section>
  );
}
