import type { Metadata } from "next";
import { Mail, Phone } from "lucide-react";
import PageShell from "@/components/PageShell";

export const metadata: Metadata = { title: "Contact – CakeShop" };

export default function ContactPage() {
  return (
    <PageShell title="Contact Us" subtitle="Have a question or a custom cake idea? We'd love to hear from you.">
      <div className="mx-auto grid max-w-3xl gap-6 md:grid-cols-2">
        <div className="rounded-xl bg-brand-soft p-6 text-center">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white text-brand shadow-sm">
            <Phone className="h-6 w-6" />
          </span>
          <h2 className="mt-4 font-serif text-lg font-bold">Call us</h2>
          <p className="mt-2 text-sm text-gray-600">01521233469</p>
          <a href="tel:+923001234567" className="btn-primary mt-4 !px-8">Call Now</a>
        </div>
        <div className="rounded-xl bg-brand-soft p-6 text-center">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white text-brand shadow-sm">
            <Mail className="h-6 w-6" />
          </span>
          <h2 className="mt-4 font-serif text-lg font-bold">Email us</h2>
          <p className="mt-2 text-sm text-gray-600">info@cakeshop.com</p>
          <a href="mailto:info@cakeshop.com" className="btn-primary mt-4 !px-8">Send Email</a>
        </div>
      </div>
    </PageShell>
  );
}
