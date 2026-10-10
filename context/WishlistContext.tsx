"use client";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { Product } from "@/types";
import WishlistDrawer from "@/components/WishlistDrawer";

interface WishlistContextValue {
  items: Product[];
  count: number;
  isOpen: boolean;
  has: (id: string) => boolean;
  toggle: (product: Product) => void;
  remove: (id: string) => void;
  openDrawer: () => void;
  closeDrawer: () => void;
}

const WishlistContext = createContext<WishlistContextValue | null>(null);
const STORAGE_KEY = "cakeshop-wishlist";

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Product[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Load saved favorites once in the browser
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setItems(JSON.parse(saved));
    } catch {}
    setLoaded(true);
  }, []);

  // Save whenever the list changes
  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }, [items, loaded]);

  const has = useCallback((id: string) => items.some((i) => i.id === id), [items]);
  const toggle = useCallback((product: Product) => {
    setItems((prev) => (prev.some((i) => i.id === product.id) ? prev.filter((i) => i.id !== product.id) : [...prev, product]));
  }, []);
  const remove = useCallback((id: string) => setItems((prev) => prev.filter((i) => i.id !== id)), []);
  const openDrawer = useCallback(() => setIsOpen(true), []);
  const closeDrawer = useCallback(() => setIsOpen(false), []);

  const value = useMemo<WishlistContextValue>(
    () => ({ items, count: items.length, isOpen, has, toggle, remove, openDrawer, closeDrawer }),
    [items, isOpen, has, toggle, remove, openDrawer, closeDrawer]
  );

  return (
    <WishlistContext.Provider value={value}>
      {children}
      <WishlistDrawer />
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used inside <WishlistProvider>");
  return ctx;
}
