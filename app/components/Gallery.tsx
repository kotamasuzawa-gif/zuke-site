import Image from "next/image";

// Products直後：全幅シネマティック1枚
export function PhotoBreak1() {
  return (
    <div className="relative w-full h-[60vh] overflow-hidden">
      <Image
        src="/gallery-2.jpg"
        alt="ZUKE living space"
        fill
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black/10" />
      <div className="absolute bottom-10 left-8 md:left-16">
        <p className="text-[10px] tracking-[0.5em] text-white/70 font-light">
          PLANTS POLE — FOR YOUR LIVING SPACE
        </p>
      </div>
    </div>
  );
}

// About直後：左大・右小の非対称エディトリアル
export function PhotoBreak2() {
  return (
    <div className="grid grid-cols-3 gap-0.5 bg-white">
      {/* 左：大きいポートレート */}
      <div className="col-span-2 relative aspect-[3/2] overflow-hidden">
        <Image
          src="/gallery-3.jpg"
          alt="ZUKE desk scene"
          fill
          className="object-cover hover:scale-105 transition-transform duration-700 ease-out"
          sizes="66vw"
        />
      </div>
      {/* 右：縦長クローズアップ */}
      <div className="relative aspect-[2/3] overflow-hidden">
        <Image
          src="/gallery-1.jpg"
          alt="ZUKE close-up"
          fill
          className="object-cover hover:scale-105 transition-transform duration-700 ease-out"
          sizes="33vw"
        />
      </div>
    </div>
  );
}

// Contact直前：横3枚ストリップ
export function PhotoStrip() {
  return (
    <div className="grid grid-cols-3 gap-0.5">
      <div className="relative aspect-[3/4] overflow-hidden">
        <Image
          src="/hero-1.jpg"
          alt="ZUKE warm setting"
          fill
          className="object-cover hover:scale-105 transition-transform duration-700 ease-out"
          sizes="33vw"
        />
      </div>
      <div className="relative aspect-[3/4] overflow-hidden">
        <Image
          src="/hero-3.jpg"
          alt="ZUKE nordic shelf"
          fill
          className="object-cover hover:scale-105 transition-transform duration-700 ease-out"
          sizes="33vw"
        />
      </div>
      <div className="relative aspect-[3/4] overflow-hidden">
        <Image
          src="/hero-2.jpg"
          alt="ZUKE urban minimal"
          fill
          className="object-cover hover:scale-105 transition-transform duration-700 ease-out"
          sizes="33vw"
        />
      </div>
    </div>
  );
}
