"use client";

import { useEffect, useMemo, useState } from "react";
import Icon from "@/components/ui/Icon";
import UsersTable from "@/components/admin/users/UsersTable";
import UserDetailsModal from "@/components/admin/users/UserDetailsModal";
import { useAdminUserStore } from "@/store/admin/userStore";
import { ROLES, ROLE_META, filterUsers } from "@/lib/admin/users";
import { toast } from "@/lib/toast";

const PAGE_SIZE = 10;
const STATUS_TABS = [
    { key: "all", label: "All" },
    { key: "active", label: "Active" },
    { key: "banned", label: "Banned" }
];

export default function UserManagementView() {
    const users = useAdminUserStore((s) => s.users);
    const toggleBan = useAdminUserStore((s) => s.toggleBan);

    const [mounted, setMounted] = useState(false);
    const [search, setSearch] = useState("");
    const [role, setRole] = useState("all");
    const [status, setStatus] = useState("all");
    const [page, setPage] = useState(1);
    const [viewing, setViewing] = useState(null);

    // users live in localStorage, so wait for the browser before showing them
    useEffect(() => setMounted(true), []);

    const filtered = useMemo(
        () => filterUsers(users, { search, role, status }),
        [users, search, role, status]
    );

    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    const currentPage = Math.min(page, totalPages);
    const start = (currentPage - 1) * PAGE_SIZE;
    const visible = filtered.slice(start, start + PAGE_SIZE);

    function resetAndSet(setter) {
        return (value) => {
            setter(value);
            setPage(1);
        };
    }

    function handleToggleBan(user) {
        toggleBan(user.id);
        toast.success(`${user.name} ${user.status === "banned" ? "unbanned" : "banned"}`);
        setViewing((v) => (v && v.id === user.id ? { ...v, status: v.status === "banned" ? "active" : "banned" } : v));
    }

    return (
        <>
            {/* Header */}
            <div className="flex justify-between items-end mb-8 flex-wrap gap-4">
                <div>
                    <h2 className="text-headline-lg text-on-surface">User Management</h2>
                    <p className="text-body-md text-on-surface-variant mt-1">
                        Monitor and manage access across your global marketplace.{" "}
                        <span className="font-bold text-primary">42,580</span> total records.
                    </p>
                </div>
                <div className="flex gap-2">
                    <button
                        type="button"
                        onClick={() => toast.success("CSV export will start shortly")}
                        className="flex items-center gap-2 px-4 py-2 bg-surface-container-highest text-on-surface text-label-md rounded border border-outline-variant hover:bg-surface-container-high transition-colors"
                    >
                        <Icon name="file_download" className="text-[18px]" />
                        Export CSV
                    </button>
                    <button
                        type="button"
                        onClick={() => toast.info("Advanced filters are coming soon")}
                        className="flex items-center gap-2 px-4 py-2 bg-surface-container-highest text-on-surface text-label-md rounded border border-outline-variant hover:bg-surface-container-high transition-colors"
                    >
                        <Icon name="filter_list" className="text-[18px]" />
                        Advanced
                    </button>
                </div>
            </div>

            {/* Filters bar */}
            <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant shadow-sm mb-6 flex flex-wrap items-center gap-4">
                <div className="flex-1 min-w-[260px] relative">
                    <Icon name="search" className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => resetAndSet(setSearch)(e.target.value)}
                        placeholder="Search by name, email, or user ID..."
                        className="w-full pl-12 pr-4 py-3 bg-surface-container-low border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-body-md outline-none transition-all"
                    />
                </div>

                <div className="flex items-center gap-3">
                    <span className="text-label-md text-on-surface-variant whitespace-nowrap">Filter by Role:</span>
                    <select
                        value={role}
                        onChange={(e) => resetAndSet(setRole)(e.target.value)}
                        className="bg-surface-container-low border border-outline-variant rounded-lg px-4 py-3 text-body-md min-w-[140px] focus:ring-2 focus:ring-primary outline-none"
                    >
                        <option value="all">All Roles</option>
                        {ROLES.map((r) => (
                            <option key={r} value={r}>
                                {ROLE_META[r].label}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex items-center gap-3 border-l border-outline-variant pl-4">
                    <span className="text-label-md text-on-surface-variant whitespace-nowrap">Status:</span>
                    <div className="flex bg-surface-container-low p-1 rounded-lg border border-outline-variant">
                        {STATUS_TABS.map((t) => (
                            <button
                                key={t.key}
                                type="button"
                                onClick={() => resetAndSet(setStatus)(t.key)}
                                className={`px-4 py-2 text-label-md rounded-md transition-colors ${status === t.key
                                        ? "bg-surface-container-lowest text-primary shadow-sm border border-outline-variant/50"
                                        : "text-on-surface-variant hover:text-on-surface"
                                    }`}
                            >
                                {t.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Table / states */}
            {!mounted ? (
                <div className="h-96 bg-surface-container rounded-xl animate-pulse" />
            ) : visible.length > 0 ? (
                <UsersTable
                    users={visible}
                    page={currentPage}
                    totalPages={totalPages}
                    from={start + 1}
                    to={start + visible.length}
                    total={filtered.length}
                    onPage={(p) => setPage(Math.min(totalPages, Math.max(1, p)))}
                    onView={setViewing}
                    onToggleBan={handleToggleBan}
                />
            ) : (
                <div className="flex flex-col items-center justify-center text-center py-20 bg-white border border-outline-variant rounded-xl">
                    <Icon name="person_search" className="text-[64px] text-outline-variant" />
                    <h3 className="text-headline-sm text-on-secondary-fixed mt-4">No users found</h3>
                    <p className="text-on-surface-variant mt-1">Try a different search or filter.</p>
                </div>
            )}

            {/* Mini stat cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant shadow-sm flex items-center gap-4 group hover:border-primary transition-all">
                    <div className="w-12 h-12 rounded-lg bg-tertiary-container/30 text-tertiary flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Icon name="person_check" filled />
                    </div>
                    <div>
                        <p className="text-label-md text-on-surface-variant">Active New Users</p>
                        <p className="text-headline-md text-on-surface">
                            +1,240 <span className="text-[12px] font-normal text-tertiary ml-1">↑ 12%</span>
                        </p>
                    </div>
                </div>
                <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant shadow-sm flex items-center gap-4 group hover:border-primary transition-all">
                    <div className="w-12 h-12 rounded-lg bg-primary-fixed text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Icon name="store" filled />
                    </div>
                    <div>
                        <p className="text-label-md text-on-surface-variant">Top Sellers Today</p>
                        <p className="text-headline-md text-on-surface">
                            328 <span className="text-[12px] font-normal text-tertiary ml-1">↑ 4%</span>
                        </p>
                    </div>
                </div>
                <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant shadow-sm flex items-center gap-4 group hover:border-primary transition-all">
                    <div className="w-12 h-12 rounded-lg bg-error-container/40 text-error flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Icon name="report" filled />
                    </div>
                    <div>
                        <p className="text-label-md text-on-surface-variant">Pending Appeals</p>
                        <p className="text-headline-md text-on-surface">
                            42 <span className="text-[12px] font-normal text-error ml-1">↓ 2%</span>
                        </p>
                    </div>
                </div>
            </div>

            {viewing && (
                <UserDetailsModal user={viewing} onClose={() => setViewing(null)} onToggleBan={handleToggleBan} />
            )}
        </>
    );
}