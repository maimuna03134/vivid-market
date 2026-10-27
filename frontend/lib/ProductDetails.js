// Data layer for the product details page.
// Right now it looks the product up in the mock data. When the backend is ready, replace
// getProductById() with a fetch to `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`.
import { allProducts, categoryOptions } from "@/constants/mockProducts";
import { flashSaleProducts, featuredProducts } from "@/constants/mockData";
import { headphoneGallery, recommendedProducts } from "@/constants/mockProductDetails";

// every product that can be linked to from anywhere in the app
const catalog = [...allProducts, ...flashSaleProducts, ...featuredProducts, ...recommendedProducts];

// extra detail data for specific products (all others get sensible defaults below)
const extras = {
    p2: {
        title: "Pro Wireless Noise Cancelling Headphones",
        rating: 4.8,
        images: headphoneGallery,
        colors: [
            { name: "Onyx Black", hex: "#000000" },
            { name: "Silver Gray", hex: "#d1d5db" },
            { name: "Navy Blue", hex: "#1e40af" }
        ],
        models: ["Standard", "Pro"],
        defaultModel: "Pro",
        description:
            "Block out the world and hear every detail. These over-ear headphones combine adaptive active noise cancellation with rich, balanced sound and up to 40 hours of battery life, so they keep up with long commutes, flights and focused work sessions.",
        features: [
            "Adaptive active noise cancellation with transparency mode",
            "Up to 40 hours of playtime, 5 minutes of charging gives 3 hours",
            "Multipoint Bluetooth 5.3, connect two devices at once",
            "Memory-foam ear cushions and a foldable, lightweight frame",
            "Built-in microphones for clear calls"
        ],
        specs: [
            ["Brand", "Sony"],
            ["Type", "Over-ear, closed-back"],
            ["Connectivity", "Bluetooth 5.3, 3.5mm cable"],
            ["Battery Life", "Up to 40 hours"],
            ["Charging", "USB-C fast charging"],
            ["Weight", "254 g"],
            ["Warranty", "1 Year Manufacturer Warranty"]
        ]
    }
};

const sampleReviews = [
    { id: 1, name: "James Smith", rating: 5, helpful: 24, text: "The noise cancellation is absolutely phenomenal. I use them for my daily commute on the train and it completely blocks out everything. Battery life has been solid for over a week of moderate use." },
    { id: 2, name: "Alice Rodriguez", rating: 4, helpful: 12, text: "Excellent sound quality with deep bass and clear highs. The comfort is great for about 3-4 hours, then they get a tiny bit heavy, but otherwise a fantastic purchase for the price." },
    { id: 3, name: "Michael Chen", rating: 5, helpful: 9, text: "Setup took less than a minute and the connection has been rock solid. Delivery was quick and the packaging was great." },
    { id: 4, name: "Priya Nair", rating: 4, helpful: 6, text: "Great value overall. Build quality feels premium and it does exactly what it promises. Would happily buy again." }
];

function buildProduct(base) {
    const extra = extras[base.id] || {};
    const discount = base.discount || 0;
    const oldPrice = base.oldPrice ?? (discount > 0 ? Math.round((base.price / (1 - discount / 100)) * 100) / 100 : null);
    const categoryLabel = categoryOptions.find((c) => c.slug === base.category)?.name || "General";
    const title = extra.title || base.name;

    return {
        id: base.id,
        title,
        price: base.price,
        oldPrice,
        discount,
        rating: extra.rating ?? base.rating ?? 4.6,
        reviews: base.reviews ?? 128,
        images: extra.images || (base.image ? [base.image] : []),
        colors: extra.colors || [],
        models: extra.models || [],
        defaultModel: extra.defaultModel || null,
        description:
            extra.description ||
            `Meet the ${title}. A reliable, well-reviewed pick from our ${categoryLabel} collection, backed by Vivid Market buyer protection and fast delivery.`,
        features: extra.features || [
            "Quality checked before dispatch",
            "Free delivery on eligible orders",
            "7-day easy returns"
        ],
        specs: extra.specs || [
            ["Brand", base.brand || "Vivid"],
            ["Category", categoryLabel],
            ["Warranty", "1 Year Manufacturer Warranty"],
            ["Delivery", "Free delivery by tomorrow"]
        ],
        ratingBreakdown: [85, 10, 3, 1, 1], // % of 5, 4, 3, 2, 1 star reviews
        reviewList: sampleReviews,
        seller: { name: "Vivid Official Store", feedback: "98% Positive Feedback" }
    };
}

export function getProductById(id) {
    const base = catalog.find((p) => p.id === id);
    return base ? buildProduct(base) : null;
}

export function getRecommended(id) {
    return recommendedProducts.filter((p) => p.id !== id);
}