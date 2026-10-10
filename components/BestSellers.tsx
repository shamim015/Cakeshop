import ProductCard from "./ProductCard";
import Reveal from "./Reveal";
import { products } from "@/data/products";
export default function BestSellers() {
  return (
    <section className="pb-8">
      <div className="container-wide">
        <Reveal>
          <h2 className="section-title text-center">Best Sellers<span className="title-line" /></h2>
        </Reveal>
        <div className="mt-7 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4 lg:gap-7">
          {products.map((p, i) => (
            <Reveal key={p.id} index={i % 4} className="h-full">
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
