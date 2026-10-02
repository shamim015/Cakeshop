import Link from "next/link";
import { Cake } from "lucide-react";
export default function Logo({ small = false }: { small?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2" aria-label="CakeShop home">
      <Cake className={small ? "h-8 w-8 text-brand" : "h-11 w-11 text-brand"} strokeWidth={1.4} />
      <span className="leading-none">
        <span className={`block font-script font-bold text-brand-ink ${small ? "text-2xl" : "text-4xl"}`}>Cake<span className="text-brand">Shop</span></span>
        <span className={`block text-center tracking-wide text-gray-600 ${small ? "text-[8px]" : "text-[10px]"}`}>— Baked with Love —</span>
      </span>
    </Link>
  );
}
