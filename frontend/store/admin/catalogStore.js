import { create } from "zustand";
import { persist } from "zustand/middleware";
import { mockCategories, mockBanners } from "@/constants/admin/categories";

let catSeq = mockCategories.length;
let banSeq = mockBanners.length;

// Temporary: categories and banners are kept in the browser.
// Once the backend is ready this becomes GET/POST/PUT/DELETE /api/categories.
export const useCatalogStore = create(
    persist(
        (set) => ({
            categories: mockCategories,
            banners: mockBanners,

            addCategory: (data) =>
                set((state) => ({
                    categories: [{ id: `cat-${++catSeq}`, productCount: 0, ...data }, ...state.categories]
                })),
            updateCategory: (id, data) =>
                set((state) => ({ categories: state.categories.map((c) => (c.id === id ? { ...c, ...data } : c)) })),
            removeCategory: (id) =>
                set((state) => ({ categories: state.categories.filter((c) => c.id !== id) })),

            addBanner: (data) =>
                set((state) => {
                    const activeCount = state.banners.filter((b) => b.status === "active").length;
                    return {
                        banners: [
                            ...state.banners,
                            { id: `ban-${++banSeq}`, position: activeCount + 1, ...data }
                        ]
                    };
                }),
            updateBanner: (id, data) =>
                set((state) => ({ banners: state.banners.map((b) => (b.id === id ? { ...b, ...data } : b)) })),
            removeBanner: (id) =>
                set((state) => ({ banners: state.banners.filter((b) => b.id !== id) })),

            setBannerStatus: (id, status) =>
                set((state) => {
                    let banners = state.banners.map((b) => (b.id === id ? { ...b, status } : b));
                    if (status === "active") {
                        const activeCount = banners.filter((b) => b.status === "active" && b.id !== id).length;
                        banners = banners.map((b) => (b.id === id ? { ...b, position: activeCount + 1 } : b));
                    }
                    return { banners };
                }),

            reorderActiveBanner: (id, direction) =>
                set((state) => {
                    const active = state.banners
                        .filter((b) => b.status === "active")
                        .sort((a, b) => a.position - b.position);
                    const idx = active.findIndex((b) => b.id === id);
                    const swapIdx = direction === "up" ? idx - 1 : idx + 1;
                    if (idx === -1 || swapIdx < 0 || swapIdx >= active.length) return {};
                    const a = active[idx];
                    const b = active[swapIdx];
                    return {
                        banners: state.banners.map((bn) => {
                            if (bn.id === a.id) return { ...bn, position: b.position };
                            if (bn.id === b.id) return { ...bn, position: a.position };
                            return bn;
                        })
                    };
                })
        }),
        { name: "vivid-admin-catalog" }
    )
);