import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
export default function CustomCakeBanner() {
  return (
    <section className="relative bg-gradient-to-r from-[#FDEBF1] via-[#FFD9E5] to-[#FBC9DA]">
      <div className="container-x grid items-center md:min-h-[197px] md:grid-cols-2">
        <div className="py-8 md:py-0">
          <h2 className="font-serif text-3xl font-bold leading-[1.1] md:text-[32px]">Custom Cake for<br /><span className="text-brand">Your Special Moments</span></h2>
          <p className="mt-3 text-sm text-gray-800">Tell us your ideas, we&apos;ll bake your dreams!</p>
          <Link href="/custom-cake" className="mt-4 inline-flex items-center gap-2 rounded-[4px] bg-white px-5 py-2.5 text-[11px] font-bold uppercase tracking-wide shadow-sm hover:text-brand">
            Order Custom Cake <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
        {/* TODO: replace with /public/images/custom-cake.jpg */}
        <div className="relative md:h-full">
          <div className="relative mx-auto h-[220px] w-full max-w-[360px] md:absolute md:-top-8 md:left-[22%] md:mx-0 md:h-[228px] md:w-[326px] md:max-w-none">
            <Image src="/images/custom-cake.jpg" alt="Chocolate custom cake" fill sizes="(min-width:768px) 326px, 100vw" className="object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}
