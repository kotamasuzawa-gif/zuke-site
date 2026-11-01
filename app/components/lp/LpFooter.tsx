import icon from "@/app/icon.png";
import { WHOLESALE_MAILTO } from "@/app/lib/contact";
import Image from "next/image";
import Link from "next/link";
import { lpShopUrl } from "./utm";

const LINKS = [
  { href: "/products", label: "PRODUCTS" },
  { href: "/guide", label: "GUIDE" },
  { href: "/about", label: "ABOUT" },
  { href: "/wholesale", label: "WHOLESALE" },
] as const;

export function LpFooter() {
  return (
    <footer className="border-t border-[#E5DDCF]">
      <div className="mx-auto flex w-full max-w-[1120px] flex-col gap-8 px-5 py-12 min-[601px]:px-8">
        <Link href="/" className="inline-flex w-fit items-center gap-2.5" aria-label="ZUKE ホーム">
          <Image src={icon} alt="" width={36} height={36} className="h-9 w-9" />
          <span className="text-[14px] font-black tracking-[0.18em]">ZUKE</span>
        </Link>
        <nav aria-label="フッター" className="flex flex-wrap gap-x-6 gap-y-3 text-[13px] font-bold tracking-[0.12em]">
          {LINKS.map((item) => (
            <Link key={item.href} href={item.href} className="hover:opacity-60">
              {item.label}
            </Link>
          ))}
          <a href={lpShopUrl("final")} target="_blank" rel="noopener noreferrer" className="hover:opacity-60">
            ショップ
          </a>
        </nav>
        <ul className="flex flex-col gap-2 text-[13px] text-[#6B6259] min-[601px]:flex-row min-[601px]:flex-wrap min-[601px]:gap-x-6">
          <li>
            <a href="https://www.instagram.com/zuke.plantspole/" target="_blank" rel="noopener noreferrer" className="hover:text-[#1A1A1A]">
              Instagram
            </a>
          </li>
          <li>
            <a href="https://note.com/zuke_plantspole" target="_blank" rel="noopener noreferrer" className="hover:text-[#1A1A1A]">
              note
            </a>
          </li>
          <li>
            <a href={WHOLESALE_MAILTO} className="hover:text-[#1A1A1A]">
              卸売のお問い合わせ
            </a>
          </li>
          <li>
            <a href="https://shop.zukeplants.com/privacy" target="_blank" rel="noopener noreferrer" className="hover:text-[#1A1A1A]">
              プライバシーポリシー
            </a>
          </li>
          <li>
            <a href="https://shop.zukeplants.com/law" target="_blank" rel="noopener noreferrer" className="hover:text-[#1A1A1A]">
              特定商取引法に基づく表記
            </a>
          </li>
        </ul>
        <p className="text-[13px]">© ZUKE</p>
      </div>
    </footer>
  );
}
