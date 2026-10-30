// Temporary mock data for seller order management (replace with API calls once the backend is ready)
import { mockSellerProducts } from "@/constants/mockSellerProducts";

const customers = [
    { name: "Sarah Jenkins", email: "sarah.j@example.com" },
    { name: "Michael Chen", email: "m.chen@techmail.com" },
    { name: "Emily Rodriguez", email: "emrod@gmail.com" },
    { name: "David Wilson", email: "dwilson.88@web.net" },
    { name: "Olivia Martinez", email: "olivia.m@example.com" },
    { name: "James Carter", email: "j.carter@mailbox.com" },
    { name: "Sophia Nguyen", email: "sophia.nguyen@example.com" },
    { name: "Liam O'Brien", email: "liam.obrien@example.com" }
];

// weighted so most orders are processing/shipped/delivered, a few cancelled
const statusCycle = ["processing", "shipped", "delivered", "processing", "shipped", "delivered", "delivered", "cancelled"];

const pick = (arr, i) => arr[i % arr.length];

export const mockSellerOrders = Array.from({ length: 34 }, (_, i) => {
    const customer = pick(customers, i);
    const status = pick(statusCycle, i);
    const itemCount = (i % 3) + 1; // 1-3 items per order
    const items = Array.from({ length: itemCount }, (_, j) => {
        const product = pick(mockSellerProducts, i + j * 5);
        return { name: product.name, image: product.image, price: product.price, qty: ((i + j) % 3) + 1 };
    });
    return {
        id: `ORD-${9421 - i}`,
        customerName: customer.name,
        customerEmail: customer.email,
        items,
        status,
        date: new Date(2026, 9, Math.max(1, 30 - i)).toISOString(),
        shippingAddress: "House 12, Road 4, GEC Circle, Chittagong"
    };
});