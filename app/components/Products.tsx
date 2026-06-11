import Image from "next/image";
import Reveal from "./Reveal";
import Tilt from "./Tilt";

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
    <section id="products" className="relative px-6 py-28 md:py-36">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="mb-16 flex items-end justify-between">
            <div>
              <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.4em] text-[var(--accent)]">[ 01 ] Products</p>
              <h2 className="text-4xl font-thin tracking-tight text-[var(--fg)] md:text-5xl">商品ラインナップ</h2>
              <p className="mt-4 text-sm font-light text-[var(--muted)]">全商品はオンラインショップにてご購入いただけます。</p>
            </div>
            <span className="hidden font-mono text-xs tracking-[0.3em] text-[var(--muted)] md:block">04 ITEMS</span>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {products.map((product, i) => (
            <Reveal key={product.id} delay={i * 90}>
              <Tilt className="group relative flex h-full flex-col overflow-hidden border border-[var(--line)] bg-white/[0.025] backdrop-blur-sm transition-colors duration-300 hover:border-[var(--accent)]/50">
                {/* glow on hover */}
                <span
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{ boxShadow: "inset 0 0 40px rgba(92,242,176,0.12)" }}
                  aria-hidden
                />
                {/* index marker */}
                <span className="absolute right-3 top-3 z-20 font-mono text-[10px] text-[var(--muted)]">
                  0{product.id}
                </span>

                {/* product image — floating light "lightbox" plate (PNGs ship on white) */}
                <div className="relative m-2.5 aspect-square overflow-hidden rounded-sm bg-gradient-to-b from-white to-[#eceff3] ring-1 ring-black/5 transition-shadow duration-300 group-hover:ring-[var(--accent)]/40">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain p-4 transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  {product.tag && (
                    <span
                      className="absolute left-3 top-3 z-10 border border-[var(--accent)] bg-black/80 px-2.5 py-1 font-mono text-[10px] tracking-widest text-[var(--accent)]"
                      style={{ boxShadow: "0 0 14px rgba(92,242,176,0.3)" }}
                    >
                      {product.tag}
                    </span>
                  )}
                </div>

                {/* info */}
                <div className="flex flex-1 flex-col border-t border-[var(--line)] p-5">
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold tracking-wide text-[var(--fg)]">{product.name}</h3>
                    <p className="mb-2 mt-0.5 text-xs leading-snug text-[var(--muted)]">{product.subtitle}</p>
                    <p className="mb-3 font-mono text-[10px] text-[var(--muted)]/70">{product.size}</p>
                    <p className="mb-4 text-xs leading-relaxed text-[var(--muted)]">{product.description}</p>
                  </div>
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-lg font-semibold text-[var(--fg)]">{product.price}</span>
                    <span className="font-mono text-[10px] text-[var(--muted)]">税込</span>
                  </div>
                  <a
                    href={product.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full border border-[var(--line)] py-3 text-center font-mono text-[11px] tracking-widest text-[var(--fg)] transition-all duration-200 hover:border-[var(--accent)] hover:bg-[var(--accent)] hover:text-black"
                  >
                    購入する →
                  </a>
                </div>
              </Tilt>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <div className="mt-12 text-center">
            <a
              href="https://zukeplants.base.shop/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-full border border-[var(--line)] px-9 py-3 font-mono text-[11px] tracking-widest text-[var(--muted)] transition-all hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              全商品を見る →
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
