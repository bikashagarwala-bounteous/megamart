import { openDB } from 'idb';
import type { DBSchema, IDBPDatabase } from 'idb';
import type { CartItem, Order, WishlistItem, User } from '../types';

interface MegamartDB extends DBSchema {
    cart: {
        key: string;
        value: CartItem;
    };
    orders: {
        key: string;
        value: Order;
    };
    wishlist: {
        key: string;
        value: WishlistItem;
    };
    auth: {
        key: string;
        value: User;
    };
}

let db: IDBPDatabase<MegamartDB> | null = null;

const initDB = async (): Promise<IDBPDatabase<MegamartDB>> => {
    if (db) return db;

    db = await openDB<MegamartDB>('megamart-db', 1, {
        upgrade(db) {
            if (!db.objectStoreNames.contains('cart')) {
                db.createObjectStore('cart', { keyPath: 'id' });
            }

            if (!db.objectStoreNames.contains('orders')) {
                db.createObjectStore('orders', { keyPath: 'id' });
            }

            if (!db.objectStoreNames.contains('wishlist')) {
                db.createObjectStore('wishlist', { keyPath: 'id' });
            }

            if (!db.objectStoreNames.contains('auth')) {
                db.createObjectStore('auth', { keyPath: 'id' });
            }
        },
    });

    return db;
};


export const getCartItems = async (): Promise<CartItem[]> => {
    const database = await initDB();
    return database.getAll('cart');
};

export const addCartItem = async (item: CartItem): Promise<void> => {
    const database = await initDB();
    await database.put('cart', item);
};

export const updateCartItem = async (item: CartItem): Promise<void> => {
    const database = await initDB();
    await database.put('cart', item);
};

export const removeCartItem = async (itemId: string): Promise<void> => {
    const database = await initDB();
    await database.delete('cart', itemId);
};

export const clearCart = async (): Promise<void> => {
    const database = await initDB();
    await database.clear('cart');
};


export const getOrders = async (): Promise<Order[]> => {
    const database = await initDB();
    return database.getAll('orders');
};

export const addOrder = async (order: Order): Promise<void> => {
    const database = await initDB();
    await database.put('orders', order);
};

export const getOrderById = async (orderId: string): Promise<Order | undefined> => {
    const database = await initDB();
    return database.get('orders', orderId);
};


export const getWishlistItems = async (): Promise<WishlistItem[]> => {
    const database = await initDB();
    return database.getAll('wishlist');
};

export const addWishlistItem = async (item: WishlistItem): Promise<void> => {
    const database = await initDB();
    await database.put('wishlist', item);
};

export const removeWishlistItem = async (itemId: string): Promise<void> => {
    const database = await initDB();
    await database.delete('wishlist', itemId);
};

export const getWishlistItemByProductId = async (productId: number): Promise<WishlistItem | undefined> => {
    const database = await initDB();
    const items = await database.getAll('wishlist');
    return items.find(item => item.productId === productId);
};


export const getCurrentUser = async (): Promise<User | undefined> => {
    const database = await initDB();
    return database.get('auth', 'current-user');
};

export const setCurrentUser = async (user: User | null): Promise<void> => {
    const database = await initDB();
    if (user) {
        await database.put('auth', { ...user, id: 'current-user' });
    } else {
        await database.delete('auth', 'current-user');
    }
};


export const clearAllData = async (): Promise<void> => {
    const database = await initDB();
    await database.clear('cart');
    await database.clear('orders');
    await database.clear('wishlist');
    await database.clear('auth');
};
