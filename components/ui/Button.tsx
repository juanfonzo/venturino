import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

export function Button({
  children,
  variant = "primary",
  size = "md",
  type = "button",
  className,
  ...props
}: {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  const variants = {
    primary: "bg-jd-green text-white hover:bg-jd-dark",
    secondary: "bg-jd-yellow text-jd-black hover:bg-jd-yellow/80",
    ghost: "bg-transparent text-jd-black hover:bg-jd-black/5",
    outline: "border border-jd-black/20 bg-transparent text-jd-black hover:bg-jd-black/5",
  };
  const sizes = {
    sm: "min-h-9 px-3 py-2 text-xs",
    md: "min-h-10 px-4 py-2 text-sm",
    lg: "min-h-11 px-5 py-3 text-base",
  };

  return (
    <button
      type={type}
      className={cn(
        "rounded-full font-semibold transition disabled:cursor-not-allowed disabled:opacity-60",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
