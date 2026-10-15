"use client";

import * as React from "react";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/use-cart-store";

export function Navbar() {
  const toggleCart = useCartStore((state) => state.toggleCart);
  const items = useCartStore((state) => state.items);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const totalQuantity = mounted
    ? items.reduce((acc, item) => acc + item.quantity, 0)
    : 0;

  return (
    <header className="sticky top-0 z-40 w-full border-b-2 border-black dark:border-white bg-white dark:bg-black transition-colors">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 bg-black dark:bg-white text-white dark:text-black font-black flex items-center justify-center text-sm border-2 border-black dark:border-white shadow-[2px_2px_0px_0px_#000] dark:shadow-[2px_2px_0px_0px_#fff]">
            N
          </div>
          <span className="font-black text-lg sm:text-xl tracking-tighter uppercase text-black dark:text-white">
            NEXUS
          </span>
        </Link>

        {/* Right Tools */}
        <div className="flex items-center gap-3">
          {/* Theme Selector */}
          <ThemeToggle />

          {/* Cart Trigger */}
          <Button
            variant="default"
            onClick={toggleCart}
            className="h-9 px-3 gap-2"
            aria-label="Open Cart Drawer"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="text-xs font-black uppercase tracking-wider">Cart</span>
            {totalQuantity > 0 && (
              <span className="ml-0.5 px-1.5 py-0.2 bg-white text-black dark:bg-black dark:text-white text-[11px] font-mono font-black border border-black dark:border-white">
                {totalQuantity}
              </span>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}

