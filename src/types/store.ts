export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: "Electronics" | "Audio" | "Peripherals" | "Wearables" | "Accessories";
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  stockCount: number;
  imageUrl: string;
  tags: string[];
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  addedAt: string;
}

export interface Review {
  id: string;
  productId: string;
  author: string;
  rating: number;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
  createdAt: string;
}
