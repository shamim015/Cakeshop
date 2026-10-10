import type { Metadata } from "next";
import { Cake, Heart, Truck } from "lucide-react";
import PageShell from "@/components/PageShell";

export const metadata: Metadata = { title: "About Us – CakeShop" };

const points = [
  { icon: Heart, title: "Made with love", text: "Every cake is handmade with care, one order at a time." },
  { icon: Cake, title: "Baked fresh", text: "We use premium ingredients and bake fresh for you." },
  { icon: Truck, title: "Delivered on time", text: "Order online and get your cake delivered to your doorstep." },
];

export default function AboutPage() {
  return (
    <PageShell title="About Us" subtitle="We bake more than cakes, we bake happiness!">
      <div className="mx-auto max-w-2xl space-y-4 text-center text-[15px] leading-relaxed text-gray-700">
        <p>
          CakeShop is all about making your special moments sweeter. From birthdays and weddings to anniversaries and
          everyday treats, we bake each cake with the finest ingredients and a lot of love.
        </p>
        <p>You can order online, pick your favourites and have them delivered fresh to your doorstep.</p>
      </div>
      <ul className="mt-10 grid gap-6 md:grid-cols-3">
        {points.map(({ icon: Icon, title, text }) => (
          <li key={title} className="rounded-xl bg-brand-soft p-6 text-center">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white text-brand shadow-sm">
              <Icon className="h-6 w-6" />
            </span>
            <h2 className="mt-4 font-serif text-lg font-bold">{title}</h2>
            <p className="mt-2 text-sm text-gray-600">{text}</p>
          </li>
        ))}
      </ul>
    </PageShell>
  );
}
