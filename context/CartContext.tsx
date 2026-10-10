"use client";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import type { Product } from "@/types";
import CartToast, { type CartToastData } from "@/components/CartToast";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  qty: number;
  details?: string[]; // extra lines for custom cakes (flavor, size, message...)
}

export interface CustomCartItem {
  name: string;
  price: number;
  image: string;
  details: string[];
}

interface CartContextValue {
  items: CartItem[];
  count: number;
  total: number;
  loaded: boolean;
  updateQty: (id: string, qty: number) => void;
  // returns true if the cake was added, false if it was already in the cart
  addToCart: (product: Product, notify?: boolean) => boolean;
  addCustomItem: (item: CustomCartItem, notify?: boolean) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "cakeshop-cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [toast, setToast] = useState<CartToastData | null>(null);
  const itemsRef = useRef<CartItem[]>([]);
  itemsRef.current = items; // always the latest cart, readable inside callbacks

  // Load saved cart once in the browser
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setItems(JSON.parse(saved));
    } catch {}
    setLoaded(true);
  }, []);

  // Save cart whenever it changes
  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }, [items, loaded]);

  // A cake can be added only once. A second try shows an "already added" notice instead.
  // notify=false skips the popup (used when we jump straight to the cart page).
  const addToCart = useCallback((product: Product, notify = true): boolean => {
    if (itemsRef.current.some((i) => i.id === product.id)) {
      if (notify) setToast({ id: Date.now(), name: product.name, image: product.image, variant: "exists" });
      return false;
    }
    if (notify) setToast({ id: Date.now(), name: product.name, image: product.image, variant: "added" });
    const item: CartItem = { id: product.id, name: product.name, price: product.price, image: product.image, qty: 1 };
    itemsRef.current = [...itemsRef.current, item]; // so a very fast double-click cannot add it twice
    setItems((prev) => [...prev, item]);
    return true;
  }, []);

  // Custom cakes are always their own cart line (unique id), never merged with another
  const addCustomItem = useCallback((item: CustomCartItem, notify = true) => {
    if (notify) setToast({ id: Date.now(), name: item.name, image: item.image, variant: "added" });
    const id = `custom-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    setItems((prev) => [...prev, { id, ...item, qty: 1 }]);
  }, []);

  const updateQty = useCallback((id: string, qty: number) => {
    setItems((prev) =>
      qty <= 0
        ? prev.filter((i) => i.id !== id)
        : prev.map((i) => (i.id === id ? { ...i, qty } : i))
    );
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      count: items.reduce((n, i) => n + i.qty, 0),
      total: items.reduce((n, i) => n + i.qty * i.price, 0),
      loaded,
      updateQty,
      addToCart,
      addCustomItem,
      removeFromCart,
      clearCart,
    }),
    [items, loaded, updateQty, addToCart, addCustomItem, removeFromCart, clearCart]
  );

  return (
    <CartContext.Provider value={value}>
      {children}
      <CartToast toast={toast} onClose={() => setToast(null)} />
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
