"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, Heart, ShoppingCart, Star, Trash2, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

// Slide-in "My Favorites" panel, opened from the heart icon in the navbar.
export default function WishlistDrawer() {
  const { items, count, isOpen, remove, closeDrawer } = useWishlist();
  const { addToCart } = useCart();
  const [justAdded, setJustAdded] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  // Esc closes, page behind does not scroll while open, focus moves into the panel
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeDrawer();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [isOpen, closeDrawer]);

  const handleAdd = (p: (typeof items)[number]) => {
    addToCart(p, false); // the button itself shows "Added", no popup on top of the panel
    setJustAdded(p.id);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setJustAdded(null), 1500);
  };

  return (
    <div className={`fixed inset-0 z-[90] transition-all duration-300 ${isOpen ? "visible" : "invisible"}`}>
      {/* dark overlay */}
      <div
        onClick={closeDrawer}
        aria-hidden="true"
        className={`absolute inset-0 bg-brand-ink/40 backdrop-blur-[2px] transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`}
      />
      {/* panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="My Favorites"
        className={`absolute right-0 top-0 flex h-full w-full max-w-[400px] flex-col bg-white shadow-2xl transition-transform duration-300 ease-out ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-soft text-brand">
              <Heart className="h-4 w-4 fill-current" />
            </span>
            <div>
              <h2 className="font-serif text-lg font-bold leading-tight">My Favorites</h2>
              <p className="text-[11px] text-gray-500">{count === 0 ? "Nothing saved yet" : `${count} saved ${count === 1 ? "cake" : "cakes"}`}</p>
            </div>
          </div>
          <button ref={closeRef} type="button" onClick={closeDrawer} aria-label="Close favorites" className="flex h-8 w-8 items-center justify-center rounded-full text-gray-500 transition hover:bg-gray-100 hover:text-gray-800">
            <X className="h-5 w-5" />
          </button>
        </div>

        {count === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <span className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-soft text-brand">
              <Heart className="h-9 w-9" />
            </span>
            <h3 className="mt-5 text-base font-bold">Your favorites list is empty</h3>
            <p className="mt-1.5 text-[13px] leading-relaxed text-gray-500">Tap the heart on any cake to save it here and find it again later.</p>
            <Link href="/shop" onClick={closeDrawer} className="btn-primary btn-shine mt-6">Browse Cakes</Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 space-y-3 overflow-y-auto px-5 py-4">
              {items.map((p) => (
                <li key={p.id} className="fav-item flex gap-3 rounded-lg border border-gray-100 bg-white p-2.5 shadow-[0_2px_10px_rgba(0,0,0,0.04)]">
                  <div className="relative h-[84px] w-[84px] shrink-0 overflow-hidden rounded-md bg-brand-soft">
                    <Image src={p.image} alt={p.name} fill sizes="84px" className="object-contain p-1" />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="truncate text-[13px] font-bold">{p.name}</h3>
                      <button type="button" onClick={() => remove(p.id)} aria-label={`Remove ${p.name} from favorites`} className="-mr-1 -mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-gray-400 transition hover:bg-red-50 hover:text-red-500">
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <div className="mt-0.5 flex items-center gap-0.5" aria-label={`Rated ${p.rating} out of 5`}>
                      {Array.from({ length: 5 }).map((_, i) => (<Star key={i} className={`h-3 w-3 ${i < Math.round(p.rating) ? "fill-amber-400 text-amber-400" : "text-gray-300"}`} />))}
                      <span className="ml-1 text-[11px] text-gray-500">({p.reviews})</span>
                    </div>
                    <div className="mt-auto flex items-center justify-between gap-2 pt-2">
                      <p className="text-[14px] font-bold">Tk {p.price.toLocaleString("en-US")}</p>
                      <button type="button" onClick={() => handleAdd(p)} className="btn-primary btn-shine !rounded-[3px] !px-3 !py-1.5 text-[10px]">
                        {justAdded === p.id ? <Check className="check-pop h-3 w-3" /> : <ShoppingCart className="h-3 w-3" />}
                        {justAdded === p.id ? "Added" : "Add to Cart"}
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="border-t border-gray-100 px-5 py-4">
              <Link href="/cart" onClick={closeDrawer} className="btn-primary btn-shine w-full">
                <ShoppingCart className="h-3.5 w-3.5" />
                Go to My Cart
              </Link>
              <button type="button" onClick={closeDrawer} className="mt-2.5 w-full text-center text-xs font-semibold text-gray-500 hover:text-brand">
                Continue Shopping
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
