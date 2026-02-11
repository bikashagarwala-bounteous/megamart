import { create } from 'zustand';
import type { WishlistItem } from '../types';
import {
  getWishlistItems,
  addWishlistItem,
  removeWishlistItem,
  getWishlistItemByProductId,
} from '../db/indexedDB';

interface WishlistStore {
  items: WishlistItem[];
  isInitialized: boolean;

  // Actions
  initializeWishlist: () => Promise<void>;
  addItem: (item: Omit<WishlistItem, 'id' | 'addedAt'>) => void;
  removeItem: (itemId: string) => void;
  toggleWishlist: (productData: Omit<WishlistItem, 'id' | 'addedAt'>) => Promise<void>;
  isInWishlist: (productId: number) => boolean;

  // Getters
  getItemCount: () => number;
}

export const useWishlistStore = create<WishlistStore>((set, get) => ({
  items: [],
  isInitialized: false,

  initializeWishlist: async () => {
    try {
      const items = await getWishlistItems();
      set({ items, isInitialized: true });
    } catch (error) {
      console.error('Failed to initialize wishlist:', error);
      set({ isInitialized: true });
    }
  },

  addItem: (itemData) => {
    const newItem: WishlistItem = {
      ...itemData,
      id: `wishlist-${itemData.productId}-${Date.now()}`,
      addedAt: Date.now(),
    };

    set((state) => {
      const exists = state.items.some(
        (item) => item.productId === itemData.productId
      );
      if (exists) return state;

      addWishlistItem(newItem).catch(console.error);
      return { items: [...state.items, newItem] };
    });
  },

  removeItem: (itemId) => {
    set((state) => {
      removeWishlistItem(itemId).catch(console.error);
      return { items: state.items.filter((i) => i.id !== itemId) };
    });
  },

  toggleWishlist: async (itemData) => {
    const existing = await getWishlistItemByProductId(itemData.productId);

    if (existing) {
      get().removeItem(existing.id);
    } else {
      get().addItem(itemData);
    }
  },

  isInWishlist: (productId) => {
    return get().items.some((item) => item.productId === productId);
  },

  getItemCount: () => {
    return get().items.length;
  },
}));
