// Logic for seller order management (no styling here, so it can be reused anywhere)

export const ORDER_STATUSES = ["processing", "shipped", "delivered", "cancelled"];

export const STATUS_META = {
    processing: { label: "Processing", pill: "bg-primary-container/10 text-primary-container", ring: "focus:ring-primary-container" },
    shipped: { label: "Shipped", pill: "bg-blue-100 text-blue-700", ring: "focus:ring-blue-500" },
    delivered: { label: "Delivered", pill: "bg-tertiary-container/10 text-tertiary-container", ring: "focus:ring-tertiary-container" },
    cancelled: { label: "Cancelled", pill: "bg-error-container/10 text-error", ring: "focus:ring-error" }
};

export const ORDER_TABS = [
    { key: "all", label: "All Orders" },
    { key: "processing", label: "Processing" },
    { key: "shipped", label: "Shipped" },
    { key: "delivered", label: "Delivered" },
    { key: "cancelled", label: "Cancelled" }
];

export function orderTotals(order) {
    const qty = order.items.reduce((sum, i) => sum + i.qty, 0);
    const amount = order.items.reduce((sum, i) => sum + i.qty * i.price, 0);
    return { qty, amount };
}

export function filterOrdersByTab(orders, tab) {
    return tab === "all" ? orders : orders.filter((o) => o.status === tab);
}

// orders are all within the last 30 days in the mock data, so "revenue" here doubles as "Revenue (30d)"
export function computeOrderStats(orders) {
    const total = orders.length;
    const pending = orders.filter((o) => o.status === "processing").length;
    const cancelled = orders.filter((o) => o.status === "cancelled").length;
    const revenue = orders
        .filter((o) => o.status !== "cancelled")
        .reduce((sum, o) => sum + orderTotals(o).amount, 0);
    const returnsRate = total ? (cancelled / total) * 100 : 0;
    return { total, pending, revenue, returnsRate };
}