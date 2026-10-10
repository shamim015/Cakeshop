"use client";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";

const rs = (n: number) => `Rs. ${n.toLocaleString("en-US")}`;

export default function CartView() {
  const { items, count, total, loaded, updateQty, removeFromCart, clearCart } = useCart();

  // wait until the saved cart is read from the browser
  if (!loaded) return <div className="mt-10 h-40" />;

  if (items.length === 0) {
    return (
      <div className="mt-10 flex flex-col items-center gap-4 rounded-xl bg-brand-soft px-6 py-14 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-brand shadow-sm">
          <ShoppingCart className="h-7 w-7" />
        </span>
        <h2 className="font-serif text-2xl font-bold">Your cart is empty</h2>
        <p className="max-w-sm text-sm text-gray-600">
          Looks like you haven&apos;t added any cakes yet. Pick your favourite and it will show up here.
        </p>
        <Link href="/" className="btn-primary !px-8">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-8 grid items-start gap-6 lg:grid-cols-[1fr_320px]">
      {/* Items */}
      <ul className="divide-y divide-gray-100 rounded-xl border border-gray-100 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
        {items.map((item) => (
          <li key={item.id} className="flex flex-wrap items-center gap-4 p-4 sm:flex-nowrap">
            <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-brand-soft">
              <Image src={item.image} alt={item.name} fill sizes="96px" className="scale-110 object-contain" />
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="text-[15px] font-bold">{item.name}</h3>
              <p className="mt-1 text-sm text-gray-500">{rs(item.price)}</p>

              <div className="mt-3 inline-flex items-center rounded border border-gray-200">
                <button
                  type="button"
                  aria-label={`Decrease quantity of ${item.name}`}
                  onClick={() => updateQty(item.id, item.qty - 1)}
                  className="flex h-8 w-8 items-center justify-center hover:text-brand"
                >
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <span className="w-8 text-center text-sm font-semibold" aria-live="polite">
                  {item.qty}
                </span>
                <button
                  type="button"
                  aria-label={`Increase quantity of ${item.name}`}
                  onClick={() => updateQty(item.id, item.qty + 1)}
                  className="flex h-8 w-8 items-center justify-center hover:text-brand"
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            <div className="flex flex-col items-end gap-3">
              <p className="text-[15px] font-bold">{rs(item.price * item.qty)}</p>
              <button
                type="button"
                aria-label={`Remove ${item.name} from cart`}
                onClick={() => removeFromCart(item.id)}
                className="flex items-center gap-1 text-xs text-gray-500 hover:text-brand"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Summary */}
      <aside className="rounded-xl bg-brand-soft p-5 lg:sticky lg:top-32">
        <h2 className="font-serif text-xl font-bold">Order Summary</h2>
        <dl className="mt-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <dt className="text-gray-600">Items ({count})</dt>
            <dd className="font-semibold">{rs(total)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-600">Delivery</dt>
            <dd className="text-gray-600">Calculated at checkout</dd>
          </div>
        </dl>
        <div className="mt-4 flex justify-between border-t border-pink-200 pt-4 text-base font-bold">
          <span>Total</span>
          <span>{rs(total)}</span>
        </div>

        <button type="button" className="btn-primary mt-5 w-full">
          Proceed to Checkout
        </button>
        <Link href="/" className="btn-outline mt-3 w-full">
          Continue Shopping
        </Link>
        <button
          type="button"
          onClick={clearCart}
          className="mt-4 w-full text-center text-xs text-gray-500 hover:text-brand"
        >
          Clear cart
        </button>
      </aside>
    </div>
  );
}
