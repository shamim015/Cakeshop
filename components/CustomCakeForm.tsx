"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Check, ShoppingCart, Zap } from "lucide-react";
import { useCart } from "@/context/CartContext";

/* ---------- Edit prices / options here ---------- */
const flavors = [
  { id: "chocolate", name: "Chocolate", perLb: 1800, image: "/images/chocolate-delight.webp" },
  { id: "red-velvet", name: "Red Velvet", perLb: 1900, image: "/images/red-velvet.webp" },
  { id: "black-forest", name: "Black Forest", perLb: 1700, image: "/images/black-forest.webp" },
  { id: "mango", name: "Mango", perLb: 1600, image: "/images/mango-cake.webp" },
  { id: "vanilla", name: "Vanilla", perLb: 1500, image: "/images/wedding-cake.webp" },
];
const sizes = [
  { lb: 1, serves: "4–6" },
  { lb: 2, serves: "8–10" },
  { lb: 3, serves: "12–15" },
  { lb: 5, serves: "20–25" },
];
const shapes = [
  { id: "round", name: "Round", extra: 0 },
  { id: "square", name: "Square", extra: 0 },
  { id: "heart", name: "Heart", extra: 300 },
];
const extrasList = [
  { id: "candles", name: "Candles & knife", price: 150 },
  { id: "topper", name: "Cake topper", price: 300 },
  { id: "photo", name: "Edible photo print", price: 600 },
];
const MIN_DAYS_AHEAD = 2; // custom cakes need time to bake
const MAX_MESSAGE = 30;
const MAX_NOTES = 300;
/* ------------------------------------------------ */

const rs = (n: number) => `Tk ${n.toLocaleString("en-US")}`;
const toISO = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

const optionBox =
  "block rounded-lg border border-gray-200 bg-white text-center text-sm transition hover:border-brand/60 peer-checked:border-brand peer-checked:bg-brand-soft peer-checked:font-semibold peer-checked:text-brand peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand";
const card = "rounded-xl border border-gray-100 bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.06)]";
const field =
  "mt-2 w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none transition placeholder:text-gray-400 focus:border-brand focus:ring-2 focus:ring-brand/20";

function Legend({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <legend className="mb-3 flex items-center gap-2 text-[15px] font-bold">
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand text-xs text-white">{n}</span>
      {children}
    </legend>
  );
}

