"use client";
import { useState } from "react";
import Link from "next/link";
import { Search, User, ShoppingCart, Menu, X, ChevronDown, MapPin, Phone, Mail, Facebook, Instagram, MessageCircle } from "lucide-react";
import Logo from "./Logo";

const nav = [
  { label: "Home", href: "/", dropdown: false },
  { label: "Shop", href: "/shop", dropdown: false },
  { label: "Cakes", href: "/cakes", dropdown: true },
  { label: "Occasions", href: "/occasions", dropdown: true },
  { label: "About Us", href: "/about", dropdown: false },
  { label: "Contact", href: "/contact", dropdown: false },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 bg-white">
      <div className="bg-[#FDB5CE] text-[11px] text-white">
        <div className="container-x flex h-9 items-center justify-between">
          <span className="flex items-center gap-1.5"><MapPin className="h-3 w-3" />Delivering happiness to your doorsteps!</span>
          <div className="hidden items-center gap-4 sm:flex">
            <a href="tel:+923001234567" className="flex items-center gap-1"><Phone className="h-3 w-3" />+92 300 1234567</a>
            <a href="mailto:info@cakeshop.com" className="flex items-center gap-1"><Mail className="h-3 w-3" />info@cakeshop.com</a>
            <Facebook className="h-3 w-3" aria-label="Facebook" /><Instagram className="h-3 w-3" aria-label="Instagram" /><MessageCircle className="h-3 w-3" aria-label="WhatsApp" />
          </div>
        </div>
      </div>
      <div className="border-b border-gray-100 shadow-sm">
        <div className="container-x flex h-16 items-center md:h-[88px] justify-between">
          <Logo />
          <nav aria-label="Main" className="hidden items-center gap-9 text-[14px] md:flex">
            {nav.map((n, i) => (
              <Link key={n.label} href={n.href} className={`flex items-center gap-1 transition hover:text-brand ${i === 0 ? "text-brand" : ""}`}>
                {n.label}{n.dropdown && <ChevronDown className="h-3 w-3" />}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-4 md:gap-7">
            <button aria-label="Search" className="hover:text-brand"><Search className="h-5 w-5" /></button>
            <button aria-label="Account" className="hidden hover:text-brand sm:block"><User className="h-5 w-5" /></button>
            <button aria-label="Cart" className="relative hover:text-brand">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-brand text-[9px] font-bold text-white">0</span>
            </button>
            <button aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)} className="md:hidden">
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
        {open && (
          <nav aria-label="Mobile" className="container-x flex flex-col gap-1 border-t border-gray-100 pb-4 pt-2 md:hidden">
            {nav.map((n) => (<Link key={n.label} href={n.href} onClick={() => setOpen(false)} className="py-2 text-sm hover:text-brand">{n.label}</Link>))}
          </nav>
        )}
      </div>
    </header>
  );
}
