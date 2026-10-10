import Link from "next/link";
import { ArrowRight } from "lucide-react";
import CakeHoverImage from "./CakeHoverImage";
export default function CustomCakeBanner() {
  return (
    <section className="relative bg-gradient-to-r from-[#FDEBF1] via-[#FFD9E5] to-[#FBC9DA]">
      <div className="container-wide grid items-center md:min-h-[232px] md:grid-cols-2">
        <div className="pb-0 pt-8 md:py-0">
          <h2 className="font-serif text-3xl font-bold leading-[1.1] md:text-[32px]">
            Custom Cake for
            <br />
            <span className="text-brand">Your Special Moments</span>
          </h2>
          <p className="mt-3 text-sm text-gray-800">
            Tell us your ideas, we&apos;ll bake your dreams!
          </p>
          <Link
            href="/custom-cake"
            className="mt-4 inline-flex items-center gap-2 rounded-[4px] bg-white px-5 py-2.5 text-[11px] font-bold uppercase tracking-wide shadow-sm hover:text-brand"
          >
            Order Custom Cake <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
        {/* TODO: replace with /public/images/custom-cake.jpg */}
        <div className="relative md:h-full">
          <CakeHoverImage />
        </div>
      </div>
    </section>
  );
}
