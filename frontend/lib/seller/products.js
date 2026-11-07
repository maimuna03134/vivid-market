// Logic for the seller's product list (no styling here, so it can be used anywhere)

export const SELLER_CATEGORIES = [
    "Electronics",
    "Fashion",
    "Home & Living",
    "Beauty & Care",
    "Sports & Outdoors",
    "Kitchen & Dining"
];

// 0 = out of stock, up to 10 = low, up to 100 = sufficient, more = in stock
export function stockLevel(stock) {
    if (stock <= 0) return "out";
    if (stock <= 10) return "low";
    if (stock <= 100) return "sufficient";
    return "in";
}

// search by name, SKU or category (case-insensitive)
export function filterProducts(products, query) {
    const q = query.trim().toLowerCase();
    if (!q) return products;
    return products.filter(
        (p) =>
            p.name.toLowerCase().includes(q) ||
            p.sku.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q)
    );
}

export function productStats(products) {
    return {
        total: products.length,
        active: products.filter((p) => p.status === "approved" && p.stock > 0).length,
        outOfStock: products.filter((p) => p.stock <= 0).length,
        pending: products.filter((p) => p.status === "pending").length
    };
}