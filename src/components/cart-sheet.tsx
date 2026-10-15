"use client";

import * as React from "react";
import Image from "next/image";
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, CheckCircle2 } from "lucide-react";
import { useCartStore } from "@/store/use-cart-store";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { toast } from "sonner";
import { processCheckoutAction } from "@/actions/checkout-action";

export function CartSheet() {
  const isOpen = useCartStore((state) => state.isOpen);
  const setIsOpen = useCartStore((state) => state.setIsOpen);
  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);

  const [isCheckingOut, setIsCheckingOut] = React.useState(false);
  const [lastOrderSuccess, setLastOrderSuccess] = React.useState<string | null>(null);

  const subtotal = items.reduce((acc, i) => acc + i.product.price * i.quantity, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const handleCheckout = async () => {
    if (items.length === 0) return;
    setIsCheckingOut(true);
    
    try {
      const response = await processCheckoutAction({
        fullName: "Alex Rivera",
        email: "alex.rivera@example.com",
        address: "450 Innovation Parkway",
        city: "San Francisco",
        postalCode: "94105",
        paymentMethod: "credit_card",
        itemCount: items.reduce((acc, i) => acc + i.quantity, 0),
        totalAmount: Number(total.toFixed(2)),
      });

      if (response.success) {
        toast.success(response.message, {
          description: `Total charged: ${formatCurrency(total)}.`,
        });
        setLastOrderSuccess(response.orderId || "COMPLETED");
        clearCart();
      } else {
        toast.error("Checkout failed", {
          description: response.message,
        });
      }
    } catch {
      toast.error("An unexpected error occurred during checkout.");
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent side="right" className="flex flex-col w-full sm:max-w-md h-full">
        <SheetHeader className="pb-4 border-b-2 border-black dark:border-white">
          <div className="flex items-center justify-between">
            <SheetTitle className="flex items-center gap-2 text-base font-black uppercase tracking-tight">
              <ShoppingBag className="w-5 h-5" />
              Cart
              {items.length > 0 && (
                <span className="text-xs font-mono px-2 py-0.5 bg-black text-white dark:bg-white dark:text-black border border-black dark:border-white font-bold">
                  {items.reduce((acc, i) => acc + i.quantity, 0)} items
                </span>
              )}
            </SheetTitle>
            {items.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={clearCart}
                className="h-6 px-2 text-[10px]"
              >
                Clear
              </Button>
            )}
          </div>
        </SheetHeader>

        {lastOrderSuccess && items.length === 0 ? (
          <div className="flex flex-col items-center justify-center flex-1 text-center p-6 space-y-4">
            <div className="w-14 h-14 border-2 border-black dark:border-white flex items-center justify-center shadow-[3px_3px_0px_0px_#000] dark:shadow-[3px_3px_0px_0px_#fff]">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="text-base font-black uppercase">Order Confirmed</h3>
            <p className="text-xs font-mono text-neutral-600 dark:text-neutral-400 max-w-xs">
              Order #{lastOrderSuccess} processed via Server Action.
            </p>
            <Button
              variant="default"
              size="sm"
              onClick={() => setLastOrderSuccess(null)}
              className="mt-2"
            >
              Continue Shopping
            </Button>
          </div>
        ) : items.length === 0 ? (
          <div className="flex flex-col items-center justify-center flex-1 text-center p-6 space-y-2">
            <ShoppingBag className="w-10 h-10 opacity-30 mb-2" />
            <p className="text-sm font-black uppercase">Your cart is empty</p>
            <p className="text-xs font-mono text-neutral-500">Add hardware from the catalog.</p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto py-4 space-y-3 pr-1">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 p-3 border-2 border-black dark:border-white bg-white dark:bg-black shadow-[2px_2px_0px_0px_#000] dark:shadow-[2px_2px_0px_0px_#fff]"
                >
                  <div className="relative w-16 h-16 border border-black dark:border-white overflow-hidden bg-neutral-100 dark:bg-neutral-900 flex-shrink-0">
                    <Image
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <h4 className="text-xs font-black uppercase truncate leading-tight">
                        {item.product.name}
                      </h4>
                      <p className="text-xs font-mono font-bold mt-1">
                        {formatCurrency(item.product.price)}
                      </p>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border-2 border-black dark:border-white bg-white dark:bg-black">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1 hover:bg-neutral-100 dark:hover:bg-neutral-900 cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-mono font-bold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1 hover:bg-neutral-100 dark:hover:bg-neutral-900 cursor-pointer disabled:opacity-30"
                          disabled={item.quantity >= item.product.stockCount}
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="text-neutral-500 hover:text-black dark:hover:text-white p-1 cursor-pointer"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t-2 border-black dark:border-white space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-neutral-500">Subtotal</span>
                <span className="font-bold">{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between text-xs font-mono">
                <span className="text-neutral-500">Tax (8%)</span>
                <span className="font-bold">{formatCurrency(tax)}</span>
              </div>
              <div className="flex justify-between text-sm font-black uppercase pt-1 border-t border-black dark:border-white">
                <span>Total</span>
                <span className="font-mono text-base font-black">
                  {formatCurrency(total)}
                </span>
              </div>
              <Button
                onClick={handleCheckout}
                disabled={isCheckingOut || items.length === 0}
                className="w-full mt-3 h-11 text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2"
                variant="default"
              >
                {isCheckingOut ? (
                  <span>Processing...</span>
                ) : (
                  <>
                    <span>Checkout ({formatCurrency(total)})</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