export default function CustomCakeForm() {
  const { addCustomItem } = useCart();
  const router = useRouter();
  const dateRef = useRef<HTMLInputElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  const [flavorId, setFlavorId] = useState(flavors[0].id);
  const [lb, setLb] = useState(2);
  const [shapeId, setShapeId] = useState("round");
  const [message, setMessage] = useState("");
  const [extras, setExtras] = useState<string[]>([]);
  const [date, setDate] = useState("");
  const [minDate, setMinDate] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  const [added, setAdded] = useState(false);

  // compute earliest delivery date in the browser (avoids server/client mismatch)
  useEffect(() => {
    const d = new Date();
    d.setDate(d.getDate() + MIN_DAYS_AHEAD);
    setMinDate(toISO(d));
    return () => clearTimeout(timer.current);
  }, []);

  const flavor = flavors.find((f) => f.id === flavorId)!;
  const shape = shapes.find((s) => s.id === shapeId)!;
  const chosenExtras = extrasList.filter((e) => extras.includes(e.id));
  const price = flavor.perLb * lb + shape.extra + chosenExtras.reduce((n, e) => n + e.price, 0);
  const serves = sizes.find((s) => s.lb === lb)?.serves;

  const toggleExtra = (id: string) =>
    setExtras((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const submit = (goToCart: boolean) => {
    if (!date || (minDate && date < minDate)) {
      setError(`Please pick a delivery date (earliest is ${minDate ? new Date(minDate + "T00:00").toLocaleDateString("en-GB", { day: "numeric", month: "short" }) : `${MIN_DAYS_AHEAD} days from today`}).`);
      dateRef.current?.focus();
      return;
    }
    setError("");

    const details = [
      `Flavor: ${flavor.name}`,
      `Size: ${lb} lb (serves ${serves})`,
      `Shape: ${shape.name}`,
      ...(message.trim() ? [`Message: “${message.trim()}”`] : []),
      ...(chosenExtras.length ? [`Extras: ${chosenExtras.map((e) => e.name).join(", ")}`] : []),
      `Delivery date: ${new Date(date + "T00:00").toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}`,
      ...(notes.trim() ? [`Notes: ${notes.trim()}`] : []),
    ];

    addCustomItem({ name: `Custom ${flavor.name} Cake`, price, image: flavor.image, details }, !goToCart);

    if (goToCart) {
      router.push("/cart");
    } else {
      setAdded(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setAdded(false), 2500);
    }
  };

  return (
    <div className="grid items-start gap-6 lg:grid-cols-[1fr_340px]">
      <div className="space-y-5">
        {/* 1. Flavor */}
        <fieldset className={card}>
          <Legend n={1}>Choose a flavor</Legend>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
            {flavors.map((f) => (
              <label key={f.id} className="cursor-pointer">
                <input type="radio" name="flavor" className="peer sr-only" checked={flavorId === f.id} onChange={() => setFlavorId(f.id)} />
                <span className={`${optionBox} p-2`}>
                  <span className="relative mx-auto block h-16 w-16 overflow-hidden rounded-full bg-brand-soft">
                    <Image src={f.image} alt="" fill sizes="64px" className="object-cover" />
                  </span>
                  <span className="mt-2 block text-[13px]">{f.name}</span>
                  <span className="block text-[11px] font-normal text-gray-500">{rs(f.perLb)}/lb</span>
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        {/* 2. Size + shape */}
        <fieldset className={card}>
          <Legend n={2}>Size &amp; shape</Legend>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {sizes.map((s) => (
              <label key={s.lb} className="cursor-pointer">
                <input type="radio" name="size" className="peer sr-only" checked={lb === s.lb} onChange={() => setLb(s.lb)} />
                <span className={`${optionBox} px-3 py-2.5`}>
                  {s.lb} lb
                  <span className="block text-[11px] font-normal text-gray-500">Serves {s.serves}</span>
                </span>
              </label>
            ))}
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3">
            {shapes.map((s) => (
              <label key={s.id} className="cursor-pointer">
                <input type="radio" name="shape" className="peer sr-only" checked={shapeId === s.id} onChange={() => setShapeId(s.id)} />
                <span className={`${optionBox} px-3 py-2.5`}>
                  {s.name}
                  {s.extra > 0 && <span className="block text-[11px] font-normal text-gray-500">+{rs(s.extra)}</span>}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        {/* 3. Message + extras */}
        <fieldset className={card}>
          <Legend n={3}>Message &amp; extras</Legend>
          <label className="block text-sm font-semibold" htmlFor="cake-message">
            Message on the cake <span className="font-normal text-gray-500">(optional)</span>
          </label>
          <input
            id="cake-message"
            type="text"
            maxLength={MAX_MESSAGE}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="e.g. Happy Birthday Ayesha!"
            className={field}
          />
          <p className="mt-1 text-right text-[11px] text-gray-500">{message.length}/{MAX_MESSAGE}</p>

          <p className="mt-3 text-sm font-semibold">Add extras</p>
          <div className="mt-2 grid gap-3 sm:grid-cols-3">
            {extrasList.map((e) => (
              <label key={e.id} className="cursor-pointer">
                <input type="checkbox" className="peer sr-only" checked={extras.includes(e.id)} onChange={() => toggleExtra(e.id)} />
                <span className={`${optionBox} px-3 py-2.5`}>
                  {e.name}
                  <span className="block text-[11px] font-normal text-gray-500">+{rs(e.price)}</span>
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        {/* 4. Delivery + notes */}
        <fieldset className={card}>
          <Legend n={4}>Delivery &amp; ideas</Legend>
          <label className="block text-sm font-semibold" htmlFor="cake-date">Delivery date</label>
          <input
            ref={dateRef}
            id="cake-date"
            type="date"
            min={minDate}
            value={date}
            onChange={(e) => { setDate(e.target.value); setError(""); }}
            aria-invalid={!!error}
            aria-describedby={error ? "cake-date-error" : undefined}
            className={`${field} sm:max-w-[240px] ${error ? "!border-red-400" : ""}`}
          />
          {error && <p id="cake-date-error" role="alert" className="mt-1.5 text-xs text-red-500">{error}</p>}

          <label className="mt-4 block text-sm font-semibold" htmlFor="cake-notes">
            Design ideas / special notes <span className="font-normal text-gray-500">(optional)</span>
          </label>
          <textarea
            id="cake-notes"
            rows={4}
            maxLength={MAX_NOTES}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Colors, theme, decorations, allergies..."
            className={`${field} resize-none`}
          />
          <p className="mt-1 text-right text-[11px] text-gray-500">{notes.length}/{MAX_NOTES}</p>
        </fieldset>
      </div>

      {/* Summary */}
      <aside className="rounded-xl bg-brand-soft p-5 lg:sticky lg:top-32">
        <h2 className="font-serif text-xl font-bold">Your Cake</h2>
        <div className="relative mt-4 aspect-[4/3] overflow-hidden rounded-lg bg-white">
          <div key={flavor.id} className="swap-in absolute inset-0">
            <Image src={flavor.image} alt={`${flavor.name} cake`} fill sizes="340px" className="object-contain p-2" />
          </div>
        </div>

        <dl className="mt-4 space-y-1.5 text-sm">
          <div className="flex justify-between"><dt className="text-gray-600">Flavor</dt><dd className="font-semibold">{flavor.name}</dd></div>
          <div className="flex justify-between"><dt className="text-gray-600">Size</dt><dd className="font-semibold">{lb} lb · serves {serves}</dd></div>
          <div className="flex justify-between"><dt className="text-gray-600">Shape</dt><dd className="font-semibold">{shape.name}</dd></div>
          {chosenExtras.length > 0 && (
            <div className="flex justify-between gap-4"><dt className="text-gray-600">Extras</dt><dd className="text-right font-semibold">{chosenExtras.map((e) => e.name).join(", ")}</dd></div>
          )}
        </dl>

        <div className="mt-4 flex justify-between border-t border-pink-200 pt-4 text-base font-bold">
          <span>Total</span>
          <span>{rs(price)}</span>
        </div>

        <button type="button" onClick={() => submit(true)} className="btn-primary btn-shine mt-5 w-full">
          <Zap className="h-3.5 w-3.5" />
          Order Now
        </button>
        <button type="button" onClick={() => submit(false)} className="btn-outline mt-3 w-full">
          {added ? <Check className="check-pop h-3.5 w-3.5 text-brand" /> : <ShoppingCart className="h-3.5 w-3.5" />}
          {added ? "Added to Cart" : "Add to Cart"}
        </button>
        {added && (
          <Link href="/cart" className="mt-3 block text-center text-xs font-semibold text-brand hover:underline">
            View My Cart →
          </Link>
        )}
        <p className="mt-4 text-center text-[11px] leading-relaxed text-gray-500">
          Custom cakes are baked fresh. Please order at least {MIN_DAYS_AHEAD} days before delivery.
        </p>
      </aside>
    </div>
  );
}
