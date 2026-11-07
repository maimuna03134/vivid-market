// Temporary mock data for the seller dashboard (replace with API calls once the backend is ready)

export const sellerProfile = {
    name: "Alex Rivera",
    tier: "Vivid Platinum Seller",
    avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAtl1hs1kJQQqnOWBvLEVvpbyuNO5m-0u1ovXhdolB-IzT1Ijav-fQ5u3zmmG3yn1sh17PexdcwPlCU8zq8wpn9QQGxhjCrX3Z4Pwjm-qjYngtZtqkmIjS4jSxu0xrHpJUjoL48NcAXrJPhkEdc3BLMeEDrnM-W0p9_Qum9AJz9dY1tS0-F27TbNa7n1NfFC7qvwOLQZuCsRXFWapTYUf-5hR72ySp90vMpfaPeHUk0j_XGJKwDcIwxc2w9"
};

export const sellerStats = {
    totalSales: 12840.5,
    salesTrend: 12,
    totalOrders: 156,
    ordersTrend: 5,
    pendingOrders: 12,
    totalProducts: 48
};

export const salesChartData = {
    xLabels: ["Oct 01", "Oct 07", "Oct 14", "Oct 21", "Oct 30"],
    current: [1000, 2500, 2000, 4500, 3500, 7000, 8000, 6000, 9500, 10500, 13000],
    previous: [800, 900, 850, 1200, 1100, 1500, 1400, 1600, 1700, 1800, 2000]
};

const customers = [
    { name: "Sarah Jenkins", initials: "SJ", style: "bg-secondary-container text-secondary" },
    { name: "Marcus Thorne", initials: "MT", style: "bg-primary-fixed text-primary" },
    { name: "Lydia Bennet", initials: "LB", style: "bg-tertiary-fixed text-on-tertiary-fixed-variant" },
    { name: "James Wilson", initials: "JW", style: "bg-error-container text-error" },
    { name: "Elena Petrova", initials: "EP", style: "bg-surface-container-highest text-on-surface" },
    { name: "Noah Kim", initials: "NK", style: "bg-secondary-container text-secondary" },
    { name: "Priya Nair", initials: "PN", style: "bg-primary-fixed text-primary" }
];

const statuses = ["processing", "shipped", "delivered"];

export const recentOrders = Array.from({ length: 12 }, (_, i) => {
    const customer = customers[i % customers.length];
    const status = statuses[(i * 2) % statuses.length];
    const day = 30 - Math.floor(i * 1.8);
    return {
        id: `ORD-${9421 - i * 3}`,
        customer: customer.name,
        initials: customer.initials,
        avatarStyle: customer.style,
        date: new Date(2026, 9, Math.max(1, day)).toISOString(),
        status,
        amount: Math.round((50 + i * 83.7 + (i % 3) * 40) * 100) / 100
    };
});