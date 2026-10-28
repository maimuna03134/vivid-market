"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Icon from "@/components/ui/Icon";
import OrderCard from "@/components/customer/OrderCard";
import { useOrderStore } from "@/store/orderStore";
import { ORDER_TABS, getAllOrders, statusKey } from "@/lib/orders";

export default function OrdersView() {
    const savedOrders = useOrderStore((s) => s.orders);
    const [mounted, setMounted] = useState(false);
    const [tab, setTab] = useState("all");

    // orders are saved in localStorage, so wait for the browser before showing them
    useEffect(() => setMounted(true), []);

    const orders = useMemo(() => getAllOrders(savedOrders), [savedOrders]);
    const visible = tab === "all" ? orders : orders.filter((o) => statusKey(o) === tab);
    const tabLabel = ORDER_TABS.find((t) => t.key === tab)?.label.toLowerCase();

    return (
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg">
            <header className="mb-stack-lg">
                <h1 className="text-headline-lg text-secondary mb-stack-sm">My Orders</h1>
                <p className="text-on-surface-variant text-body-md">
                    Check the status of your recent orders and manage your returns.
                </p>
            </header>

            {/* Filter tabs */}
            <div className="flex overflow-x-auto hide-scrollbar pb-4 mb-stack-lg gap-stack-md">
                {ORDER_TABS.map((t) => (
                    <button
                        key={t.key}
                        type="button"
                        onClick={() => setTab(t.key)}
                        className={`px-gutter py-stack-sm rounded-full text-label-md transition-all active:scale-95 whitespace-nowrap ${tab === t.key
                                ? "bg-primary-container text-white"
                                : "bg-white border border-outline-variant text-on-surface hover:border-primary"
                            }`}
                    >
                        {t.label}
                    </button>
                ))}
            </div>

            {/* Orders */}
            {!mounted ? (
                <div className="flex flex-col gap-gutter animate-pulse">
                    <div className="h-56 bg-surface-container rounded-xl" />
                    <div className="h-56 bg-surface-container rounded-xl" />
                </div>
            ) : visible.length > 0 ? (
                <div className="flex flex-col gap-gutter">
                    {visible.map((order) => (
                        <OrderCard key={order.id} order={order} />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center text-center py-20 bg-white border border-outline-variant rounded-xl">
                    <Icon name="inventory_2" className="text-[64px] text-outline-variant" />
                    <h3 className="text-headline-sm text-on-secondary-fixed mt-4">
                        {tab === "all" ? "No orders yet" : `No ${tabLabel} orders`}
                    </h3>
                    <p className="text-on-surface-variant mt-1">
                        {tab === "all" ? "When you place an order, it will show up here." : "Orders with this status will show up here."}
                    </p>
                    <Link
                        href="/products"
                        className="mt-6 bg-primary-container text-on-primary-container font-bold px-6 py-3 rounded-lg hover:opacity-90"
                    >
                        Start Shopping
                    </Link>
                </div>
            )}
        </div>
    );
}