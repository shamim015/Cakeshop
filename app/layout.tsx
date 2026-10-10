import type { Metadata } from "next";
import { Inter, Tinos, Dancing_Script } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";

const sans = Inter({ subsets: ["latin"], variable: "--font-sans" });
const serif = Tinos({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-serif",
});
const script = Dancing_Script({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-script",
});

export const metadata: Metadata = {
  title: "CakeShop – Delicious Cakes for Every Occasion",
  description: "Handmade cakes delivered to your doorstep.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable} ${script.variable}`}>
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
