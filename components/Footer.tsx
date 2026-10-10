import Link from "next/link";
import { Facebook, Instagram, MessageCircle } from "lucide-react";
import Logo from "./Logo";
const quick = ["Home", "Shop", "About Us", "Contact Us", "FAQs"];
const service = ["My Account", "Track Order", "Shipping Policy", "Return & Refund", "Terms & Conditions"];
const pay = [{ n: "VISA", c: "text-blue-800" }, { n: "Mastercard", c: "text-red-600" }, { n: "JazzCash", c: "text-amber-600" }, { n: "easyPaisa", c: "text-green-700" }];
const LinkList = ({ title, items }: { title: string; items: string[] }) => (
  <div>
    <h3 className="mb-3 text-[13px] font-bold">{title}</h3>
    <ul className="space-y-2 text-[11px] text-gray-600">
      {items.map((i) => (<li key={i}><Link href="#" className="hover:text-brand">{i}</Link></li>))}
    </ul>
  </div>
);
export default function Footer() {
  return (
    <footer className="bg-[#FFF8FA]">
      <div className="container-wide grid gap-8 pb-5 pt-7 sm:grid-cols-2 lg:grid-cols-[1.25fr_1fr_1fr_1.35fr]">
        <div>
          <Logo small />
          <p className="mt-3 text-[11px] leading-[1.75] text-gray-600">We bake more than cakes,<br />we bake happiness!<br />Thank you for choosing us.</p>
          <div className="mt-3 flex gap-3">
            <a href="#" aria-label="Facebook" className="flex h-6 w-6 items-center justify-center rounded-full bg-[#1877F2] text-white"><Facebook className="h-3.5 w-3.5" /></a>
            <a href="#" aria-label="Instagram" className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-tr from-amber-400 via-pink-500 to-purple-600 text-white"><Instagram className="h-3.5 w-3.5" /></a>
            <a href="#" aria-label="WhatsApp" className="flex h-6 w-6 items-center justify-center rounded-full bg-[#25D366] text-white"><MessageCircle className="h-3.5 w-3.5" /></a>
          </div>
        </div>
        <LinkList title="Quick Links" items={quick} />
        <LinkList title="Customer Service" items={service} />
        <div>
          <h3 className="mb-3 text-[13px] font-bold">Newsletter</h3>
          <p className="mb-3 text-[11px] leading-[1.75] text-gray-600">Subscribe to get updates<br />on new cakes and offers.</p>
          <form className="flex max-w-[300px]">
            <label htmlFor="nl" className="sr-only">Email</label>
            <input id="nl" type="email" placeholder="Enter your email" className="min-w-0 flex-1 rounded-l-[4px] border border-gray-200 bg-white px-3 py-2 text-[11px] outline-none focus:border-brand" />
            <button type="submit" className="rounded-r-[4px] bg-brand px-4 text-[10px] font-bold uppercase text-white hover:bg-brand-dark">Subscribe</button>
          </form>
        </div>
      </div>
      <div className="border-t border-pink-100">
        <div className="container-wide flex flex-col items-center justify-between gap-3 py-3 text-[12px] text-gray-600 sm:flex-row">
          <p>© 2026 CakeShop. All Rights Reserved.</p>
          <ul className="flex items-center gap-4 text-[13px] font-bold italic">
            {pay.map((p) => (<li key={p.n} className={p.c}>{p.n}</li>))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
