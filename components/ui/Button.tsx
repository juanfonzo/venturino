import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

export function Button({
  children,
  variant = "primary",
  size = "md",
  type = "button",
  disabled,
  onClick,
}: {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: () => void;
}) {
  const variants = {
    primary: "bg-jd-green text-white hover:bg-jd-dark",
    secondary: "bg-jd-yellow text-jd-black hover:bg-jd-yellow/80",
    ghost: "bg-transparent text-jd-black hover:bg-jd-black/5",
    outline: "border border-jd-black/20 bg-transparent text-jd-black hover:bg-jd-black/5",
  };
  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-5 py-3 text-base",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "rounded-full font-semibold transition disabled:cursor-not-allowed disabled:opacity-60",
        variants[variant],
        sizes[size],
      )}
    >
      {children}
    </button>
  );
}
