// Temporary mock data for the seller's product list (replace with API calls once the backend is ready)
import { flashSaleProducts } from "@/constants/mockData";
import { headphoneGallery, recommendedProducts } from "@/constants/mockProductDetails";

const [keyboard, mouse, speaker, backpack, strip] = flashSaleProducts;

export const mockSellerProducts = [
    { id: "sp-1", name: "Nebula Pro 5G", sku: "NEB-5G-2024", category: "Electronics", price: 899.0, stock: 42, status: "approved", image: null },
    { id: "sp-2", name: "SonicBoom ANC Headphones", sku: "SB-AUDIO-BLK", category: "Electronics", price: 249.5, stock: 8, status: "pending", image: headphoneGallery[0] },
    { id: "sp-3", name: "Urban Leather Satchel", sku: "LTHR-ST-BRW", category: "Fashion", price: 125.0, stock: 156, status: "rejected", image: backpack.image },
    { id: "sp-4", name: "CoreClick RGB Keyboard", sku: "KB-CORE-RGB", category: "Electronics", price: 159.99, stock: 15, status: "approved", image: keyboard.image },
    { id: "sp-5", name: "Precision Wireless Mouse", sku: "MS-PREC-WL", category: "Electronics", price: 49.99, stock: 0, status: "approved", image: mouse.image },
    { id: "sp-6", name: "Sonic Boom Portable Speaker", sku: "SP-BOOM-ORG", category: "Electronics", price: 89.0, stock: 64, status: "approved", image: speaker.image },
    { id: "sp-7", name: "Smart Aura LED Strip", sku: "LED-AURA-PRO", category: "Home & Living", price: 25.0, stock: 230, status: "approved", image: strip.image },
    { id: "sp-8", name: "Vivid Buds Active White", sku: "EB-VIVID-WHT", category: "Electronics", price: 129.0, stock: 5, status: "pending", image: recommendedProducts[0].image },
    { id: "sp-9", name: "Studio Condenser Mic", sku: "MIC-STU-01", category: "Electronics", price: 199.0, stock: 27, status: "approved", image: recommendedProducts[2].image },
    { id: "sp-10", name: "Ergonomic Desk Chair", sku: "CH-ERGO-GRY", category: "Home & Living", price: 299.0, stock: 12, status: "approved", image: null },
    { id: "sp-11", name: "Canvas Weekender Bag", sku: "BAG-CNV-TAN", category: "Fashion", price: 79.5, stock: 88, status: "pending", image: null },
    { id: "sp-12", name: "Ceramic Pour-Over Set", sku: "KIT-POUR-WHT", category: "Kitchen & Dining", price: 54.0, stock: 0, status: "approved", image: null },
    { id: "sp-13", name: "Trail Running Shoes", sku: "SH-TRAIL-GRN", category: "Sports & Outdoors", price: 110.0, stock: 73, status: "approved", image: null },
    { id: "sp-14", name: "Vitamin C Face Serum", sku: "BEA-VITC-30", category: "Beauty & Care", price: 32.5, stock: 310, status: "rejected", image: null }
];