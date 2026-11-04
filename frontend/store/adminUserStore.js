import { create } from "zustand";
import { persist } from "zustand/middleware";
import { mockAdminUsers } from "@/constants/mockAdminUsers";

// Temporary: user ban status is updated in the browser.
// Once the backend is ready this becomes GET /api/admin/users + PUT /api/admin/users/:id.
export const useAdminUserStore = create(
    persist(
        (set) => ({
            users: mockAdminUsers,
            toggleBan: (id) =>
                set((state) => ({
                    users: state.users.map((u) =>
                        u.id === id ? { ...u, status: u.status === "banned" ? "active" : "banned" } : u
                    )
                }))
        }),
        { name: "vivid-admin-users" }
    )
);