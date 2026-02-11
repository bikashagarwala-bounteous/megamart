import { create } from 'zustand';
import type { User } from '../types';
import { getCurrentUser, setCurrentUser } from '../db/indexedDB';

interface AuthStore {
    user: User | null;
    isInitialized: boolean;

    initializeAuth: () => Promise<void>;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
    isLoggedIn: () => boolean;
}

const DEMO_CREDENTIALS = {
    email: 'demo@megamart.com',
    password: 'demo123',
};

export const useAuthStore = create<AuthStore>((set, get) => ({
    user: null,
    isInitialized: false,

    initializeAuth: async () => {
        try {
            const user = await getCurrentUser();
            set({ user: user || null, isInitialized: true });
        } catch (error) {
            console.error('Failed to initialize auth:', error);
            set({ isInitialized: true });
        }
    },

    login: async (email: string, password: string) => {
        try {
            if (
                email === DEMO_CREDENTIALS.email &&
                password === DEMO_CREDENTIALS.password
            ) {
                const user: User = {
                    id: `user-${Date.now()}`,
                    email,
                    name: email.split('@')[0],
                    loginTime: Date.now(),
                };

                await setCurrentUser(user);
                set({ user });
                return true;
            }
            return false;
        } catch (error) {
            console.error('Login failed:', error);
            return false;
        }
    },

    logout: () => {
        set({ user: null });
        setCurrentUser(null).catch(console.error);
    },

    isLoggedIn: () => {
        return get().user !== null;
    },
}));
