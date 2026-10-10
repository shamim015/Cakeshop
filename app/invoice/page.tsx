import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import InvoiceView from "@/components/InvoiceView";

export const metadata: Metadata = { title: "Invoice – CakeShop" };

export default function InvoicePage() {
  return (
    <>
      <div className="contents print:hidden"><Header /></div>
      <main className="min-h-[60vh] bg-white pb-16 pt-10 print:pb-0 print:pt-0">
        <div className="container-wide">
          <InvoiceView />
        </div>
      </main>
      <div className="print:hidden"><Footer /></div>
    </>
  );
}
