import { Bike, Award, Cake, Lock } from "lucide-react";
const features = [
  { icon: Bike, title: "Fast Delivery", text: "On time, every time" },
  { icon: Award, title: "Best Quality", text: "We use premium ingredients" },
  { icon: Cake, title: "100% Fresh", text: "Baked fresh for you" },
  { icon: Lock, title: "Secure Payments", text: "100% secure checkout" },
];
export default function Features() {
  return (
    <section aria-label="Our promises" className="relative z-20 -mt-12">
      <div className="container-wide">
        <div className="rounded-xl bg-white p-2 shadow-[0_4px_20px_rgba(255,92,147,0.12)]">
          <ul className="grid grid-cols-2 gap-y-6 rounded-lg bg-[#FFF7FA] px-2 py-5 md:grid-cols-4 md:px-6">
            {features.map(({ icon: Icon, title, text }, i) => (
              <li key={title} className={`flex items-center gap-3 px-2 md:px-6 ${i > 0 ? "md:border-l md:border-gray-200" : ""}`}>
                <Icon className="h-12 w-12 shrink-0 text-brand" strokeWidth={1.2} />
                <div><p className="text-sm font-semibold">{title}</p><p className="text-xs text-gray-500">{text}</p></div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
