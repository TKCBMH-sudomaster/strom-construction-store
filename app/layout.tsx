import type { Metadata } from "next";
import Link from "next/link";
import { Chakra_Petch, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const chakra = Chakra_Petch({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-chakra",
});
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  title: "Strom Construction | Tools, Gear & Materials",
  description: "Hybrid dropship and in-stock construction supply store.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${chakra.variable} ${inter.variable} ${jetbrains.variable}`}
    >
      <body className="bg-strom-black font-sans antialiased">
        <header className="sticky top-0 z-50 border-b border-strom-orange/40 bg-black/80 shadow-[0_1px_30px_rgba(255,106,0,0.25)] backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
            <Link href="/" className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center bg-strom-orange font-heading text-xl font-bold text-black shadow-[0_0_20px_rgba(255,106,0,0.6)]">
                S
              </span>
              <span className="leading-none">
                <span className="block font-heading text-2xl font-bold uppercase tracking-widest text-strom-orange">
                  Strom
                </span>
                <span className="block font-mono text-[10px] uppercase tracking-[0.35em] text-strom-white">
                  Construction
                </span>
              </span>
            </Link>

            <nav className="hidden items-center gap-8 font-mono text-xs uppercase tracking-widest text-strom-orange sm:flex">
              <Link href="/#catalog" className="hover:text-strom-white">
                Catalog
              </Link>
              <Link href="/#catalog" className="hover:text-strom-white">
                Tools
              </Link>
              <Link href="/#catalog" className="hover:text-strom-white">
                Safety
              </Link>
              <span className="flex items-center gap-2 text-strom-white">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-strom-orange" />
                Online
              </span>
            </nav>

            <span className="border border-strom-orange/60 px-3 py-1.5 font-mono text-xs uppercase tracking-widest text-strom-orange">
              Cart [0]
            </span>
          </div>
        </header>

        <main className="mx-auto max-w-6xl px-6 py-10">{children}</main>

        <div className="hazard-stripe" />
        <footer className="border-t border-strom-orange/40 bg-black">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-6 py-6 font-mono text-xs uppercase tracking-widest">
            <span className="text-strom-orange">
              Strom Construction · Engineered for the job site
            </span>
            <span className="text-neutral-500">
              Hybrid fulfillment: in-stock + dropship
            </span>
          </div>
        </footer>
      </body>
    </html>
  );
}