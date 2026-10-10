import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartView from "@/components/CartView";

export const metadata: Metadata = {
  title: "Your Cart – CakeShop",
};

export default function CartPage() {
  return (
    <>
      <Header />
      <main className="min-h-[60vh] bg-white pb-16 pt-10">
        <div className="container-wide">
          <h1 className="section-title text-center">
            Your Cart<span className="title-line" />
          </h1>
          <CartView />
        </div>
      </main>
      <Footer />
    </>
  );
}
