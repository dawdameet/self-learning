"use client";

import * as React from "react";
import Image from "next/image";
import { Star, ShoppingCart, Check, MessageSquare } from "lucide-react";
import { Product, Review } from "@/types/store";
import { useCartStore } from "@/store/use-cart-store";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { ProductReviewModal } from "@/components/product-review-modal";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const [isReviewModalOpen, setIsReviewModalOpen] = React.useState(false);
  const [justAdded, setJustAdded] = React.useState(false);
  const [localReviews, setLocalReviews] = React.useState<Review[]>([]);

  // Optimistic UI for added reviews using React 19 useOptimistic
  const [optimisticReviews, setOptimisticReview] = React.useOptimistic(
    localReviews,
    (current, newReview: Review) => [newReview, ...current]
  );

  const handleAddToCart = () => {
    if (!product.inStock) return;
    addItem(product, 1);
    setJustAdded(true);
    toast.success(`Added ${product.name} to cart`);
    setTimeout(() => setJustAdded(false), 1500);
  };

  const handleReviewAdded = (newReview: Review) => {
    React.startTransition(() => {
      setOptimisticReview(newReview);
    });
    setLocalReviews((prev) => [newReview, ...prev]);
  };

  const totalReviewsCount = product.reviewsCount + optimisticReviews.length;

  return (
    <>
      <div className="group relative border-2 border-black dark:border-white bg-white dark:bg-black shadow-[4px_4px_0px_0px_#000] dark:shadow-[4px_4px_0px_0px_#fff] flex flex-col transition-all">
        {/* Product Image Frame */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100 dark:bg-neutral-900 border-b-2 border-black dark:border-white">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
          <div className="absolute top-2.5 left-2.5 flex gap-1.5 flex-wrap">
            <Badge variant="default" className="text-[10px]">
              {product.category}
            </Badge>
            {!product.inStock && (
              <Badge variant="destructive" className="text-[10px]">
                Out of Stock
              </Badge>
            )}
          </div>
          <div className="absolute top-2.5 right-2.5">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-mono font-bold bg-white text-black dark:bg-black dark:text-white border-2 border-black dark:border-white shadow-[2px_2px_0px_0px_#000] dark:shadow-[2px_2px_0px_0px_#fff]">
              <Star className="w-3 h-3 fill-current text-black dark:text-white" />
              {product.rating}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center justify-between text-[11px] font-mono font-semibold text-neutral-600 dark:text-neutral-400 mb-1">
              <span className="flex items-center gap-1">
                <MessageSquare className="w-3 h-3" />
                {totalReviewsCount} reviews
              </span>
              {optimisticReviews.length > 0 && (
                <span className="font-bold underline">
                  +{optimisticReviews.length} new
                </span>
              )}
            </div>

            <h3 className="text-sm font-black uppercase tracking-tight text-foreground line-clamp-1">
              {product.name}
            </h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-2 mt-1">
              {product.description}
            </p>
          </div>

          {/* Pricing & Actions */}
          <div className="pt-3 border-t-2 border-black dark:border-white flex items-center justify-between gap-2">
            <div>
              <span className="text-[10px] font-mono uppercase text-neutral-500 font-bold block">Price</span>
              <span className="text-base font-black font-mono">
                {formatCurrency(product.price)}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsReviewModalOpen(true)}
                className="h-8 px-2"
                title="Review"
              >
                Review
              </Button>

              <Button
                size="sm"
                variant="default"
                disabled={!product.inStock}
                onClick={handleAddToCart}
                className="h-8 px-3"
              >
                {justAdded ? (
                  <span className="flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Added
                  </span>
                ) : (
                  <span className="flex items-center gap-1">
                    <ShoppingCart className="w-3.5 h-3.5" /> Add
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <ProductReviewModal
        product={product}
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        onReviewAdded={handleReviewAdded}
      />
    </>
  );
}

