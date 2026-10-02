import Image from "next/image";
import { Heart, ShoppingCart, Star } from "lucide-react";
import type { Product } from "@/types";
export default function ProductCard({ product }: { product: Product }) {
  const { name, price, rating, reviews, image } = product;
  return (
    <article className="overflow-hidden rounded-lg border border-gray-100 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.06)] transition hover:shadow-lg">
      <div className="relative aspect-[1.41/1] bg-brand-soft">
        <Image src={image} alt={name} fill sizes="(min-width:1024px) 280px, 50vw" className="object-cover" />
        <button aria-label={`Add ${name} to wishlist`} className="absolute right-4 top-4 flex h-[26px] w-[26px] items-center justify-center rounded-full bg-white text-brand shadow hover:bg-brand hover:text-white">
          <Heart className="h-3.5 w-3.5" />
        </button>
      </div>
      <div className="px-3 pb-4 pt-3">
        <h3 className="text-[13px] font-bold">{name}</h3>
        <div className="mt-1 flex items-center gap-1" aria-label={`Rated ${rating} out of 5`}>
          {Array.from({ length: 5 }).map((_, i) => (<Star key={i} className={`h-3 w-3 ${i < Math.round(rating) ? "fill-amber-400 text-amber-400" : "text-gray-300"}`} />))}
          <span className="text-[11px] text-gray-500">({reviews})</span>
        </div>
        <p className="mt-1.5 text-[15px] font-bold">Rs. {price.toLocaleString("en-US")}</p>
        <button className="btn-primary mt-3 w-[62%] min-w-[130px] !rounded-[3px] !px-3 !py-2 text-[10px]"><ShoppingCart className="h-3 w-3" />Add to Cart</button>
      </div>
    </article>
  );
}
