"use client";

import * as React from "react";
import { Product } from "@/types/store";
import { useFilterStore } from "@/store/use-filter-store";
import { ProductCard } from "@/components/product-card";
import { FilterPanel } from "@/components/filter-panel";
import { Skeleton } from "@/components/ui/skeleton";
import { SlidersHorizontal, PackageOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CatalogViewProps {
  initialProducts: Product[];
  serverTimestamp: string;
}

export function CatalogView({ initialProducts }: CatalogViewProps) {
  const { searchQuery, category, priceRange, inStockOnly, sortBy } = useFilterStore();
  const [isClientLoaded, setIsClientLoaded] = React.useState(false);
  const [showMobileFilters, setShowMobileFilters] = React.useState(false);

  React.useEffect(() => {
    setIsClientLoaded(true);
  }, []);

  // Filter and sort products
  const filteredProducts = React.useMemo(() => {
    return initialProducts
      .filter((p) => {
        // Search query match
        if (
          searchQuery.trim() !== "" &&
          !p.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !p.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
        ) {
          return false;
        }

        // Category match
        if (category !== "all" && p.category !== category) {
          return false;
        }

        // Price range match
        if (p.price < priceRange[0] || p.price > priceRange[1]) {
          return false;
        }

        // In-stock match
        if (inStockOnly && !p.inStock) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "price-asc") return a.price - b.price;
        if (sortBy === "price-desc") return b.price - a.price;
        if (sortBy === "rating-desc") return b.rating - a.rating;
        if (sortBy === "name-asc") return a.name.localeCompare(b.name);
        return 0; // featured
      });
  }, [initialProducts, searchQuery, category, priceRange, inStockOnly, sortBy]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Sidebar for Desktop Filters */}
      <div className="hidden lg:block lg:col-span-1 space-y-4">
        <FilterPanel />
      </div>

      {/* Main Catalog Column */}
      <div className="lg:col-span-3 space-y-6">
        {/* Mobile Filter Toggle Header */}
        <div className="flex items-center justify-between lg:hidden pb-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="flex items-center gap-2 text-xs"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            {showMobileFilters ? "Hide Filters" : "Filters"}
          </Button>
          <span className="text-xs font-mono font-bold">
            {filteredProducts.length} items
          </span>
        </div>

        {/* Collapsible Mobile Filters */}
        {showMobileFilters && (
          <div className="lg:hidden mb-4">
            <FilterPanel />
          </div>
        )}

        {/* Catalog Header Meta */}
        <div className="flex items-center justify-between text-xs font-mono px-1">
          <div>
            Showing <strong className="font-bold underline">{filteredProducts.length}</strong> of{" "}
            <span>{initialProducts.length}</span> items
          </div>
        </div>

        {/* Products Grid or Loading Skeleton */}
        {!isClientLoaded ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="border-2 border-black dark:border-white p-4 space-y-3 bg-white dark:bg-black shadow-[4px_4px_0px_0px_#000] dark:shadow-[4px_4px_0px_0px_#fff]">
                <Skeleton className="aspect-[4/3] w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
                <div className="flex justify-between items-center pt-2">
                  <Skeleton className="h-5 w-16" />
                  <Skeleton className="h-8 w-20" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="border-2 border-black dark:border-white bg-white dark:bg-black p-12 text-center flex flex-col items-center justify-center space-y-3 shadow-[4px_4px_0px_0px_#000] dark:shadow-[4px_4px_0px_0px_#fff]">
            <div className="w-12 h-12 border-2 border-black dark:border-white flex items-center justify-center">
              <PackageOpen className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-black uppercase">No matching products found</h3>
            <p className="text-xs font-mono text-neutral-500 max-w-sm">
              Adjust your category, price range, or search terms.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
