"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, X } from "lucide-react";

export interface CartToastData {
  id: number;
  name: string;
  image: string;
}

// Success popup shown after a cake is added to the cart.
// Slides in at the top-right (full width on phones), closes itself after ~4s (paused while hovered).
export default function CartToast({ toast, onClose }: { toast: CartToastData | null; onClose: () => void }) {
  const [leaving, setLeaving] = useState(false);
  const [paused, setPaused] = useState(false);
  const exitTimer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    setLeaving(false);
    clearTimeout(exitTimer.current);
  }, [toast?.id]);
  useEffect(() => () => clearTimeout(exitTimer.current), []);

  const close = () => {
    setLeaving(true);
    clearTimeout(exitTimer.current);
    exitTimer.current = setTimeout(onClose, 220);
  };

  if (!toast) return null;

  return (
    <div className="pointer-events-none fixed inset-x-3 top-3 z-[100] flex justify-center sm:inset-x-auto sm:right-5 sm:top-5 sm:block">
      <div
        role="status"
        aria-live="polite"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        className={`${leaving ? "toast-out" : "toast-in"} ${paused ? "toast-paused" : ""} pointer-events-auto relative w-full max-w-[360px] overflow-hidden rounded-xl border border-gray-100 bg-white shadow-[0_12px_40px_-8px_rgba(31,27,29,0.25)]`}
      >
        <div className="flex items-start gap-3 p-3.5 pr-9">
          <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-brand-soft">
            <Image src={toast.image} alt="" fill sizes="56px" className="object-contain p-1" />
            <span className="absolute -bottom-0 -right-0 flex h-5 w-5 items-center justify-center rounded-tl-lg bg-emerald-500 text-white">
              <Check className="check-pop h-3 w-3" strokeWidth={3} />
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[13px] font-bold text-emerald-600">Successfully Added</p>
            <p className="mt-0.5 truncate text-[13px] font-semibold text-brand-ink">{toast.name}</p>
            <p className="text-[11px] text-gray-500">has been added to your cart.</p>
            <div className="mt-2.5 flex items-center gap-3">
              <Link
                href="/cart"
                onClick={close}
                className="rounded-[4px] bg-brand px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide text-white transition hover:bg-brand-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
              >
                View Cart
              </Link>
              <button type="button" onClick={close} className="text-[11px] font-semibold text-gray-500 hover:text-brand">
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={close}
          aria-label="Close notification"
          className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
        >
          <X className="h-3.5 w-3.5" />
        </button>
        {/* countdown bar – when it finishes the popup closes */}
        <div className="h-[3px] w-full bg-gray-100">
          <div key={toast.id} onAnimationEnd={close} className="toast-bar h-full origin-left bg-brand" />
        </div>
      </div>
    </div>
  );
}
