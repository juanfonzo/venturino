"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils/cn";

const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/analisis-1", label: "Análisis 1" },
  { href: "/analisis-2", label: "Análisis 2" },
  { href: "/explorador", label: "Explorador" },
  { href: "/acara", label: "ACARA" },
  { href: "/postventa", label: "Postventa" },
];

export function SiteHeader({ showSuperadmin = false }: { showSuperadmin?: boolean }) {
  const pathname = usePathname();
  const router = useRouter();
  const items = showSuperadmin
    ? [...navItems, { href: "/superadmin", label: "Administración" }]
    : navItems;

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  };

  return (
    <header className="border-b border-jd-black/10 bg-white/70 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-jd-black/50">
            Ricardo Venturino S.A. | John Deere
          </p>
          <h1 className="text-2xl font-semibold text-jd-black">Radar de Mercado</h1>
        </div>
        <div className="flex flex-col items-end gap-2">
          <nav className="flex flex-wrap justify-end gap-2">
            {items.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
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
          <button
            type="button"
            onClick={handleLogout}
            className="min-h-9 rounded-full px-3 py-2 text-xs font-medium text-jd-black/40 transition hover:bg-jd-black/5 hover:text-jd-black/70"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </header>
  );
}
