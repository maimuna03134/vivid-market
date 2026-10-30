"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Icon from "@/components/ui/Icon";
import OrdersTable from "@/components/seller/OrdersTable";
import OrderDetailsModal from "@/components/seller/OrderDetailsModal";
import { useSellerOrderStore } from "@/store/sellerOrderStore";
import { ORDER_TABS, filterOrdersByTab, computeOrderStats, STATUS_META } from "@/lib/sellerOrders";
import { formatPrice } from "@/lib/format";
import { toast } from "@/lib/toast";

const PAGE_SIZE = 8;

export default function OrderManagementView() {
    const orders = useSellerOrderStore((s) => s.orders);
    const updateStatus = useSellerOrderStore((s) => s.updateStatus);

    const [mounted, setMounted] = useState(false);
    const [tab, setTab] = useState("all");
    const [page, setPage] = useState(1);
    const [viewing, setViewing] = useState(null);

    // orders live in localStorage, so wait for the browser before showing them
    useEffect(() => setMounted(true), []);

    const stats = useMemo(() => computeOrderStats(orders), [orders]);
    const filtered = useMemo(() => filterOrdersByTab(orders, tab), [orders, tab]);

    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    const currentPage = Math.min(page, totalPages);
    const start = (currentPage - 1) * PAGE_SIZE;
    const visible = filtered.slice(start, start + PAGE_SIZE);

    function handleStatusChange(id, status) {
        updateStatus(id, status);
        toast.success(`Order #${id} marked as ${STATUS_META[status].label}`);
        // keep the open modal (if any) in sync with the change
        setViewing((v) => (v && v.id === id ? { ...v, status } : v));
    }

    return (
        <>
            {/* Breadcrumb + title */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-stack-lg">
                <div>
                    <nav className="flex items-center gap-2 text-on-surface-variant text-body-sm mb-2">
                        <span>Portal</span>
                        <Icon name="chevron_right" className="text-sm" />
                        <span className="text-primary font-bold">Orders</span>
                    </nav>
                    <h2 className="text-headline-lg text-on-surface">Order Management</h2>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={() => toast.success("CSV export will start shortly")}
                        className="px-4 py-2 bg-surface-container-highest text-on-surface font-bold rounded-lg flex items-center gap-2 hover:bg-outline-variant transition-colors"
                    >
                        <Icon name="download" />
                        <span>Export CSV</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => toast.success("Generating bulk invoices...")}
                        className="px-4 py-2 bg-on-secondary-fixed text-on-secondary font-bold rounded-lg flex items-center gap-2 hover:opacity-90 transition-opacity"
                    >
                        <Icon name="print" />
                        <span>Bulk Invoices</span>
                    </button>
                </div>
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter mb-stack-lg">
                <div className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant shadow-sm">
                    <p className="text-on-surface-variant text-label-md mb-2">Total Orders</p>
                    <div className="flex items-end justify-between">
                        <span className="text-headline-lg text-on-surface">{mounted ? stats.total.toLocaleString("en-US") : "–"}</span>
                        <span className="text-tertiary-container font-bold flex items-center text-body-sm">
                            <Icon name="trending_up" className="text-sm" /> 12%
                        </span>
                    </div>
                </div>
                <div className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant shadow-sm">
                    <p className="text-on-surface-variant text-label-md mb-2">Pending Fulfillment</p>
                    <div className="flex items-end justify-between">
                        <span className="text-headline-lg text-on-surface">{mounted ? stats.pending : "–"}</span>
                        {mounted && stats.pending > 0 && (
                            <span className="bg-primary-container/10 text-primary-container px-2 py-1 rounded text-[10px] font-bold">
                                ACTION REQ.
                            </span>
                        )}
                    </div>
                </div>
                <div className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant shadow-sm">
                    <p className="text-on-surface-variant text-label-md mb-2">Revenue (30d)</p>
                    <div className="flex items-end justify-between">
                        <span className="text-headline-lg text-on-surface">{mounted ? formatPrice(stats.revenue) : "–"}</span>
                        <span className="text-tertiary-container font-bold flex items-center text-body-sm">
                            <Icon name="trending_up" className="text-sm" /> 8%
                        </span>
                    </div>
                </div>
                <div className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant shadow-sm">
                    <p className="text-on-surface-variant text-label-md mb-2">Returns Rate</p>
                    <div className="flex items-end justify-between">
                        <span className="text-headline-lg text-on-surface">
                            {mounted ? `${stats.returnsRate.toFixed(1)}%` : "–"}
                        </span>
                        <span className="text-on-surface-variant font-bold text-body-sm">Stable</span>
                    </div>
                </div>
            </div>

            {/* Table with filters */}
            <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-[0px_4px_20px_rgba(26,26,46,0.08)] overflow-hidden">
                <div className="flex items-center justify-between px-6 border-b border-outline-variant overflow-x-auto">
                    <div className="flex gap-8 py-4">
                        {ORDER_TABS.map((t) => (
                            <button
                                key={t.key}
                                type="button"
                                onClick={() => {
                                    setTab(t.key);
                                    setPage(1);
                                }}
                                className={`relative font-bold pb-4 whitespace-nowrap transition-colors ${tab === t.key ? "text-primary" : "text-on-surface-variant hover:text-primary"
                                    }`}
                            >
                                {t.label}
                                {tab === t.key && (
                                    <span className="absolute bottom-0 left-0 w-full h-1 bg-primary-container rounded-t-full" />
                                )}
                            </button>
                        ))}
                    </div>
                    <button
                        type="button"
                        onClick={() => toast.info("Advanced filters are coming soon")}
                        className="flex items-center gap-2 text-body-sm font-bold text-on-surface-variant hover:text-on-surface whitespace-nowrap"
                    >
                        <Icon name="filter_alt" />
                        Advanced Filters
                    </button>
                </div>

                {!mounted ? (
                    <div className="h-96 animate-pulse bg-surface-container m-6 rounded-xl" />
                ) : visible.length > 0 ? (
                    <OrdersTable
                        orders={visible}
                        page={currentPage}
                        totalPages={totalPages}
                        from={start + 1}
                        to={start + visible.length}
                        total={filtered.length}
                        onPage={(p) => setPage(Math.min(totalPages, Math.max(1, p)))}
                        onStatusChange={handleStatusChange}
                        onView={setViewing}
                    />
                ) : (
                    <div className="flex flex-col items-center justify-center text-center py-20">
                        <Icon name="receipt_long" className="text-[64px] text-outline-variant" />
                        <h3 className="text-headline-sm text-on-secondary-fixed mt-4">No orders here</h3>
                        <p className="text-on-surface-variant mt-1">Orders with this status will show up here.</p>
                    </div>
                )}
            </div>

            {/* Tips */}
            <div className="mt-stack-lg grid grid-cols-1 md:grid-cols-2 gap-gutter">
                <div className="bg-primary-container/5 rounded-xl p-6 border border-primary-container/20 flex gap-4">
                    <div className="w-12 h-12 bg-primary-container rounded-lg flex items-center justify-center shrink-0">
                        <Icon name="local_shipping" className="text-on-primary" />
                    </div>
                    <div>
                        <h4 className="text-headline-sm text-primary mb-1">Fulfillment Tip</h4>
                        <p className="text-body-md text-on-surface-variant">
                            Orders marked as &quot;Shipped&quot; before 2 PM are more likely to receive a 5-star
                            rating for speed. Keep your labeling routine consistent for faster dispatch.
                        </p>
                    </div>
                </div>
                <div className="bg-tertiary-container/5 rounded-xl p-6 border border-tertiary-container/20 flex gap-4">
                    <div className="w-12 h-12 bg-tertiary-container rounded-lg flex items-center justify-center shrink-0">
                        <Icon name="insights" className="text-on-primary" />
                    </div>
                    <div>
                        <h4 className="text-headline-sm text-tertiary mb-1">Customer Insight</h4>
                        <p className="text-body-md text-on-surface-variant">
                            Repeat customers are your best source of reviews. Consider a &quot;Thank You&quot;
                            note or discount code in their next package to build loyalty.
                        </p>
                    </div>
                </div>
            </div>

            {/* Floating action button */}
            <button
                type="button"
                onClick={() => toast.info("Manual order creation is coming soon")}
                className="fixed bottom-8 right-8 w-14 h-14 bg-primary-container hover:bg-primary text-on-primary-container rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110 active:scale-95 group z-50"
                aria-label="Create manual order"
            >
                <Icon name="add" className="text-3xl group-hover:rotate-90 transition-transform duration-300" />
                <span className="absolute right-16 bg-on-secondary-fixed text-on-secondary text-xs px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                    Create Manual Order
                </span>
            </button>

            {viewing && (
                <OrderDetailsModal
                    order={viewing}
                    onClose={() => setViewing(null)}
                    onStatusChange={handleStatusChange}
                />
            )}
        </>
    );
}