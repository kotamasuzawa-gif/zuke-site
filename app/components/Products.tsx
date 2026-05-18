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
    description: "小型種やラフィドフォラに。2つの六角形の最もミニマルなモデル。育て始めの株にちょうど良い高さ。",
    image: "https://baseec-img-mng.akamaized.net/images/item/origin/b7dd362adfcf4f97ebeb1728eaa73918.png",
    externalUrl: "https://zukeplants.base.shop/items/124680568",
    tag: null,
  },
];

export default function Products() {
  return (
    <section id="products" className="py-28 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <p className="text-xs tracking-[0.4em] text-green-700 uppercase mb-3">Products</p>
          <h2 className="text-3xl md:text-4xl font-bold text-stone-800 tracking-tight">商品ラインナップ</h2>
          <p className="text-sm text-stone-500 mt-4">全商品はオンラインショップにてご購入いただけます。</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="group border border-stone-100 hover:border-stone-300 transition-colors duration-300 flex flex-col"
            >
              {/* Product image */}
              <div className="aspect-square bg-stone-50 relative overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                {product.tag && (
                  <span className="absolute top-3 left-3 text-xs tracking-widest bg-stone-800 text-white px-2.5 py-1">
                    {product.tag}
                  </span>
                )}
              </div>

              {/* Product info */}
              <div className="p-5 flex flex-col flex-1">
                <div className="flex-1">
                  <h3 className="font-bold text-stone-800 text-sm tracking-wide">{product.name}</h3>
                  <p className="text-xs text-stone-400 mt-0.5 mb-2 leading-snug">{product.subtitle}</p>
                  <p className="text-xs text-stone-400 mb-3">{product.size}</p>
                  <p className="text-xs text-stone-500 leading-relaxed mb-4">{product.description}</p>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-bold text-stone-800">{product.price}</span>
                  <span className="text-xs text-stone-400">税込</span>
                </div>
                <a
                  href={product.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center py-3 border border-stone-800 text-stone-800 text-xs tracking-widest hover:bg-stone-800 hover:text-white transition-colors duration-200"
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
            className="inline-block px-8 py-3 border border-stone-300 text-stone-600 text-xs tracking-widest hover:border-stone-600 hover:text-stone-800 transition-colors"
          >
            全商品を見る →
          </a>
        </div>
      </div>
    </section>
  );
}
