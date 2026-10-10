import { SHOP } from "./shop";

export type PaymentId = "cod" | "bkash" | "nagad";

export const PAYMENTS: { id: PaymentId; name: string; hint: string }[] = [
  { id: "cod", name: "Cash on Delivery", hint: "Pay when your cake arrives." },
  { id: "bkash", name: "bKash", hint: "We'll send our bKash number on WhatsApp." },
  { id: "nagad", name: "Nagad", hint: "We'll send our Nagad number on WhatsApp." },
];

export interface OrderItem {
  name: string;
  price: number;
  qty: number;
  details?: string[];
}

export interface Order {
  id: string;
  createdAt: string; // ISO date
  customer: { name: string; phone: string; email?: string; address: string; city: string; note?: string };
  payment: PaymentId;
  items: OrderItem[];
  subtotal: number;
  delivery: number;
  total: number;
}

export const tk = (n: number) => `Tk ${n.toLocaleString("en-US")}`;

export const calcDelivery = (subtotal: number) =>
  subtotal >= SHOP.freeDeliveryAbove ? 0 : SHOP.deliveryFee;

export const paymentName = (id: PaymentId) => PAYMENTS.find((p) => p.id === id)?.name ?? id;

export function newOrderId() {
  const d = new Date();
  const yy = String(d.getFullYear()).slice(2);
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `CS-${yy}${mm}${dd}-${rand}`;
}

const KEY = "cakeshop-last-order";

export function saveOrder(order: Order) {
  try {
    localStorage.setItem(KEY, JSON.stringify(order));
  } catch {}
}

export function loadOrder(): Order | null {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Order) : null;
  } catch {
    return null;
  }
}

/** Order text that is pre-filled in the WhatsApp chat with the shop. */
export function whatsappText(o: Order) {
  const lines: string[] = [];
  lines.push(`🎂 *New Order ${o.id}*`);
  lines.push("");
  lines.push(`👤 Name: ${o.customer.name}`);
  lines.push(`📞 Phone: ${o.customer.phone}`);
  if (o.customer.email) lines.push(`✉️ Email: ${o.customer.email}`);
  lines.push(`📍 Address: ${o.customer.address}, ${o.customer.city}`);
  lines.push(`💳 Payment: ${paymentName(o.payment)}`);
  lines.push("");
  lines.push("*Items*");
  o.items.forEach((it, i) => {
    lines.push(`${i + 1}. ${it.name} × ${it.qty} — ${tk(it.price * it.qty)}`);
    it.details?.forEach((d) => lines.push(`    • ${d}`));
  });
  lines.push("");
  lines.push(`Subtotal: ${tk(o.subtotal)}`);
  lines.push(`Delivery: ${o.delivery === 0 ? "Free" : tk(o.delivery)}`);
  lines.push(`*Total: ${tk(o.total)}*`);
  if (o.customer.note) {
    lines.push("");
    lines.push(`📝 Note: ${o.customer.note}`);
  }
  return lines.join("\n");
}

export const whatsappUrl = (o: Order) =>
  `https://wa.me/${SHOP.whatsapp}?text=${encodeURIComponent(whatsappText(o))}`;
