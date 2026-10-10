import Image from "next/image";
import Link from "next/link";
import { categories } from "@/data/categories";
export default function CategorySection() {
  return (
    <section className="pb-8 pt-6">
      <div className="container-wide">
        <h2 className="section-title text-center">Shop by Category<span className="title-line" /></h2>
        <ul className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-5">
          {categories.map((c) => (
            <li key={c.id}>
              <Link href={c.href} className="group flex flex-col items-center gap-4">
                <span className="relative h-32 w-32 overflow-hidden rounded-full border-4 border-white bg-brand-soft shadow-md md:h-[154px] md:w-[154px]">
                  <Image src={c.image} alt={c.name} fill sizes="150px" className="object-cover transition duration-300 group-hover:scale-105" />
                </span>
                <span className="text-sm font-semibold group-hover:text-brand">{c.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
