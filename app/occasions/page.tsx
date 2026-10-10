import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageShell from "@/components/PageShell";

export const metadata: Metadata = { title: "Occasions – CakeShop" };

const occasions = [
  {
    id: "birthday",
    name: "Birthday",
    image: "/images/birthday-cake.webp",
    text: "Make the day sweeter with a cake baked just for the birthday star.",
  },
  {
    id: "wedding",
    name: "Wedding",
    image: "/images/wedding-cake.webp",
    text: "Elegant tiered cakes to celebrate the start of a new journey.",
  },
  {
    id: "anniversary",
    name: "Anniversary",
    image: "/images/anniversary-cake.webp",
    text: "Celebrate your years together with a cake full of love.",
  },
];

export default function OccasionsPage() {
  return (
    <PageShell title="Occasions" subtitle="A cake for every moment worth celebrating.">
      <div className="grid gap-6 md:grid-cols-3">
        {occasions.map((o) => (
          <section
            key={o.id}
            id={o.id}
            className="scroll-mt-32 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.06)]"
          >
            <div className="relative h-52 bg-brand-soft">
              <Image src={o.image} alt={`${o.name} cake`} fill sizes="(min-width:768px) 360px, 100vw" className="object-contain p-4" />
            </div>
            <div className="p-5">
              <h2 className="font-serif text-xl font-bold">{o.name}</h2>
              <p className="mt-2 text-sm text-gray-600">{o.text}</p>
              <Link href={`/shop?c=${o.id}`} className="btn-primary mt-4 !px-6">
                Browse Cakes
              </Link>
            </div>
          </section>
        ))}
      </div>
    </PageShell>
  );
}
