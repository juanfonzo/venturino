import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

export function Input({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "w-full rounded-xl border border-jd-black/15 bg-white/80 px-3 py-2 text-sm outline-none transition focus:border-jd-green",
        className,
      )}
      {...props}
    />
  );
}
