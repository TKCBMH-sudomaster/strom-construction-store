import type { Metadata } from "next";
import Link from "next/link";
import { Oswald, Inter } from "next/font/google";
import "./globals.css";

const oswald = Oswald({ subsets: ["latin"], variable: "--font-oswald" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

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
    <html lang="en" className={`${oswald.variable} ${inter.variable}`}>
      <body className="bg-strom-black font-sans">
        <header className="bg-strom-orange text-strom-black">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center bg-strom-black font-heading text-2xl text-strom-orange">
                S
              </span>
              <h1 className="font-heading text-3xl uppercase tracking-wide">
                Strom Construction
              </h1>
            </div>
            <nav className="hidden gap-6 font-heading text-lg uppercase tracking-wide sm:flex">
              <Link href="/">Shop</Link>
              <Link href="/">Tools</Link>
              <Link href="/">Safety</Link>
              <Link href="/">Contact</Link>
            </nav>
          </div>
        </header>
        <div className="hazard-stripe" />

        <main className="mx-auto max-w-6xl px-6 py-10">{children}</main>

        <div className="hazard-stripe" />
        <footer className="bg-strom-orange text-strom-black">
          <div className="mx-auto max-w-6xl px-6 py-6 font-heading uppercase tracking-wide">
            Strom Construction · Built tough. Shipped fast.
          </div>
        </footer>
      </body>
    </html>
  );
}