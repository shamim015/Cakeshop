import type { Category } from "@/types";
export const categories: Category[] = [
  { id: "birthday", name: "Birthday Cakes", image: "/images/birthday-cake.jpg", href: "/shop?c=birthday" },
  { id: "wedding", name: "Wedding Cakes", image: "/images/wedding-cake.jpg", href: "/shop?c=wedding" },
  { id: "anniversary", name: "Anniversary Cakes", image: "/images/anniversary-cake.jpg", href: "/shop?c=anniversary" },
  { id: "photo", name: "Photo Cakes", image: "/images/photo-cake.jpg", href: "/shop?c=photo" },
  { id: "cupcakes", name: "Cupcakes", image: "/images/cupcakes.jpg", href: "/shop?c=cupcakes" },
];
