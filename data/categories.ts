import type { Category } from "@/types";
export const categories: Category[] = [
  {
    id: "birthday",
    name: "Birthday Cakes",
    image: "/images/birthday-cake.webp",
    href: "/shop?c=birthday",
  },
  {
    id: "wedding",
    name: "Wedding Cakes",
    image: "/images/wedding-cake.webp",
    href: "/shop?c=wedding",
  },
  {
    id: "anniversary",
    name: "Anniversary Cakes",
    image: "/images/anniversary-cake.webp",
    href: "/shop?c=anniversary",
  },
  {
    id: "photo",
    name: "Photo Cakes",
    image: "/images/photo-cake.webp",
    href: "/shop?c=photo",
  },
  {
    id: "cupcakes",
    name: "Cupcakes",
    image: "/images/cupcakes.webp",
    href: "/shop?c=cupcakes",
  },
];
