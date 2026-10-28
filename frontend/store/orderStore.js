import { create } from "zustand";
import { persist } from "zustand/middleware";

// Temporary: orders are kept in the browser so the "My Orders" page can show them.
// Once the backend is ready, orders come from the API (GET /api/orders) instead.
export const useOrderStore = create(
    persist(
        (set) => ({
            orders: [],
            addOrder: (order) => set((state) => ({ orders: [order, ...state.orders] }))
        }),
        { name: "vivid-orders" }
    )
);