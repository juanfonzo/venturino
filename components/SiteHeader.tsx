"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/cn";

const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/explorador", label: "Explorador" },
  { href: "/comparables", label: "Comparables" },
  { href: "/acara", label: "ACARA" },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="border-b border-jd-black/10 bg-white/70 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-jd-black/50">
            Ricardo Venturino S.A. | John Deere
          </p>
          <h1 className="text-2xl font-semibold text-jd-black">Radar de Mercado - Tractores</h1>
          <p className="mt-1 text-sm text-jd-black/60">
            Comparables, oportunidades y referencias de precios para decidir compras y ventas.
          </p>
        </div>
        <nav className="flex flex-wrap gap-2">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-semibold transition",
                  active
                    ? "bg-jd-green text-white shadow-soft"
                    : "bg-jd-cream/70 text-jd-black hover:bg-jd-yellow/60",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
