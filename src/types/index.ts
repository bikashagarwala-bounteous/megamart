export interface FakeStoreRating {
  rate: number;
  count: number;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating?: FakeStoreRating;
}

export interface Category {
  id: number;
  name: string;
  icon?: string;
}

export interface Brand {
  id: number;
  name: string;
  image?: string;
  discount?: number;
}

export interface CartItem {
  id: string; // unique identifier for cart item (productId-timestamp)
  productId: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
  addedAt: number; // timestamp
}

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

export interface Order {
  id: string; // unique order ID
  userId?: string;
  items: CartItem[];
  totalAmount: number;
  shippingAddress: ShippingAddress;
  paymentMethod: 'COD' | 'CARD' | 'UPI';
  status: 'CONFIRMED' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  createdAt: number; // timestamp
  updatedAt: number; // timestamp
}

export interface User {
  id: string;
  email: string;
  name: string;
  loginTime: number; // timestamp
}

export interface WishlistItem {
  id: string; // unique identifier
  productId: number;
  title: string;
  price: number;
  image: string;
  addedAt: number; // timestamp
}
