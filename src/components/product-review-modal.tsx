"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Star, MessageSquarePlus, CheckCircle2, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { reviewSchema, ReviewFormValues } from "@/lib/schemas/review-schema";
import { submitProductReviewAction } from "@/actions/submit-review";
import { Product, Review } from "@/types/store";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface ProductReviewModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  onReviewAdded?: (newReview: Review) => void;
}

export function ProductReviewModal({
  product,
  isOpen,
  onClose,
  onReviewAdded,
}: ProductReviewModalProps) {
  const [serverErrors, setServerErrors] = React.useState<Record<string, string[]> | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      productId: product.id,
      authorName: "",
      email: "",
      rating: 5,
      title: "",
      comment: "",
      recommend: true,
    },
  });

  const selectedRating = watch("rating");

  // Keep productId synced if product changes
  React.useEffect(() => {
    setValue("productId", product.id);
  }, [product.id, setValue]);

  const onSubmit = async (data: ReviewFormValues) => {
    setServerErrors(null);
    try {
      const result = await submitProductReviewAction(data);

      if (result.success && result.data) {
        toast.success("Review Published!", {
          description: result.message,
          icon: <CheckCircle2 className="w-4 h-4 text-emerald-500" />,
        });
        if (onReviewAdded) {
          onReviewAdded(result.data);
        }
        reset();
        onClose();
      } else {
        if (result.errors) {
          setServerErrors(result.errors);
        }
        toast.error("Validation Error", {
          description: result.message,
          icon: <AlertCircle className="w-4 h-4 text-red-500" />,
        });
      }
    } catch {
      toast.error("Server Action Failed", {
        description: "Network or execution error while dispatching mutation.",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <MessageSquarePlus className="w-5 h-5" />
            <DialogTitle className="text-base font-black uppercase tracking-tight">Write a Review</DialogTitle>
          </div>
          <DialogDescription className="text-xs font-mono text-neutral-600 dark:text-neutral-400">
            For: <strong className="text-black dark:text-white underline">{product.name}</strong>
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-2">
          {/* Star Rating Selection */}
          <div className="space-y-1.5">
            <Label className="text-xs font-mono font-bold uppercase tracking-wider">Rating</Label>
            <div className="flex items-center gap-1.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setValue("rating", star, { shouldValidate: true })}
                  className="p-1 cursor-pointer transition-transform hover:scale-110"
                  aria-label={`Rate ${star} star`}
                >
                  <Star
                    className={`w-5 h-5 ${
                      star <= (selectedRating || 0)
                        ? "fill-current text-black dark:text-white"
                        : "text-neutral-300 dark:text-neutral-700"
                    }`}
                  />
                </button>
              ))}
              <span className="text-xs font-mono font-bold ml-2">
                {selectedRating}/5
              </span>
            </div>
            {errors.rating && (
              <p className="text-xs font-mono font-bold underline">{errors.rating.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Author Name */}
            <div className="space-y-1.5">
              <Label htmlFor="authorName" className="text-xs font-mono font-bold uppercase tracking-wider">
                Name
              </Label>
              <Input
                id="authorName"
                placeholder="e.g. Ada Lovelace"
                className="text-xs h-9"
                {...register("authorName")}
              />
              {errors.authorName && (
                <p className="text-xs font-mono font-bold underline">{errors.authorName.message}</p>
              )}
            </div>

            {/* Email Address */}
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-xs font-mono font-bold uppercase tracking-wider">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="ada@example.com"
                className="text-xs h-9"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-xs font-mono font-bold underline">{errors.email.message}</p>
              )}
            </div>
          </div>

          {/* Review Headline / Title */}
          <div className="space-y-1.5">
            <Label htmlFor="title" className="text-xs font-mono font-bold uppercase tracking-wider">
              Headline
            </Label>
            <Input
              id="title"
              placeholder="e.g. High build quality and ergonomics"
              className="text-xs h-9"
              {...register("title")}
            />
            {errors.title && (
              <p className="text-xs font-mono font-bold underline">{errors.title.message}</p>
            )}
          </div>

          {/* Feedback Body */}
          <div className="space-y-1.5">
            <Label htmlFor="comment" className="text-xs font-mono font-bold uppercase tracking-wider">
              Feedback
            </Label>
            <Textarea
              id="comment"
              placeholder="Write your feedback..."
              className="text-xs min-h-[80px]"
              {...register("comment")}
            />
            {errors.comment && (
              <p className="text-xs font-mono font-bold underline">{errors.comment.message}</p>
            )}
          </div>

          {/* Server error banner */}
          {serverErrors && (
            <div className="p-3 border-2 border-black dark:border-white text-xs font-mono space-y-1">
              <p className="font-bold uppercase underline">Server Errors:</p>
              <ul className="list-disc pl-4 space-y-0.5">
                {Object.entries(serverErrors).map(([field, msgs]) => (
                  <li key={field}>
                    <strong>{field}:</strong> {msgs.join(", ")}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-end gap-2 pt-3 border-t-2 border-black dark:border-white">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="sm"
              variant="default"
              disabled={isSubmitting}
              className="min-w-[120px]"
            >
              {isSubmitting ? "Submitting..." : "Post Review"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
