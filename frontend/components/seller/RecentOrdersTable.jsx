"use client";

import { useState } from "react";
import Link from "next/link";
import Icon from "@/components/ui/Icon";
import { formatPrice, formatDate } from "@/lib/format";
import { toast } from "@/lib/toast";

const PAGE_SIZE = 5;

const STATUS = {
    processing: "bg-yellow-100 text-yellow-800",
    shipped: "bg-blue-100 text-blue-800",
    delivered: "bg-[#E8F5E9] text-[#2ECC71]",
    cancelled: "bg-red-100 text-red-800"
};

export default function RecentOrdersTable({ orders }) {
    const [page, setPage] = useState(1);
    const [openMenu, setOpenMenu] = useState(null);

    const totalPages = Math.max(1, Math.ceil(orders.length / PAGE_SIZE));
    const start = (page - 1) * PAGE_SIZE;
    const visible = orders.slice(start, start + PAGE_SIZE);

    function goTo(p) {
        setPage(Math.min(totalPages, Math.max(1, p)));
        setOpenMenu(null);
    }

    return (
        <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-[0px_4px_20px_rgba(26,26,46,0.08)] overflow-hidden">
            <div className="p-6 border-b border-outline-variant flex justify-between items-center">
                <h3 className="text-headline-sm text-on-surface">Recent Orders</h3>
                <Link href="/seller/orders" className="text-primary text-label-md hover:underline">
                    View All Orders
                </Link>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left min-w-[640px]">
                    <thead className="bg-surface-container-low">
                        <tr>
                            {["Order ID", "Customer", "Date", "Status", "Amount", "Action"].map((h) => (
                                <th key={h} className="px-6 py-4 text-label-md text-on-surface-variant uppercase tracking-wider">
                                    {h}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-outline-variant">
                        {visible.map((order) => (
                            <tr key={order.id} className="hover:bg-surface-container transition-colors relative">
                                <td className="px-6 py-4 text-body-sm text-primary font-medium">#{order.id}</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div
                                            className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0 ${order.avatarStyle}`}
                                        >
                                            {order.initials}
                                        </div>
                                        <span className="text-body-sm whitespace-nowrap">{order.customer}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-body-sm text-on-surface-variant whitespace-nowrap">
                                    {formatDate(order.date)}
                                </td>
                                <td className="px-6 py-4">
                                    <span
                                        className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${STATUS[order.status]}`}
                                    >
                                        {order.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-body-sm font-semibold whitespace-nowrap">
                                    {formatPrice(order.amount)}
                                </td>
                                <td className="px-6 py-4 relative">
                                    <button
                                        type="button"
                                        onClick={() => setOpenMenu(openMenu === order.id ? null : order.id)}
                                        className="p-2 rounded-lg hover:bg-outline-variant text-on-surface-variant"
                                        aria-label="Order actions"
                                    >
                                        <Icon name="more_vert" className="text-xl" />
                                    </button>
                                    {openMenu === order.id && (
                                        <div className="absolute right-6 top-12 z-10 bg-white border border-outline-variant rounded-lg shadow-lg py-1 w-40">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    toast.info("Order details page is coming soon");
                                                    setOpenMenu(null);
                                                }}
                                                className="w-full text-left px-4 py-2 text-body-sm hover:bg-surface-container"
                                            >
                                                View Details
                                            </button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {totalPages > 1 && (
                <div className="p-4 bg-surface-container-low flex justify-center">
                    <nav className="flex gap-1">
                        <button
                            type="button"
                            onClick={() => goTo(page - 1)}
                            disabled={page === 1}
                            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-dim transition-colors text-on-surface-variant disabled:opacity-40 disabled:cursor-not-allowed"
                            aria-label="Previous page"
                        >
                            <Icon name="chevron_left" className="text-sm" />
                        </button>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                            <button
                                key={p}
                                type="button"
                                onClick={() => goTo(p)}
                                className={`w-8 h-8 flex items-center justify-center rounded-lg text-label-md transition-colors ${p === page
                                        ? "bg-primary-container text-white"
                                        : "hover:bg-surface-dim text-on-surface-variant"
                                    }`}
                            >
                                {p}
                            </button>
                        ))}
                        <button
                            type="button"
                            onClick={() => goTo(page + 1)}
                            disabled={page === totalPages}
                            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-dim transition-colors text-on-surface-variant disabled:opacity-40 disabled:cursor-not-allowed"
                            aria-label="Next page"
                        >
                            <Icon name="chevron_right" className="text-sm" />
                        </button>
                    </nav>
                </div>
            )}
        </div>
    );
}