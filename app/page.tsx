import { prisma } from "../lib/db";

export const dynamic = "force-dynamic";

export default async function Home() {
  const products = await prisma.product.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <div>
      <section className="blueprint-grid mb-12 border-2 border-strom-orange px-8 py-14">
        <p className="font-heading text-sm uppercase tracking-widest text-strom-white">
          Tools · Gear · Materials
        </p>
        <h2 className="mt-3 font-heading text-5xl uppercase leading-none text-strom-orange sm:text-7xl">
          Built tough.
          <br />
          Shipped fast.
        </h2>
        <p className="mt-5 max-w-xl text-neutral-400">
          Job-site essentials, either in stock and shipped by Strom or sent
          straight from our suppliers.
        </p>
        <a
          href="#catalog"
          className="mt-8 inline-block bg-strom-orange px-8 py-3 font-heading text-lg uppercase tracking-wide text-strom-black transition hover:bg-strom-white"
        >
          Shop the gear
        </a>
      </section>

      <div id="catalog" className="mb-6 flex items-center gap-3">
        <span className="h-8 w-2 bg-strom-orange" />
        <h3 className="font-heading text-3xl uppercase tracking-wide text-strom-orange">
          Featured gear
        </h3>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <div
            key={p.id}
            className="border-2 border-strom-orange bg-strom-black transition hover:-translate-y-1 hover:shadow-[0_0_0_4px_#ff6a00]"
          >
            <div className="blueprint-grid border-b-2 border-strom-orange">
              {p.imageUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={p.imageUrl}
                  alt={p.name}
                  className="aspect-[4/3] w-full object-cover"
                />
              )}
            </div>
            <div className="p-5">
              <span className="inline-block bg-strom-orange px-2 py-1 text-xs font-bold uppercase text-strom-black">
                {p.fulfillmentType === "DROPSHIP"
                  ? "Ships from supplier"
                  : "In stock · ships from Strom"}
              </span>
              <h2 className="mt-3 font-heading text-2xl uppercase text-strom-white">
                {p.name}
              </h2>
              <p className="text-xs font-bold uppercase tracking-wide text-strom-orange">
                {p.category}
              </p>
              <p className="mt-2 text-sm text-neutral-400">{p.description}</p>
              <p className="mt-4 font-heading text-4xl text-strom-orange">
                ${(p.priceCents / 100).toFixed(2)}
              </p>
              <button className="mt-4 w-full bg-strom-orange py-3 font-heading text-lg uppercase tracking-wide text-strom-black transition hover:bg-strom-white">
                Add to cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}