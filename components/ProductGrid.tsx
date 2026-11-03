"use client";

import { useState } from "react";
import ProductImage from "./ProductImage";

export type ProductView = {
  id: string;
  name: string;
  description: string;
  priceCents: number;
  imageUrl: string | null;
  category: string;
  fulfillmentType: string;
  stock: number;
};

const FILTERS = [
  { key: "ALL", label: "All" },
  { key: "MANUAL", label: "In stock" },
  { key: "DROPSHIP", label: "Dropship" },
];

export default function ProductGrid({ products }: { products: ProductView[] }) {
  const [filter, setFilter] = useState("ALL");

  const visible =
    filter === "ALL"
      ? products
      : products.filter((p) => p.fulfillmentType === filter);

  return (
    <div id="catalog">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="h-7 w-1.5 bg-strom-orange" />
          <h3 className="font-heading text-3xl font-bold uppercase tracking-wide text-strom-orange">
            Catalog
          </h3>
        </div>
        <div className="flex border border-strom-orange/40">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-4 py-2 font-mono text-xs uppercase tracking-widest transition ${
                filter === f.key
                  ? "bg-strom-orange text-black"
                  : "text-strom-orange hover:bg-strom-orange/10"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((p) => {
          const dropship = p.fulfillmentType === "DROPSHIP";
          return (
            <article
              key={p.id}
              className="bracket group border border-strom-orange/30 bg-neutral-950 transition hover:border-strom-orange hover:shadow-[0_0_40px_rgba(255,106,0,0.18)]"
            >
              <div className="relative overflow-hidden border-b border-strom-orange/30">
                <ProductImage
                  src={p.imageUrl}
                  alt={p.name}
                  category={p.category}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <span className="absolute left-3 top-3 flex items-center gap-2 border border-strom-orange/60 bg-black/70 px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-strom-white backdrop-blur">
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      dropship
                        ? "animate-pulse bg-strom-orange"
                        : "bg-strom-white"
                    }`}
                  />
                  {dropship ? "Auto-fulfilled" : "In stock"}
                </span>
              </div>

              <div className="p-5">
                <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-neutral-500">
                  <span>{p.category}</span>
                  <span>ID-{p.id.slice(-4).toUpperCase()}</span>
                </div>
                <h3 className="mt-2 font-heading text-xl font-semibold uppercase leading-tight text-strom-white">
                  {p.name}
                </h3>
                <p className="mt-1 text-sm text-neutral-400">{p.description}</p>

                <div className="mt-5 flex items-end justify-between gap-3">
                  <p className="font-heading text-3xl font-bold text-strom-orange">
                    ${(p.priceCents / 100).toFixed(2)}
                  </p>
                  <p className="text-right font-mono text-[10px] uppercase tracking-widest text-neutral-500">
                    {dropship
                      ? "Ships from supplier"
                      : `${p.stock} units · ships from Strom`}
                  </p>
                </div>

                <button className="mt-5 w-full bg-strom-orange py-3 font-heading text-base font-semibold uppercase tracking-widest text-black transition hover:bg-strom-white hover:shadow-[0_0_30px_rgba(255,255,255,0.35)]">
                  Add to cart
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}