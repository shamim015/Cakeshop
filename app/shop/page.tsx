import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";

export const metadata: Metadata = { title: "Shop – CakeShop" };

export default function ShopPage() {
  return (
    <PageShell title="Shop" subtitle="Freshly baked cakes made with the finest ingredients. Add your favourites to the cart.">
      <div className="grid grid-cols-1 gap-5 min-[480px]:grid-cols-2 lg:grid-cols-4 lg:gap-7">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </PageShell>
  );
}
