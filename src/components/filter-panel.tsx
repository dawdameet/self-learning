"use client";

import * as React from "react";
import { Search, RotateCcw, Filter } from "lucide-react";
import { useFilterStore, INITIAL_PRICE_RANGE, SortOption } from "@/store/use-filter-store";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { formatCurrency } from "@/lib/utils";

const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "Audio", label: "Audio" },
  { id: "Peripherals", label: "Peripherals" },
  { id: "Electronics", label: "Electronics" },
  { id: "Wearables", label: "Wearables" },
  { id: "Accessories", label: "Accessories" },
];

const SORT_OPTIONS: { id: SortOption; label: string }[] = [
  { id: "featured", label: "Featured" },
  { id: "price-asc", label: "Price: Low to High" },
  { id: "price-desc", label: "Price: High to Low" },
  { id: "rating-desc", label: "Highest Rated" },
  { id: "name-asc", label: "Name: A to Z" },
];

export function FilterPanel() {
  const {
    searchQuery,
    category,
    priceRange,
    inStockOnly,
    sortBy,
    setSearchQuery,
    setCategory,
    setPriceRange,
    setInStockOnly,
    setSortBy,
    resetFilters,
  } = useFilterStore();

  const isFiltered =
    searchQuery !== "" ||
    category !== "all" ||
    priceRange[0] !== INITIAL_PRICE_RANGE[0] ||
    priceRange[1] !== INITIAL_PRICE_RANGE[1] ||
    inStockOnly ||
    sortBy !== "featured";

  return (
    <div className="border-2 border-black dark:border-white bg-white dark:bg-black p-5 shadow-[4px_4px_0px_0px_#000] dark:shadow-[4px_4px_0px_0px_#fff] space-y-5">
      <div className="flex items-center justify-between pb-3 border-b-2 border-black dark:border-white">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4" />
          <h3 className="text-xs font-black tracking-wider uppercase">
            Filters
          </h3>
        </div>
        {isFiltered && (
          <Button
            variant="outline"
            size="sm"
            onClick={resetFilters}
            className="h-6 px-2 text-[10px]"
          >
            <RotateCcw className="w-3 h-3 mr-1" />
            Reset
          </Button>
        )}
      </div>

      {/* Search Input */}
      <div className="space-y-1.5">
        <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
          Search
        </label>
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search items..."
            className="pl-8 h-8 text-xs"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="space-y-2">
        <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
          Category
        </label>
        <div className="flex flex-wrap gap-1.5">
          {CATEGORIES.map((cat) => {
            const isSelected = category === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id)}
                className={`text-xs px-2.5 py-1 font-bold uppercase tracking-wider transition-all cursor-pointer border-2 border-black dark:border-white ${
                  isSelected
                    ? "bg-black text-white dark:bg-white dark:text-black shadow-[2px_2px_0px_0px_#000] dark:shadow-[2px_2px_0px_0px_#fff]"
                    : "bg-white text-black dark:bg-black dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Slider */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-xs">
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
            Price Cap
          </span>
          <span className="font-mono text-xs font-bold">
            {formatCurrency(priceRange[1])}
          </span>
        </div>
        <Slider
          min={0}
          max={1500}
          step={25}
          value={priceRange}
          onValueChange={(val) => setPriceRange(val as [number, number])}
          className="py-1"
        />
      </div>

      {/* In-Stock Toggle */}
      <div className="pt-1">
        <label className="flex items-center gap-2.5 cursor-pointer select-none text-xs font-bold uppercase tracking-wider">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => setInStockOnly(e.target.checked)}
            className="w-4 h-4 border-2 border-black dark:border-white accent-black dark:accent-white cursor-pointer"
          />
          <span>In Stock Only</span>
        </label>
      </div>

      {/* Sort Option */}
      <div className="space-y-1.5 pt-2 border-t-2 border-black dark:border-white">
        <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
          Sort
        </label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortOption)}
          className="w-full text-xs font-mono font-bold h-8 border-2 border-black dark:border-white bg-white dark:bg-black px-2 text-foreground shadow-[2px_2px_0px_0px_#000] dark:shadow-[2px_2px_0px_0px_#fff] focus:outline-none cursor-pointer"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.id} value={opt.id}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

