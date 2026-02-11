import { create } from 'zustand';
import type { CartItem } from '../types';
import {
  getCartItems,
  addCartItem,
  updateCartItem,
  removeCartItem,
  clearCart as clearCartDB,
} from '../db/indexedDB';

interface CartStore {
  items: CartItem[];
  isInitialized: boolean;
  
  // Actions
  initializeCart: () => Promise<void>;
  addItem: (item: Omit<CartItem, 'id' | 'addedAt'>) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  removeItem: (itemId: string) => void;
  clearCart: () => void;
  
  // Getters
  getTotalPrice: () => number;
  getTotalItems: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  isInitialized: false,

  initializeCart: async () => {
    try {
      const items = await getCartItems();
      set({ items, isInitialized: true });
    } catch (error) {
      console.error('Failed to initialize cart:', error);
      set({ isInitialized: true });
    }
  },

  addItem: (itemData) => {
    const newItem: CartItem = {
      ...itemData,
      id: `${itemData.productId}-${Date.now()}`,
      addedAt: Date.now(),
    };

    set((state) => {
      const existingItem = state.items.find(
        (item) => item.productId === itemData.productId
      );

      if (existingItem) {
        // If item exists, increase quantity
        const updatedItem: CartItem = {
          ...existingItem,
          quantity: existingItem.quantity + itemData.quantity,
        };
        updateCartItem(updatedItem).catch(console.error);
        return {
          items: state.items.map((item) =>
            item.productId === itemData.productId ? updatedItem : item
          ),
        };
      } else {
        // Add new item
        addCartItem(newItem).catch(console.error);
        return { items: [...state.items, newItem] };
      }
    });
  },

  updateQuantity: (itemId, quantity) => {
    set((state) => {
      const item = state.items.find((i) => i.id === itemId);
      if (!item) return state;

      if (quantity <= 0) {
        removeCartItem(itemId).catch(console.error);
        return { items: state.items.filter((i) => i.id !== itemId) };
      }

      const updatedItem: CartItem = { ...item, quantity };
      updateCartItem(updatedItem).catch(console.error);

      return {
        items: state.items.map((i) => (i.id === itemId ? updatedItem : i)),
      };
    });
  },

  removeItem: (itemId) => {
    set((state) => {
      removeCartItem(itemId).catch(console.error);
      return { items: state.items.filter((i) => i.id !== itemId) };
    });
  },

  clearCart: () => {
    set({ items: [] });
    clearCartDB().catch(console.error);
  },

  getTotalPrice: () => {
    return get().items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  },

  getTotalItems: () => {
    return get().items.length;
  },

  getItemCount: () => {
    return get().items.reduce((sum, item) => sum + item.quantity, 0);
  },
}));
