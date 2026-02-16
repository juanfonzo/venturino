import type { ReactNode } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export default function PagesLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 pb-12 pt-8 sm:px-6 lg:px-8">
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
