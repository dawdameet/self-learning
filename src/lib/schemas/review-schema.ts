import { z } from "zod";

export const reviewSchema = z.object({
  productId: z.string().min(1, "Product ID is required"),
  authorName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name cannot exceed 50 characters"),
  email: z
    .string()
    .email("Please provide a valid email address for purchase verification"),
  rating: z
    .number()
    .int("Rating must be an integer")
    .min(1, "Please select at least 1 star")
    .max(5, "Rating cannot exceed 5 stars"),
  title: z
    .string()
    .min(3, "Review title must be at least 3 characters")
    .max(80, "Review title cannot exceed 80 characters"),
  comment: z
    .string()
    .min(10, "Please provide feedback with at least 10 characters")
    .max(600, "Review comment cannot exceed 600 characters"),
  recommend: z.boolean(),
});

export type ReviewFormValues = z.infer<typeof reviewSchema>;
