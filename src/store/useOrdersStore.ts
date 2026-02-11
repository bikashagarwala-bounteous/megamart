import { create } from 'zustand';
import type { Order } from '../types';
import { getOrders, addOrder as addOrderDB } from '../db/indexedDB';

interface OrdersStore {
    orders: Order[];
    isInitialized: boolean;

    initializeOrders: () => Promise<void>;
    addOrder: (order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>) => string;
    getOrderById: (orderId: string) => Order | undefined;

    getOrderCount: () => number;
}

export const useOrdersStore = create<OrdersStore>((set, get) => ({
    orders: [],
    isInitialized: false,

    initializeOrders: async () => {
        try {
            const orders = await getOrders();
            set({ orders, isInitialized: true });
        } catch (error) {
            console.error('Failed to initialize orders:', error);
            set({ isInitialized: true });
        }
    },

    addOrder: (orderData) => {
        const now = Date.now();
        const orderId = `ORD-${Date.now()}-${Math.random()
            .toString(36)
            .substr(2, 9)
            .toUpperCase()}`;

        const order: Order = {
            ...orderData,
            id: orderId,
            createdAt: now,
            updatedAt: now,
        };

        set((state) => {
            addOrderDB(order).catch(console.error);
            return { orders: [...state.orders, order] };
        });

        return orderId;
    },

    getOrderById: (orderId) => {
        return get().orders.find((order) => order.id === orderId);
    },

    getOrderCount: () => {
        return get().orders.length;
    },
}));
