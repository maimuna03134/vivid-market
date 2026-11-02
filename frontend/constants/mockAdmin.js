// Temporary mock data for the admin dashboard (replace with API calls once the backend is ready)

export const adminProfile = {
    name: "Alex Rivera",
    tier: "Head Admin",
    avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAtl1hs1kJQQqnOWBvLEVvpbyuNO5m-0u1ovXhdolB-IzT1Ijav-fQ5u3zmmG3yn1sh17PexdcwPlCU8zq8wpn9QQGxhjCrX3Z4Pwjm-qjYngtZtqkmIjS4jSxu0xrHpJUjoL48NcAXrJPhkEdc3BLMeEDrnM-W0p9_Qum9AJz9dY1tS0-F27TbNa7n1NfFC7qvwOLQZuCsRXFWapTYUf-5hR72ySp90vMpfaPeHUk0j_XGJKwDcIwxc2w9"
};

export const adminStats = {
    totalUsers: 42580,
    usersTrend: 12,
    usersProgress: 75,
    totalSellers: 8215,
    sellersTrend: 5.4,
    sellersProgress: 50,
    totalOrders: 156402,
    ordersTrend: 24,
    ordersProgress: 80,
    totalRevenue: 2410500,
    revenueTrend: 18,
    revenueProgress: 67
};

export const revenueChart = {
    months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    current: [40, 36, 48, 52, 60, 56, 50, 58, 64, 54, 58, 62],
    previous: [32, 28, 36, 40, 44, 32, 38, 48, 52, 46, 42, 50]
};

export const orderStatusBreakdown = [
    { key: "delivered", label: "Delivered", pct: 65, color: "#006D37" }, // tertiary
    { key: "shipped", label: "Shipped", pct: 20, color: "#AB3500" }, // primary
    { key: "pending", label: "Pending", pct: 10, color: "#5D5C74" }, // secondary
    { key: "cancelled", label: "Cancelled", pct: 5, color: "#BA1A1A" } // error
];

export const totalActiveOrders = "12.4k";

const avatarStyles = [
    "bg-primary-fixed text-primary",
    "bg-secondary-container text-secondary",
    "bg-outline-variant text-on-surface-variant",
    "bg-tertiary-fixed text-tertiary"
];

const txns = [
    ["ORD-7721", "Jane Doe", "JD", "Vivid Pro Headset x1", 299.0, "delivered", "2026-10-29T10:10:00"],
    ["ORD-7719", "Marcus Bell", "MB", "Luxe Leather Chair x2", 840.0, "shipped", "2026-10-28T15:40:00"],
    ["ORD-7718", "Sarah Kim", "SK", "Minimalist Watch x1", 125.0, "pending", "2026-10-28T09:05:00"],
    ["ORD-7715", "Noah Ahmed", "NA", "Studio Mic x1", 199.0, "delivered", "2026-10-27T13:25:00"],
    ["ORD-7710", "Priya Rao", "PR", "Gaming Mouse x3", 149.97, "cancelled", "2026-10-26T11:00:00"]
];

export const recentTransactions = txns.map(([id, customer, initials, product, amount, status, date], i) => ({
    id,
    customer,
    initials,
    avatarStyle: avatarStyles[i % avatarStyles.length],
    product,
    amount,
    status,
    date
}));