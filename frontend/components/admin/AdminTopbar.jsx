"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon from "@/components/ui/Icon";
import { toast } from "@/lib/toast";

// each admin page gets a quick-action button that fits its own context
const QUICK_ACTIONS = {
    "/admin/users": { label: "Add User", icon: "person_add", onToast: "Adding users manually is coming soon" }
};
const DEFAULT_ACTION = { label: "Product Approvals", icon: "inventory_2", href: "/admin/products" };

export default function AdminTopbar({ onMenuClick }) {
    const pathname = usePathname();
    const [query, setQuery] = useState("");

    function handleSearch(e) {
        e.preventDefault();
        if (query.trim()) toast.info(`Searching "${query.trim()}" is coming soon`);
    }

    const action =
        Object.entries(QUICK_ACTIONS).find(([path]) => pathname.startsWith(path))?.[1] ||
        (pathname.startsWith("/admin/products") ? null : DEFAULT_ACTION);

    return (
        <header className="fixed top-0 right-0 left-0 lg:left-64 h-[72px] bg-surface border-b border-outline-variant flex items-center justify-between px-margin-mobile md:px-margin-desktop z-30 gap-4">
            <div className="flex items-center gap-4 flex-1 min-w-0">
                <button type="button" onClick={onMenuClick} className="lg:hidden text-on-surface-variant" aria-label="Open menu">
                    <Icon name="menu" />
                </button>
                <form onSubmit={handleSearch} className="relative w-full max-w-md hidden sm:block">
                    <Icon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]" />
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search analytics, users, or reports..."
                        className="w-full pl-10 pr-4 py-2 bg-surface-container-low border-none rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none"
                    />
                </form>
            </div>

            <div className="flex items-center gap-2 sm:gap-6 flex-shrink-0">
                <div className="flex items-center gap-2 sm:gap-4 text-on-surface-variant">
                    <button
                        type="button"
                        onClick={() => toast.info("No new notifications")}
                        className="hover:bg-surface-container-low p-2 rounded-full transition-all relative"
                        aria-label="Notifications"
                    >
                        <Icon name="notifications" />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full" />
                    </button>
                    <button
                        type="button"
                        onClick={() => toast.info("Help center is coming soon")}
                        className="hover:bg-surface-container-low p-2 rounded-full transition-all hidden sm:inline-flex"
                        aria-label="Help"
                    >
                        <Icon name="help" />
                    </button>
                </div>
                {action &&
                    (action.href ? (
                        <Link
                            href={action.href}
                            className="bg-primary hover:bg-on-primary-fixed-variant text-on-primary font-bold px-4 sm:px-6 py-2 rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap"
                        >
                            <Icon name={action.icon} className="text-[20px]" />
                            <span className="hidden sm:inline">{action.label}</span>
                        </Link>
                    ) : (
                        <button
                            type="button"
                            onClick={() => toast.info(action.onToast)}
                            className="bg-primary hover:bg-on-primary-fixed-variant text-on-primary font-bold px-4 sm:px-6 py-2 rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap"
                        >
                            <Icon name={action.icon} className="text-[20px]" />
                            <span className="hidden sm:inline">{action.label}</span>
                        </button>
                    ))}
            </div>
        </header>
    );
}