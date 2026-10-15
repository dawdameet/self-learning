import * as React from "react";
import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full border-2 border-black dark:border-white bg-white dark:bg-black px-3 py-1.5 text-xs font-mono shadow-[2px_2px_0px_0px_#000] dark:shadow-[2px_2px_0px_0px_#fff] placeholder:text-neutral-500 focus-visible:outline-none focus-visible:shadow-[3px_3px_0px_0px_#000] dark:focus-visible:shadow-[3px_3px_0px_0px_#fff] disabled:cursor-not-allowed disabled:opacity-50 transition-all",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };

