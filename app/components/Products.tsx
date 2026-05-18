import Image from "next/image";

const products = [
  {
    id: 1,
    name: 'PLANTS POLE "うねうね"',
    subtitle: "横に広がる植物を矯正できる支柱",
    price: "¥1,320",
    size: "H.35cm / W.8cm",
    image: "https://baseec-img-mng.akamaized.net/images/item/origin/ae57f1835d16cb0c83c4dea585cdb1df.png",
    externalUrl: "https://zukeplants.base.shop/items/130117282",
    tag: "NEW",
  },
  {
    id: 2,
    name: 'PLANTS POLE "5つの六角形"',
    subtitle: "蔓性植物をインテリアに馴染むように飾る支柱",
    price: "¥1,320",
    size: "H.39cm / W.7cm",
    image: "https://baseec-img-mng.akamaized.net/images/item/origin/99d4b0564f5e6d6c2729f19eee010bc7.png",
    externalUrl: "https://zukeplants.base.shop/items/117375069",
    tag: null,
  },
  {
    id: 3,
    name: 'PLANTS POLE "3つの六角形"',
    subtitle: "蔓性植物をインテリアに馴染むように飾る支柱",
    price: "¥880",
    size: "H.22cm / W.8cm",
    image: "https://baseec-img-mng.akamaized.net/images/item/origin/6973a4ba33d405fdeff104d2e5fa6d67.png",
    externalUrl: "https://zukeplants.base.shop/items/128906974",
    tag: null,
  },
  {
    id: 4,
    name: 'PLANTS POLE "2つの六角形"',
    subtitle: "蔓性植物をインテリアに馴染むように飾る支柱",
    price: "¥770",
    size: "H.19.5cm / W.8cm",
    image: "https://baseec-img-mng.akamaized.net/images/item/origin/b7dd362adfcf4f97ebeb1728eaa73918.png",
    externalUrl: "https://zukeplants.base.shop/items/124680568",
    tag: null,
  },
];

export default function Products() {
  return (
    <section id="products" className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">

        <div className="flex items-baseline justify-between mb-16">
          <h2 className="text-xs tracking-[0.4em] text-gray-900">ITEMS</h2>
          <a
            href="https://zukeplants.base.shop/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs tracking-[0.2em] text-gray-400 hover:text-gray-900 transition-colors"
          >
            VIEW ALL →
          </a>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-14">
          {products.map((product) => (
            <a
              key={product.id}
              href={product.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              {/* 画像 */}
              <div className="aspect-square bg-[#f7f5f2] relative overflow-hidden mb-4">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain p-6 group-hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 640px) 50vw, 25vw"
                />
                {product.tag && (
                  <span className="absolute top-3 left-3 text-[9px] tracking-[0.2em] bg-gray-900 text-white px-2 py-0.5">
                    {product.tag}
                  </span>
                )}
              </div>

              {/* テキスト */}
              <p className="text-[10px] tracking-[0.15em] text-gray-400 mb-1">{product.size}</p>
              <h3 className="text-xs text-gray-900 leading-snug mb-1 group-hover:text-gray-500 transition-colors">{product.name}</h3>
              <p className="text-xs text-gray-400">{product.price} <span className="text-[10px]">税込</span></p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
