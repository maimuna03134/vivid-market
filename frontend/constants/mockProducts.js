// Temporary mock data for the products listing (replace with API calls once the backend is ready)

export const categoryOptions = [
    { name: "Computing", slug: "computing" },
    { name: "Audio", slug: "audio" },
    { name: "Gaming", slug: "gaming" },
    { name: "Wearables", slug: "wearables" }
];

export const brandOptions = ["Logitech", "Razer", "Sony", "Apple"];

export const allProducts = [
    { id: "p1", name: "Pro Wireless Gaming Mouse", price: 59.99, oldPrice: 79.99, discount: 25, rating: 4.8, reviews: 128, category: "gaming", parent: "electronics", brand: "Razer", image: null, createdAt: "2026-09-01" },
    { id: "p2", name: "Noise Cancelling Headphones", price: 249.0, oldPrice: 299.0, discount: 15, rating: 4.9, reviews: 850, category: "audio", parent: "electronics", brand: "Sony", image: null, createdAt: "2026-08-20" },
    { id: "p3", name: "Mechanical Gaming Keyboard", price: 120.0, oldPrice: 149.0, discount: 20, rating: 4.7, reviews: 342, category: "gaming", parent: "electronics", brand: "Razer", image: null, createdAt: "2026-09-10" },
    { id: "p4", name: "USB-C Multiport Adapter", price: 45.0, oldPrice: 55.0, discount: 18, rating: 4.5, reviews: 92, category: "computing", parent: "electronics", brand: "Logitech", image: null, createdAt: "2026-07-15" },
    { id: "p5", name: "Smart Watch Series 8", price: 329.0, oldPrice: 399.0, discount: 17, rating: 4.9, reviews: 2105, category: "wearables", parent: "electronics", brand: "Apple", image: null, createdAt: "2026-06-30" },
    { id: "p6", name: "Ultra-Wide Gaming Monitor", price: 499.0, oldPrice: 599.0, discount: 16, rating: 4.6, reviews: 45, category: "gaming", parent: "electronics", brand: "Sony", image: null, createdAt: "2026-10-01" },
    { id: "p7", name: "Portable SSD 1TB", price: 89.99, oldPrice: 119.0, discount: 24, rating: 4.8, reviews: 567, category: "computing", parent: "electronics", brand: "Sony", image: null, createdAt: "2026-08-05" },
    { id: "p8", name: "Streaming Webcam 4K", price: 159.0, oldPrice: 199.0, discount: 20, rating: 4.4, reviews: 231, category: "computing", parent: "electronics", brand: "Logitech", image: null, createdAt: "2026-09-22" },
    { id: "p9", name: "Wireless Charging Pad", price: 29.0, oldPrice: 39.0, discount: 25, rating: 4.3, reviews: 1204, category: "computing", parent: "electronics", brand: "Apple", image: null, createdAt: "2026-05-18" },
    { id: "p10", name: "VR Headset Elite", price: 399.0, oldPrice: 449.0, discount: 11, rating: 4.7, reviews: 89, category: "gaming", parent: "electronics", brand: "Sony", image: null, createdAt: "2026-10-12" },
    { id: "p11", name: "Bluetooth Soundbar", price: 180.0, oldPrice: 220.0, discount: 18, rating: 4.5, reviews: 312, category: "audio", parent: "electronics", brand: "Sony", image: null, createdAt: "2026-07-01" },
    { id: "p12", name: "Ergonomic Desk Chair", price: 299.0, oldPrice: 359.0, discount: 16, rating: 4.8, reviews: 156, category: "computing", parent: "electronics", brand: "Logitech", image: null, createdAt: "2026-04-10" }
];