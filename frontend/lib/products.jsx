// Data layer for the products listing.
// Right now it filters mock data. When the backend is ready, replace the body of
// getProducts() with a fetch to  `${process.env.NEXT_PUBLIC_API_URL}/products${buildQuery(filters)}`.
import { allProducts } from "@/constants/mockProducts";

export const PAGE_SIZE = 8;

export function getProducts(filters) {
    const { search, category, brand, minPrice, maxPrice, rating, sort } = filters;
    const q = search.trim().toLowerCase();

    let list = allProducts.filter((p) => {
        if (q && !p.name.toLowerCase().includes(q)) return false;
        if (category.length && !category.some((c) => p.category === c || p.parent === c)) return false;
        if (brand.length && !brand.includes(p.brand)) return false;
        if (minPrice !== null && p.price < minPrice) return false;
        if (maxPrice !== null && p.price > maxPrice) return false;
        // "5 Stars" means 4.5 and above; "4+" and "3+" use the number as is
        if (rating && p.rating < (rating === 5 ? 4.5 : rating)) return false;
        return true;
    });

    const sorters = {
        popularity: (a, b) => b.reviews - a.reviews,
        newest: (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
        "price-asc": (a, b) => a.price - b.price,
        "price-desc": (a, b) => b.price - a.price,
        deals: (a, b) => b.discount - a.discount
    };
    list = [...list].sort(sorters[sort] || sorters.popularity);

    const total = list.length;
    const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
    const page = Math.min(filters.page, totalPages);
    const start = (page - 1) * PAGE_SIZE;
    const items = list.slice(start, start + PAGE_SIZE);

    return {
        items,
        total,
        page,
        totalPages,
        from: total === 0 ? 0 : start + 1,
        to: start + items.length
    };
}