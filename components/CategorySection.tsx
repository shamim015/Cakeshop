import Image from "next/image";
import Link from "next/link";
import Reveal from "./Reveal";
import { categories } from "@/data/categories";
export default function CategorySection() {
  return (
    <section className="pb-8 pt-6">
      <div className="container-wide">
        <Reveal>
          <h2 className="section-title text-center">Shop by Category<span className="title-line" /></h2>
        </Reveal>
        <ul className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-5">
          {categories.map((c, i) => (
            <li key={c.id}>
              <Reveal index={i % 5} className="reveal-pop">
                <Link href={c.href} className="cat-link group flex flex-col items-center gap-4">
                  <span className="cat-circle relative h-32 w-32 overflow-hidden rounded-full border-4 border-white bg-brand-soft shadow-md md:h-[154px] md:w-[154px]">
                    <Image src={c.image} alt={c.name} fill sizes="150px" className="cat-img object-cover" />
                  </span>
                  <span className="cat-label text-sm font-semibold">{c.name}</span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
