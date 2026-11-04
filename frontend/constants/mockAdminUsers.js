// Temporary mock data for admin user management (replace with API calls once the backend is ready)

const names = [
    "Sarah Jenkins", "Marcus Thorne", "Liam Vought", "Elena Rodriguez",
    "Noah Ahmed", "Priya Rao", "David Wilson", "Olivia Martinez",
    "James Carter", "Sophia Nguyen", "Michael Chen", "Emily Rodriguez",
    "Aisha Khan", "Ryan Walsh", "Grace Kim", "Tomas Alvarez"
];

const roleCycle = ["customer", "seller", "customer", "customer", "seller", "admin", "customer", "customer"];
const statusCycle = ["active", "active", "active", "banned", "active", "active", "active", "banned"];

const avatarStyles = [
    "bg-primary-fixed text-primary",
    "bg-secondary-container text-secondary",
    "bg-tertiary-fixed text-tertiary",
    "bg-surface-container-highest text-on-surface-variant"
];

const pick = (arr, i) => arr[i % arr.length];

function emailFor(name, role, i) {
    const slug = name.toLowerCase().replace(/\s+/g, ".");
    const domain = role === "admin" ? "vividcorp.com" : role === "seller" ? "shopglobal.com" : "example.com";
    return `${slug}${i >= names.length ? i : ""}@${domain}`;
}

export const mockAdminUsers = Array.from({ length: 32 }, (_, i) => {
    const name = pick(names, i);
    const role = pick(roleCycle, i);
    const status = pick(statusCycle, i);
    return {
        id: `USR-${7000 + i}`,
        name,
        email: emailFor(name, role, i),
        initials: name.split(" ").map((w) => w[0]).join(""),
        avatarStyle: avatarStyles[i % avatarStyles.length],
        role,
        status,
        joinedAt: new Date(2026, (i * 2) % 12, Math.max(1, (i * 3) % 28)).toISOString()
    };
});