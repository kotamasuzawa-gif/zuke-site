"use client";

import { useEffect, useState } from "react";
import { lpShopUrl } from "./utm";

export function LpStickyBuy({ label }: { label: string }) {
  const [ctaVisible, setCtaVisible] = useState(true);

  useEffect(() => {
    const cta = document.getElementById("fv-cta");
    if (!cta) return;
    const observer = new IntersectionObserver(
      ([entry]) => setCtaVisible(entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(cta);
    return () => observer.disconnect();
  }, []);

  if (ctaVisible) return null;

  return (
    <a
      href={lpShopUrl("sticky")}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed inset-x-0 bottom-0 z-50 hidden h-16 items-center justify-center bg-[#F06A1E] px-4 text-center text-[15px] font-bold text-white max-[600px]:flex"
    >
      {label}
    </a>
  );
}
