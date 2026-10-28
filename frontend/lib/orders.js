import { mockOrders } from "@/constants/mockOrders";

export const ORDER_TABS = [
    { key: "all", label: "All" },
    { key: "processing", label: "Processing" },
    { key: "shipped", label: "Shipped" },
    { key: "delivered", label: "Delivered" },
    { key: "cancelled", label: "Cancelled" }
];

// A freshly placed order ("placed") is shown as Processing
export function statusKey(order) {
    return ["shipped", "delivered", "cancelled"].includes(order.status) ? order.status : "processing";
}

// The only place that decides which orders the page shows, newest first.
// When the backend is ready, return the orders fetched from GET /api/orders instead.
export function getAllOrders(savedOrders) {
    return [...savedOrders, ...mockOrders].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
}