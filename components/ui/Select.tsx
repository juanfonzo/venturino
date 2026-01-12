import type { SelectHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

export function Select({
  className,
  children,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={cn(
        "w-full rounded-xl border border-jd-black/15 bg-white/80 px-3 py-2 text-sm outline-none transition focus:border-jd-green",
        className,
      )}
      {...props}
    >
      {children}
    </select>
  );
}
