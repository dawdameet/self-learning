"use server";

import { reviewSchema, ReviewFormValues } from "@/lib/schemas/review-schema";
import { Review } from "@/types/store";

export interface ActionResult<T> {
  success: boolean;
  message: string;
  data?: T;
  errors?: Record<string, string[]>;
}

export async function submitProductReviewAction(
  rawInput: ReviewFormValues
): Promise<ActionResult<Review>> {
  // Simulate network latency for demonstration of loading states
  await new Promise((resolve) => setTimeout(resolve, 600));

  // Server-side validation using the same shared Zod schema
  const parseResult = reviewSchema.safeParse(rawInput);

  if (!parseResult.success) {
    const errorMap = parseResult.error.flatten().fieldErrors;
    return {
      success: false,
      message: "Server validation failed. Please check the supplied inputs.",
      errors: errorMap as Record<string, string[]>,
    };
  }

  const { productId, authorName, rating, title, comment } = parseResult.data;

  // Emulate backend database persistence
  const createdReview: Review = {
    id: `rev_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    productId,
    author: authorName.trim(),
    rating,
    title: title.trim(),
    comment: comment.trim(),
    verifiedPurchase: true,
    createdAt: new Date().toISOString(),
  };

  return {
    success: true,
    message: "Thank you! Your verified product review has been submitted.",
    data: createdReview,
  };
}
