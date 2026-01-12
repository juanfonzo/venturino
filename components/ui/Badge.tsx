import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

export function Badge({
  children,
  variant = "default",
}: {
  children: ReactNode;
  variant?: "default" | "green" | "yellow" | "red" | "muted";
}) {
  const variants = {
    default: "bg-jd-cream/80 text-jd-black",
    green: "bg-jd-green text-white",
    yellow: "bg-jd-yellow text-jd-black",
    red: "bg-red-500 text-white",
    muted: "bg-jd-black/10 text-jd-black/70",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold",
        variants[variant],
      )}
    >
      {children}
    </span>
  );
}
