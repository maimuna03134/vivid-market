// Temporary mock data for admin categories & banners (replace with API calls once the backend is ready)
import { HERO_IMAGE, flashSaleProducts } from "@/constants/customer/home";

export const mockCategories = [
    { id: "cat-1", name: "Electronics & Gadgets", image: null, productCount: 1240, status: "active" },
    { id: "cat-2", name: "Fashion & Apparel", image: null, productCount: 3892, status: "active" },
    { id: "cat-3", name: "Home & Living", image: null, productCount: 2115, status: "draft" },
    { id: "cat-4", name: "Sports & Fitness", image: null, productCount: 874, status: "active" },
    { id: "cat-5", name: "Beauty & Personal Care", image: null, productCount: 1560, status: "active" },
    { id: "cat-6", name: "Kitchen & Dining", image: null, productCount: 980, status: "active" },
    { id: "cat-7", name: "Toys & Games", image: null, productCount: 640, status: "draft" },
    { id: "cat-8", name: "Books & Stationery", image: null, productCount: 1125, status: "active" },
    { id: "cat-9", name: "Automotive", image: null, productCount: 310, status: "active" },
    { id: "cat-10", name: "Pet Supplies", image: null, productCount: 455, status: "active" },
    { id: "cat-11", name: "Health & Wellness", image: null, productCount: 720, status: "active" },
    { id: "cat-12", name: "Garden & Outdoor", image: null, productCount: 390, status: "draft" }
];

export const mockBanners = [
    { id: "ban-1", title: "Summer Tech Mega Sale", image: HERO_IMAGE, status: "active", position: 1 },
    { id: "ban-2", title: "Spring Collection 2026", image: flashSaleProducts[0].image, status: "active", position: 2 },
    { id: "ban-3", title: "Holiday Gift Guide", image: flashSaleProducts[2].image, status: "scheduled", startDate: "2026-12-01T00:00:00" }
];