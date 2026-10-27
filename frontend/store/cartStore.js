import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set) => ({
      items: [], // { id, productId, name, price, image, variant, qty }

      // product.id is the cart line id (use a variant-specific id for variants),
      // product.productId is the real product id (used for links)
      addItem: (product, qty = 1) =>
        set((state) => {
          const existing = state.items.find((i) => i.id === product.id);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === product.id ? { ...i, qty: i.qty + qty } : i
              )
            };
          }
          return {
            items: [
              ...state.items,
              {
                id: product.id,
                productId: product.productId || product.id,
                name: product.name,
                price: product.price,
                image: product.image || null,
                variant: product.variant || null,
                qty
              }
            ]
          };
        }),

      updateQty: (id, qty) =>
        set((state) => ({
          items: state.items.map((i) => (i.id === id ? { ...i, qty: Math.max(1, qty) } : i))
        })),

      removeItem: (id) =>
        set((state) => ({ items: state.items.filter((i) => i.id !== id) })),

      clearCart: () => set({ items: [] })
    }),
    { name: "vivid-cart" }
  )
);

// selector: total quantity of items in the cart
export const selectCartCount = (state) =>
  state.items.reduce((total, item) => total + item.qty, 0);