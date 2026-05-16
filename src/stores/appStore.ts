import { create } from "zustand";
import { User, Property, Investment, Dividend, Transaction, Notification, Wallet, Referral } from "@/types";
import { currentUser, wallet as initialWallet, properties, investments, dividends, transactions, notifications, referral } from "@/data/mockData";

interface AppState {
  // User
  user: User | null;
  isAuthenticated: boolean;
  
  // Data
  properties: Property[];
  investments: Investment[];
  dividends: Dividend[];
  transactions: Transaction[];
  notifications: Notification[];
  wallet: Wallet;
  referral: Referral;
  
  // UI State
  isSidebarOpen: boolean;
  theme: "light" | "dark";
  
  // Actions
  setUser: (user: User | null) => void;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  toggleSidebar: () => void;
  toggleTheme: () => void;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  addTransaction: (transaction: Transaction) => void;
  addInvestment: (investment: Investment) => void;
  updateWallet: (balance: number) => void;
}

export const useAppStore = create<AppState>((set) => ({
  // Initial State
  user: null,
  isAuthenticated: false,
  
  properties,
  investments,
  dividends,
  transactions,
  notifications,
  wallet: initialWallet,
  referral,
  
  isSidebarOpen: true,
  theme: "light",
  
  // Actions
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  
  login: async (email: string, password: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    if (email && password) {
      set({ user: currentUser, isAuthenticated: true });
      return true;
    }
    return false;
  },
  
  logout: () => set({ user: null, isAuthenticated: false }),
  
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  
  toggleTheme: () => set((state) => ({ theme: state.theme === "light" ? "dark" : "light" })),
  
  markNotificationAsRead: (id: string) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
    })),
  
  markAllNotificationsAsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true })),
    })),
  
  addTransaction: (transaction: Transaction) =>
    set((state) => ({
      transactions: [transaction, ...state.transactions],
    })),
  
  addInvestment: (investment: Investment) =>
    set((state) => ({
      investments: [...state.investments, investment],
    })),
  
  updateWallet: (balance: number) =>
    set((state) => ({
      wallet: { ...state.wallet, balance },
    })),
}));
