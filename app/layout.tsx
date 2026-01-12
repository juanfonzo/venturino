import "./globals.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Venturino Tractores - PoC",
  description: "Analisis de mercado de tractores en Argentina.",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <div className="min-h-screen">
          <SiteHeader />
          <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 pb-12 pt-8 sm:px-6 lg:px-8">
            {children}
          </main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
