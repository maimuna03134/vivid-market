import { create } from "zustand";
import { persist } from "zustand/middleware";
import { mockSellerOrders } from "@/constants/mockSellerOrders";

// Temporary: order statuses are updated in the browser.
// Once the backend is ready this becomes GET /api/orders + PUT /api/orders/:id/status.
export const useSellerOrderStore = create(
    persist(
        (set) => ({
            orders: mockSellerOrders,
            updateStatus: (id, status) =>
                set((state) => ({
                    orders: state.orders.map((o) => (o.id === id ? { ...o, status } : o))
                }))
        }),
        { name: "vivid-seller-orders" }
    )
);