import { useId } from "react";
import Link from "next/link";

/** 3D-style two-tier cake icon (gradients + shading, no image file needed). */
function CakeIcon3D({ className = "" }: { className?: string }) {
  const uid = useId().replace(/:/g, "");
  const id = (n: string) => `${uid}-${n}`;
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      aria-hidden="true"
      style={{ filter: "drop-shadow(0 2px 2px rgba(217,58,116,0.28))" }}
    >
      <defs>
        <linearGradient id={id("body")} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#D93A74" />
          <stop offset=".3" stopColor="#FF6B9D" />
          <stop offset=".6" stopColor="#FF8FB5" />
          <stop offset="1" stopColor="#D93A74" />
        </linearGradient>
        <linearGradient id={id("body2")} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#E8467F" />
          <stop offset=".35" stopColor="#FF86AC" />
          <stop offset=".65" stopColor="#FFA7C4" />
          <stop offset="1" stopColor="#E8467F" />
        </linearGradient>
        <radialGradient id={id("top")} cx=".4" cy=".35" r=".8">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#FFD0E0" />
        </radialGradient>
        <radialGradient id={id("cherry")} cx=".35" cy=".3" r=".8">
          <stop offset="0" stopColor="#FF8DAA" />
          <stop offset=".5" stopColor="#E91E63" />
          <stop offset="1" stopColor="#A5124A" />
        </radialGradient>
        <linearGradient id={id("plate")} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#F2BFD1" />
        </linearGradient>
      </defs>

      {/* shadow + plate */}
      <ellipse cx="32" cy="59" rx="27" ry="3" fill="#B0305F" opacity=".18" />
      <ellipse cx="32" cy="56" rx="30" ry="6" fill={`url(#${id("plate")})`} />

      {/* bottom tier */}
      <path d="M10 38v12a22 6 0 0 0 44 0V38Z" fill={`url(#${id("body")})`} />
      <rect x="14" y="41" width="2" height="9" rx="1" fill="#fff" opacity=".22" />
      <g fill="#FFE0EA">
        <rect x="12" y="38.5" width="4" height="8" rx="2" />
        <rect x="18" y="40" width="4" height="11" rx="2" />
        <rect x="24" y="40.8" width="4" height="7" rx="2" />
        <rect x="30" y="41" width="4" height="10" rx="2" />
        <rect x="36" y="40.8" width="4" height="8" rx="2" />
        <rect x="42" y="40" width="4" height="12" rx="2" />
        <rect x="48" y="38.5" width="4" height="8" rx="2" />
      </g>
      <ellipse cx="32" cy="38" rx="22" ry="6" fill={`url(#${id("top")})`} />

      {/* top tier */}
      <path d="M18 26v12a14 4 0 0 0 28 0V26Z" fill={`url(#${id("body2")})`} />
      <g fill="#FFE0EA">
        <rect x="22" y="26.3" width="4" height="7" rx="2" />
        <rect x="30" y="27" width="4" height="9" rx="2" />
        <rect x="38" y="26.3" width="4" height="7" rx="2" />
      </g>
      <ellipse cx="32" cy="26" rx="14" ry="4" fill={`url(#${id("top")})`} />

      {/* cherry */}
      <path d="M32 19.6q1-4.2 4.5-5" fill="none" stroke="#3FA34D" strokeWidth="1.3" strokeLinecap="round" />
      <circle cx="32" cy="23" r="3.6" fill={`url(#${id("cherry")})`} />
      <ellipse cx="30.8" cy="21.7" rx="1.1" ry=".7" fill="#fff" opacity=".8" />
    </svg>
  );
}

export default function Logo({ small = false }: { small?: boolean }) {
  return (
    <Link href="/" className="group flex items-center gap-2" aria-label="CakeShop home">
      <CakeIcon3D
        className={`transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:scale-110 ${small ? "h-10 w-10" : "h-[52px] w-[52px] md:h-14 md:w-14"}`}
      />
      <span className="leading-none">
        <span className={`block font-script font-bold text-brand-ink ${small ? "text-2xl" : "text-4xl"}`}>Cake<span className="text-brand">Shop</span></span>
        <span className={`block text-center tracking-wide text-gray-600 ${small ? "text-[8px]" : "text-[10px]"}`}>— Baked with Love —</span>
      </span>
    </Link>
  );
}
