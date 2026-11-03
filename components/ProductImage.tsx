"use client";

import { useEffect, useRef, useState } from "react";
import {
  HardHat,
  Drill,
  Hammer,
  Ruler,
  Zap,
  Construction,
  type LucideIcon,
} from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  "Safety Gear": HardHat,
  "Power Tools": Drill,
  "Hand Tools": Hammer,
  Measuring: Ruler,
  Electrical: Zap,
  "Site Equipment": Construction,
};

type Props = {
  src: string | null;
  alt: string;
  category: string;
};

export default function ProductImage({ src, alt, category }: Props) {
  const [failed, setFailed] = useState(false);
  const ref = useRef<HTMLImageElement>(null);
  const Icon = ICONS[category] ?? Construction;

  // Catches images that failed before React finished loading
  useEffect(() => {
    const el = ref.current;
    if (el && el.complete && el.naturalWidth === 0) setFailed(true);
  }, []);

  if (src && !failed) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        ref={ref}
        src={src}
        alt={alt}
        onError={() => setFailed(true)}
        className="aspect-[4/3] w-full object-cover"
      />
    );
  }

  return (
    <div className="relative grid aspect-[4/3] w-full place-items-center overflow-hidden bg-neutral-950">
      <div className="tech-grid-flat absolute inset-0" />
      <div className="absolute h-44 w-44 rounded-full bg-strom-orange/25 blur-3xl" />
      <div className="relative grid h-24 w-24 place-items-center border border-strom-orange/70 bg-black/60 shadow-[0_0_40px_rgba(255,106,0,0.4)]">
        <Icon className="h-12 w-12 text-strom-orange" strokeWidth={1.25} />
      </div>
      <span className="absolute bottom-3 left-3 font-mono text-[10px] uppercase tracking-widest text-neutral-500">
        IMG // pending
      </span>
    </div>
  );
}
