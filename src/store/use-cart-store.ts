"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { CartItem, Product } from "@/types/store";

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  
  // Actions
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  setIsOpen: (isOpen: boolean) => void;
  toggleCart: () => void;
  
  // Computed helpers
  getItemCount: () => number;
  getSubtotal: () => number;
  getEstimatedTax: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product: Product, quantity = 1) => {
        set((state) => {
          const existingItemIndex = state.items.findIndex(
            (item) => item.product.id === product.id
          );

          if (existingItemIndex > -1) {
            const updatedItems = [...state.items];
            const newQty = updatedItems[existingItemIndex].quantity + quantity;
            updatedItems[existingItemIndex] = {
              ...updatedItems[existingItemIndex],
              quantity: Math.min(newQty, product.stockCount),
            };
            return { items: updatedItems };
          } else {
            return {
              items: [
                ...state.items,
                {
                  id: `cart_${product.id}_${Date.now()}`,
                  product,
                  quantity: Math.min(quantity, product.stockCount),
                  addedAt: new Date().toISOString(),
                },
              ],
            };
          }
        });
      },

      removeItem: (productId: string) => {
        set((state) => ({
          items: state.items.filter((item) => item.product.id !== productId),
        }));
      },

      updateQuantity: (productId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }

        set((state) => ({
          items: state.items.map((item) => {
            if (item.product.id === productId) {
              return {
                ...item,
                quantity: Math.min(quantity, item.product.stockCount),
              };
            }
            return item;
          }),
        }));
      },

      clearCart: () => set({ items: [] }),
      
      setIsOpen: (isOpen: boolean) => set({ isOpen }),
      
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      getItemCount: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getSubtotal: () => {
        return get().items.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        );
      },

      getEstimatedTax: () => {
        return get().getSubtotal() * 0.08; // 8% sales tax
      },

      getTotalPrice: () => {
        return get().getSubtotal() + get().getEstimatedTax();
      },
    }),
    {
      name: "nexus-ecom-cart-v1",
      storage: createJSONStorage(() => localStorage),
      // Only persist items, not UI drawer toggle state
      partialize: (state) => ({ items: state.items }),
    }
  )
);

// Atomic selector hooks to avoid unnecessary re-renders across parent layouts
export const useCartItems = () => useCartStore((state) => state.items);
export const useCartIsOpen = () => useCartStore((state) => state.isOpen);
export const useCartActions = () =>
  useCartStore((state) => ({
    addItem: state.addItem,
    removeItem: state.removeItem,
    updateQuantity: state.updateQuantity,
    clearCart: state.clearCart,
    setIsOpen: state.setIsOpen,
    toggleCart: state.toggleCart,
  }));
