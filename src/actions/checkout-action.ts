"use server";

import { z } from "zod";

export const checkoutSchema = z.object({
  fullName: z.string().min(3, "Full name must be at least 3 characters"),
  email: z.string().email("Valid email address is required"),
  address: z.string().min(5, "Shipping address is required"),
  city: z.string().min(2, "City is required"),
  postalCode: z.string().min(4, "Postal code must be valid"),
  paymentMethod: z.enum(["credit_card", "apple_pay", "crypto"]),
  itemCount: z.number().min(1, "Cart cannot be empty"),
  totalAmount: z.number().positive("Total amount must be greater than zero"),
});

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export async function processCheckoutAction(formData: CheckoutFormValues) {
  // Simulate payment processing latency
  await new Promise((resolve) => setTimeout(resolve, 800));

  const validation = checkoutSchema.safeParse(formData);
  if (!validation.success) {
    return {
      success: false,
      message: "Checkout payload rejected by server validation.",
      errors: validation.error.flatten().fieldErrors,
    };
  }

  const orderId = `NEX-${Math.floor(100000 + Math.random() * 900000)}`;

  return {
    success: true,
    message: `Order #${orderId} confirmed successfully!`,
    orderId,
    timestamp: new Date().toISOString(),
  };
}
