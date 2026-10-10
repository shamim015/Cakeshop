import ProductCard from "./ProductCard";
import { products } from "@/data/products";
export default function BestSellers() {
  return (
    <section className="pb-8">
      <div className="container-wide">
        <h2 className="section-title text-center">Best Sellers<span className="title-line" /></h2>
        <div className="mt-7 grid grid-cols-1 gap-5 lg:gap-7 min-[480px]:grid-cols-2 lg:grid-cols-4">
          {products.map((p) => (<ProductCard key={p.id} product={p} />))}
        </div>
      </div>
    </section>
  );
}
