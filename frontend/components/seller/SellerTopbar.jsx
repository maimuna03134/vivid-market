"use client";

import { useState } from "react";
import Link from "next/link";
import Icon from "@/components/ui/Icon";
import { toast } from "@/lib/toast";

export default function SellerTopbar({ onMenuClick }) {
    const [query, setQuery] = useState("");

    function handleSearch(e) {
        e.preventDefault();
        if (query.trim()) toast.info(`Searching "${query.trim()}" is coming soon`);
    }

    return (
        <header className="fixed top-0 right-0 left-0 lg:left-64 h-[72px] bg-surface border-b border-outline-variant flex justify-between items-center px-margin-mobile md:px-margin-desktop z-30 gap-4">
            <div className="flex items-center gap-4 flex-1 min-w-0">
                <button type="button" onClick={onMenuClick} className="lg:hidden text-on-surface-variant" aria-label="Open menu">
                    <Icon name="menu" />
                </button>
                <form onSubmit={handleSearch} className="relative w-full max-w-md hidden sm:block">
                    <Icon
                        name="search"
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant opacity-60 text-[20px]"
                    />
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search orders, products, or customers..."
                        className="w-full bg-surface-container-low border border-outline-variant rounded-xl pl-10 pr-4 py-2 text-body-sm focus:ring-2 focus:ring-primary-container focus:border-primary-container transition-all outline-none"
                    />
                </form>
            </div>

            <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
                <button
                    type="button"
                    onClick={() => toast.info("No new notifications")}
                    className="hover:bg-surface-container transition-colors p-2 rounded-full relative"
                    aria-label="Notifications"
                >
                    <Icon name="notifications" className="text-on-surface-variant" />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-primary-container rounded-full ring-2 ring-surface" />
                </button>
                <Link
                    href="/seller/products/new"
                    className="flex items-center gap-2 bg-primary-container text-white px-3 sm:px-4 py-2 rounded-xl text-label-md hover:brightness-110 active:scale-95 transition-all whitespace-nowrap"
                >
                    <Icon name="add" className="text-sm" />
                    <span className="hidden sm:inline">Add Product</span>
                </Link>
            </div>
        </header>
    );
}