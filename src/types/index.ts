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
