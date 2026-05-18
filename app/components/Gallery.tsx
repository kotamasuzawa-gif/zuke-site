import Image from "next/image";

const photos = [
  { src: "/hero-1.jpg", alt: "ZUKE — warm natural setting" },
  { src: "/hero-2.jpg", alt: "ZUKE — urban minimal setting" },
  { src: "/hero-3.jpg", alt: "ZUKE — light nordic setting" },
  { src: "/hero-4.jpg", alt: "ZUKE — concrete modern setting" },
];

export default function Gallery() {
  return (
    <section className="bg-white py-2">
      {/* 2列グリッド：上2枚 */}
      <div className="grid grid-cols-2 gap-0.5">
        {photos.slice(0, 2).map((p) => (
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

      {/* ラベル */}
      <div className="px-8 py-10 border-t border-b border-gray-100">
        <p className="text-center text-[10px] tracking-[0.5em] text-gray-300 font-light">
          PLANTS POLE — FOR YOUR LIVING SPACE
        </p>
      </div>

      {/* 2列グリッド：下2枚（横長） */}
      <div className="grid grid-cols-2 gap-0.5">
        {photos.slice(2, 4).map((p) => (
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
    </section>
  );
}
