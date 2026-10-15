import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "neo";
  size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    const variantStyles = {
      default:
        "bg-black text-white dark:bg-white dark:text-black border-2 border-black dark:border-white shadow-[3px_3px_0px_0px_#000] dark:shadow-[3px_3px_0px_0px_#fff] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_0px_#000] dark:hover:shadow-[4px_4px_0px_0px_#fff] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_0px_#000] dark:active:shadow-[1px_1px_0px_0px_#fff]",
      destructive:
        "bg-black text-white dark:bg-white dark:text-black border-2 border-black dark:border-white shadow-[3px_3px_0px_0px_#000] dark:shadow-[3px_3px_0px_0px_#fff] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_0px_#000]",
      outline:
        "bg-white text-black dark:bg-black dark:text-white border-2 border-black dark:border-white shadow-[3px_3px_0px_0px_#000] dark:shadow-[3px_3px_0px_0px_#fff] hover:bg-neutral-100 dark:hover:bg-neutral-900 active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_0px_#000]",
      secondary:
        "bg-neutral-200 text-black dark:bg-neutral-800 dark:text-white border-2 border-black dark:border-white shadow-[2px_2px_0px_0px_#000] dark:shadow-[2px_2px_0px_0px_#fff] hover:bg-neutral-300 dark:hover:bg-neutral-700",
      ghost:
        "border-2 border-transparent hover:border-black dark:hover:border-white hover:bg-neutral-100 dark:hover:bg-neutral-900 text-black dark:text-white",
      link:
        "text-black dark:text-white underline font-bold",
      neo:
        "bg-white text-black dark:bg-black dark:text-white border-2 border-black dark:border-white shadow-[3px_3px_0px_0px_#000] dark:shadow-[3px_3px_0px_0px_#fff] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_0px_#000] active:translate-x-[2px] active:translate-y-[2px]",
    };

    const sizeStyles = {
      default: "h-9 px-4 py-1.5 text-xs font-bold uppercase tracking-wider",
      sm: "h-7 px-2.5 text-[11px] font-bold uppercase tracking-wider",
      lg: "h-11 px-6 text-sm font-black uppercase tracking-wider",
      icon: "h-9 w-9 p-0 flex items-center justify-center",
    };

    return (
      <Comp
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap font-bold transition-all duration-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black dark:focus-visible:ring-white disabled:pointer-events-none disabled:opacity-50 cursor-pointer select-none",
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };

