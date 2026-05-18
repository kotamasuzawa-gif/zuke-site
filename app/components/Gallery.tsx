import Image from "next/image";

const photos = [
  { src: "/hero-1.jpg",    alt: "ZUKE — warm natural" },
  { src: "/hero-2.jpg",    alt: "ZUKE — urban minimal" },
  { src: "/gallery-1.jpg", alt: "ZUKE — close-up detail" },
  { src: "/gallery-2.jpg", alt: "ZUKE — nordic room" },
  { src: "/hero-3.jpg",    alt: "ZUKE — light shelf" },
  { src: "/gallery-3.jpg", alt: "ZUKE — desk setting" },
  { src: "/hero-4.jpg",    alt: "ZUKE — concrete modern" },
];

export default function Gallery() {
  return (
    <section className="bg-white">
      {/* 上段：3列 */}
      <div className="grid grid-cols-3 gap-0.5">
        {photos.slice(0, 3).map((p) => (
          <div key={p.src} className="relative aspect-square overflow-hidden">
            <Image
              src={p.src}
              alt={p.alt}
              fill
              className="object-cover hover:scale-105 transition-transform duration-700 ease-out"
              sizes="33vw"
            />
          </div>
        ))}
      </div>

      {/* ラベル */}
      <div className="px-8 py-8 border-t border-b border-gray-100">
        <p className="text-center text-[10px] tracking-[0.5em] text-gray-300 font-light">
          PLANTS POLE — FOR YOUR LIVING SPACE
        </p>
      </div>

      {/* 中段：2列（横長） */}
      <div className="grid grid-cols-2 gap-0.5">
        {photos.slice(3, 5).map((p) => (
          <div key={p.src} className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={p.src}
              alt={p.alt}
              fill
              className="object-cover hover:scale-105 transition-transform duration-700 ease-out"
              sizes="50vw"
            />
          </div>
        ))}
      </div>

      {/* 下段：2列（正方形） */}
      <div className="grid grid-cols-2 gap-0.5 mt-0.5">
        {photos.slice(5, 7).map((p) => (
          <div key={p.src} className="relative aspect-square overflow-hidden">
            <Image
              src={p.src}
              alt={p.alt}
              fill
              className="object-cover hover:scale-105 transition-transform duration-700 ease-out"
              sizes="50vw"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
