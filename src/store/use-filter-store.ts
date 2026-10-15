"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type SortOption = "featured" | "price-asc" | "price-desc" | "rating-desc" | "name-asc";

interface FilterState {
  searchQuery: string;
  category: string;
  priceRange: [number, number]; // [min, max]
  inStockOnly: boolean;
  sortBy: SortOption;
  isFilterDrawerOpen: boolean;

  // Actions
  setSearchQuery: (query: string) => void;
  setCategory: (category: string) => void;
  setPriceRange: (range: [number, number]) => void;
  setInStockOnly: (inStock: boolean) => void;
  setSortBy: (sort: SortOption) => void;
  setIsFilterDrawerOpen: (isOpen: boolean) => void;
  resetFilters: () => void;
}

export const INITIAL_PRICE_RANGE: [number, number] = [0, 1500];

export const useFilterStore = create<FilterState>()(
  persist(
    (set) => ({
      searchQuery: "",
      category: "all",
      priceRange: INITIAL_PRICE_RANGE,
      inStockOnly: false,
      sortBy: "featured",
      isFilterDrawerOpen: false,

      setSearchQuery: (searchQuery) => set({ searchQuery }),
      setCategory: (category) => set({ category }),
      setPriceRange: (priceRange) => set({ priceRange }),
      setInStockOnly: (inStockOnly) => set({ inStockOnly }),
      setSortBy: (sortBy) => set({ sortBy }),
      setIsFilterDrawerOpen: (isFilterDrawerOpen) => set({ isFilterDrawerOpen }),
      resetFilters: () =>
        set({
          searchQuery: "",
          category: "all",
          priceRange: INITIAL_PRICE_RANGE,
          inStockOnly: false,
          sortBy: "featured",
        }),
    }),
    {
      name: "nexus-ecom-filters-v1",
      storage: createJSONStorage(() => localStorage),
      // Only persist filter options, not drawer open state
      partialize: (state) => ({
        searchQuery: state.searchQuery,
        category: state.category,
        priceRange: state.priceRange,
        inStockOnly: state.inStockOnly,
        sortBy: state.sortBy,
      }),
    }
  )
);
