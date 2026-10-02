import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-[#FDEDF2] via-[#FFF5F8] to-[#FBE3EA]">
      <div className="container-x grid min-h-[480px] items-center gap-6 pb-16 pt-8 md:min-h-[481px] md:grid-cols-2 md:pb-14 md:pt-0">
        <div className="relative z-10">
          <h1 className="font-serif text-4xl font-bold leading-[1.1] md:text-[54px]">
            Delicious Cakes<br />for <span className="text-brand">Every Occasion</span>
          </h1>
          <p className="mt-5 max-w-[440px] text-base leading-relaxed text-gray-700">
            Handmade with love using the finest ingredients. Order online and get your favorite cakes delivered to your doorstep.
          </p>
          <div className="mt-8 flex flex-wrap gap-6">
            <Link href="/shop" className="btn-primary !px-8">Shop Now</Link>
            <Link href="/custom-cake" className="btn-outline !px-8"><ShoppingCart className="h-3.5 w-3.5" />Custom Cake</Link>
          </div>
        </div>
        {/* TODO: replace with /public/images/hero-cake.jpg */}
        <div className="relative h-[300px] md:absolute md:inset-y-0 md:right-0 md:h-auto md:w-[50%]">
          <Image src="/images/hero-cake.jpg" alt="Pink rose cake on a cake stand" fill priority sizes="(min-width:768px) 52vw, 100vw"
            className="object-cover object-center md:[mask-image:linear-gradient(to_right,transparent,black_25%)]" />
        </div>
      </div>
    </section>
  );
}
