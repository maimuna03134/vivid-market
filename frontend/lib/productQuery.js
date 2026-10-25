// Helpers to read / write the products listing filters from the URL.
// Kept free of data imports so it can be used in both server and client components.
// These same query params can later be sent straight to the backend: GET /api/products?...

function first(v) {
    return Array.isArray(v) ? v[0] : v;
}

function toNumber(v) {
    const raw = first(v);
    if (raw === undefined || raw === null || raw === "") return null;
    const n = Number(raw);
    return Number.isNaN(n) ? null : n;
}

function toList(v) {
    const raw = first(v);
    return raw ? String(raw).split(",").filter(Boolean) : [];
}

// URL searchParams object -> clean filters object
export function parseFilters(sp = {}) {
    return {
        search: first(sp.search) || "",
        category: toList(sp.category),
        brand: toList(sp.brand),
        minPrice: toNumber(sp.minPrice),
        maxPrice: toNumber(sp.maxPrice),
        rating: toNumber(sp.rating),
        sort: first(sp.sort) || "popularity",
        page: Math.max(1, toNumber(sp.page) || 1)
    };
}

// filters object -> "?category=audio&sort=price-asc" (or "" if nothing is set)
export function buildQuery(f) {
    const p = new URLSearchParams();
    if (f.search) p.set("search", f.search);
    if (f.category?.length) p.set("category", f.category.join(","));
    if (f.brand?.length) p.set("brand", f.brand.join(","));
    if (f.minPrice !== null && f.minPrice !== undefined) p.set("minPrice", String(f.minPrice));
    if (f.maxPrice !== null && f.maxPrice !== undefined) p.set("maxPrice", String(f.maxPrice));
    if (f.rating) p.set("rating", String(f.rating));
    if (f.sort && f.sort !== "popularity") p.set("sort", f.sort);
    if (f.page && f.page > 1) p.set("page", String(f.page));
    const qs = p.toString();
    return qs ? `?${qs}` : "";
}