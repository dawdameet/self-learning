import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "destructive" | "outline" | "success" | "accent";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const variantStyles = {
    default: "bg-black text-white dark:bg-white dark:text-black border-2 border-black dark:border-white shadow-[2px_2px_0px_0px_#000] dark:shadow-[2px_2px_0px_0px_#fff]",
    secondary: "bg-neutral-100 text-black dark:bg-neutral-900 dark:text-white border-2 border-black dark:border-white",
    destructive: "bg-black text-white dark:bg-white dark:text-black border-2 border-black dark:border-white line-through",
    outline: "bg-transparent text-black dark:text-white border-2 border-black dark:border-white",
    success: "bg-white text-black dark:bg-black dark:text-white border-2 border-black dark:border-white shadow-[2px_2px_0px_0px_#000]",
    accent: "bg-neutral-200 text-black dark:bg-neutral-800 dark:text-white border border-black dark:border-white font-mono font-bold",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider transition-colors select-none",
        variantStyles[variant],
        className
      )}
      {...props}
    />
  );
}

export { Badge };

