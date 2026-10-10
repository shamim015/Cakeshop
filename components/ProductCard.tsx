"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Check, Heart, ShoppingCart, Star, Zap } from "lucide-react";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/types";
export default function ProductCard({ product }: { product: Product }) {
  const { name, price, rating, reviews, image } = product;
  const { addToCart } = useCart();
  const router = useRouter();
  const [added, setAdded] = useState(false);
  const [wished, setWished] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();
  const cardRef = useRef<HTMLElement>(null);
  const [touched, setTouched] = useState(false); // touch "hover" state for phones/tablets

  useEffect(() => () => clearTimeout(timer.current), []);

  // Touch devices have no hover: after a tap keep the hover look until the user taps elsewhere
  useEffect(() => {
    if (!touched) return;
    const off = (e: PointerEvent) => {
      if (!cardRef.current?.contains(e.target as Node)) setTouched(false);
    };
    document.addEventListener("pointerdown", off);
    return () => document.removeEventListener("pointerdown", off);
  }, [touched]);

  const handleAdd = () => {
    addToCart(product);
    setAdded(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setAdded(false), 1500);
  };

  // Buy Now: add this cake to the cart, then go straight to the My Cart page
  const handleBuyNow = () => {
    addToCart(product);
    router.push("/cart");
  };

  return (
    <article
      ref={cardRef}
      onPointerUp={(e) => { if (e.pointerType !== "mouse") setTouched(true); }}
      className={`card-lift ${touched ? "is-hover" : ""} h-full overflow-hidden rounded-lg border border-gray-100 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.06)]`}>
      <div className="relative aspect-[1.28/1] overflow-hidden bg-brand-soft">
        <div className="absolute inset-x-0 bottom-4 top-0">
          <Image src={image} alt={name} fill sizes="(min-width:1024px) 280px, 50vw" className="card-img object-contain" />
        </div>
        <button
          type="button"
          aria-label={wished ? `Remove ${name} from wishlist` : `Add ${name} to wishlist`}
          aria-pressed={wished}
          onClick={() => setWished(!wished)}
          className={`absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full shadow transition-colors sm:right-4 sm:top-4 sm:h-[26px] sm:w-[26px] ${wished ? "bg-brand text-white" : "bg-white text-brand hover:bg-brand hover:text-white"}`}
        >
          <Heart className={`h-3.5 w-3.5 ${wished ? "heart-pop fill-current" : ""}`} />
        </button>
      </div>
      <div className="px-2.5 pb-3.5 pt-3 sm:px-3 sm:pb-4">
        <h3 className="truncate text-[13px] font-bold">{name}</h3>
        <div className="mt-1 flex flex-wrap items-center gap-1" aria-label={`Rated ${rating} out of 5`}>
          {Array.from({ length: 5 }).map((_, i) => (<Star key={i} className={`h-3 w-3 ${i < Math.round(rating) ? "fill-amber-400 text-amber-400" : "text-gray-300"}`} />))}
          <span className="text-[11px] text-gray-500">({reviews})</span>
        </div>
        <p className="mt-1.5 text-[15px] font-bold">Tk {price.toLocaleString("en-US")}</p>
        <div className="mt-3 flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            onClick={handleAdd}
            className="btn-primary btn-shine w-full whitespace-nowrap !rounded-[3px] !px-2.5 !py-2.5 text-[10px] sm:flex-1 sm:!py-2"
          >
            {added ? <Check className="check-pop h-3 w-3" /> : <ShoppingCart className="h-3 w-3" />}
            {added ? "Added!" : "Add to Cart"}
          </button>
          <button
            type="button"
            onClick={handleBuyNow}
            className="btn-shine inline-flex w-full items-center justify-center gap-1.5 whitespace-nowrap rounded-[3px] border border-brand bg-white px-2.5 py-2.5 text-[10px] font-bold uppercase tracking-wide text-brand transition hover:bg-brand hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand sm:flex-1 sm:py-2"
          >
            <Zap className="h-3 w-3" />
            Buy Now
          </button>
        </div>
      </div>
    </article>
  );
}
