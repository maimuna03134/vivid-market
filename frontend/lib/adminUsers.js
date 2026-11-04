// Logic for admin user management (no styling here, so it can be reused anywhere)

export const ROLES = ["customer", "seller", "admin"];

export const ROLE_META = {
    customer: { label: "Customer", badge: "bg-surface-container-highest text-on-surface-variant" },
    seller: { label: "Seller", badge: "bg-tertiary-container text-on-tertiary-container" },
    admin: { label: "Admin", badge: "bg-secondary-container text-on-secondary-container" }
};

export const STATUS_META = {
    active: { label: "Active", dot: "bg-tertiary", text: "text-tertiary" },
    banned: { label: "Banned", dot: "bg-error", text: "text-error" }
};

export function filterUsers(users, { search = "", role = "all", status = "all" }) {
    const q = search.trim().toLowerCase();
    return users.filter((u) => {
        if (q && !u.name.toLowerCase().includes(q) && !u.email.toLowerCase().includes(q) && !u.id.toLowerCase().includes(q))
            return false;
        if (role !== "all" && u.role !== role) return false;
        if (status !== "all" && u.status !== status) return false;
        return true;
    });
}