// Sample orders so the My Orders page shows every status from the design.
// Remove this file (and the import in lib/orders.js) once orders come from the backend.
import { flashSaleProducts } from "@/constants/mockData";
import { headphoneGallery } from "@/constants/mockProductDetails";
import { calcTotals } from "@/lib/cart";

const [keyboard, mouse, speaker, backpack, strip] = flashSaleProducts;

const shipping = {
    fullName: "Sample Customer",
    phone: "01712-345678",
    address: "House 12, Road 4, GEC Circle",
    city: "Chittagong",
    area: "Khulshi"
};

const line = (p, qty = 1) => ({
    id: p.id,
    productId: p.id,
    name: p.name,
    price: p.price,
    image: p.image,
    variant: null,
    qty
});

const headphones = {
    id: "p2:Onyx Black-Pro",
    productId: "p2",
    name: "Pro Wireless Noise Cancelling Headphones",
    price: 249,
    image: headphoneGallery[0],
    variant: "Onyx Black / Pro",
    qty: 1
};

function makeOrder(id, createdAt, status, paymentMethod, paymentStatus, items) {
    return {
        id,
        createdAt,
        status,
        paymentMethod,
        paymentStatus,
        shipping,
        items,
        coupon: null,
        totals: calcTotals(items, null),
        isSample: true
    };
}

export const mockOrders = [
    makeOrder("VM-102938", "2026-10-26T10:30:00", "processing", "card", "paid", [
        line(keyboard),
        line(mouse),
        line(speaker)
    ]),
    makeOrder("VM-102935", "2026-10-23T15:10:00", "shipped", "bkash", "paid", [
        headphones,
        line(backpack),
        line(strip, 2),
        line(mouse)
    ]),
    makeOrder("VM-102930", "2026-10-17T09:45:00", "delivered", "cod", "paid", [line(speaker)]),
    makeOrder("VM-102890", "2026-10-12T18:20:00", "cancelled", "card", "pending", [line(backpack)])
];