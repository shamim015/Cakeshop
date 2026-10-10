"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

/**
 * Cake picture for the Custom Cake banner.
 * Mouse: hover lifts the cake. Touch: a tap keeps the hover look until you tap elsewhere.
 */
export default function CakeHoverImage() {
  const ref = useRef<HTMLDivElement>(null);
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (!touched) return;
    const off = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setTouched(false);
    };
    document.addEventListener("pointerdown", off);
    return () => document.removeEventListener("pointerdown", off);
  }, [touched]);

  return (
    <div
      ref={ref}
      onPointerUp={(e) => { if (e.pointerType !== "mouse") setTouched(true); }}
      className={`cake-stage ${touched ? "is-hover" : ""} relative mx-auto h-[260px] w-full max-w-[360px] md:absolute md:-bottom-[9px] md:left-[calc(22%+22px)] md:mx-0 md:h-[264px] md:w-[284px] md:max-w-none`}
    >
      <Image
        src="/images/chocolate-delight.webp"
        alt="Chocolate custom cake"
        fill
        sizes="(min-width:768px) 284px, 100vw"
        className="cake-hover object-contain object-bottom"
      />
    </div>
  );
}
