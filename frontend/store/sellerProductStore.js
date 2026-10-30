import { create } from "zustand";
import { persist } from "zustand/middleware";
import { mockSellerProducts } from "@/constants/mockSellerProducts";

// Temporary: the seller's products are kept in the browser.
// Once the backend is ready this becomes GET/POST/PUT/DELETE /api/products (seller only).
export const useSellerProductStore = create(
    persist(
        (set) => ({
            products: mockSellerProducts,

            // new products start as "pending" until an admin approves them
            addProduct: (data) =>
                set((state) => ({
                    products: [
                        { id: `sp-${Date.now().toString(36)}`, status: "pending", image: null, ...data },
                        ...state.products
                    ]
                })),

            updateProduct: (id, data) =>
                set((state) => ({
                    products: state.products.map((p) => (p.id === id ? { ...p, ...data } : p))
                })),

            removeProduct: (id) =>
                set((state) => ({ products: state.products.filter((p) => p.id !== id) }))
        }),
        { name: "vivid-seller-products" }
    )
);