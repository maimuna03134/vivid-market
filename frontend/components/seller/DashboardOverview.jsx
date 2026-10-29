"use client";

import StatCard from "@/components/shared/StatCard";
import SalesChart from "@/components/seller/SalesChart";
import RecentOrdersTable from "@/components/seller/RecentOrdersTable";
import Icon from "@/components/ui/Icon";
import { formatPrice } from "@/lib/format";
import { sellerProfile, sellerStats, salesChartData, recentOrders } from "@/constants/mockSeller";
import { toast } from "@/lib/toast";

export default function DashboardOverview() {
    const firstName = sellerProfile.name.split(" ")[0];

    return (
        <>
            {/* Welcome header */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-stack-md mb-8">
                <div>
                    <h2 className="text-headline-lg text-on-surface">Dashboard Overview</h2>
                    <p className="text-on-surface-variant text-body-md">
                        Welcome back, {firstName}. Here&apos;s what&apos;s happening with your store today.
                    </p>
                </div>
                <div className="flex gap-2">
                    <button
                        type="button"
                        onClick={() => toast.info("Date range filtering is coming soon")}
                        className="bg-surface-container-highest px-4 py-2 rounded-lg text-label-md flex items-center gap-2 text-on-surface-variant hover:bg-surface-dim transition-colors"
                    >
                        <Icon name="calendar_today" className="text-sm" />
                        Last 30 Days
                    </button>
                    <button
                        type="button"
                        onClick={() => toast.success("Report export will start shortly")}
                        className="bg-surface-container-highest px-4 py-2 rounded-lg text-label-md flex items-center gap-2 text-on-surface-variant hover:bg-surface-dim transition-colors"
                    >
                        <Icon name="download" className="text-sm" />
                        Export Report
                    </button>
                </div>
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter mb-8">
                <StatCard
                    icon="payments"
                    iconBg="bg-primary-fixed group-hover:bg-primary-container"
                    iconColor="text-primary group-hover:text-on-primary"
                    label="Total Sales"
                    value={formatPrice(sellerStats.totalSales)}
                    trend={{ value: `+${sellerStats.salesTrend}%`, positive: true }}
                />
                <StatCard
                    icon="shopping_cart"
                    iconBg="bg-secondary-fixed group-hover:bg-on-secondary-fixed-variant"
                    iconColor="text-secondary group-hover:text-on-primary"
                    label="Total Orders"
                    value={sellerStats.totalOrders}
                    trend={{ value: `+${sellerStats.ordersTrend}%`, positive: true }}
                />
                <StatCard
                    icon="pending_actions"
                    iconBg="bg-error-container group-hover:bg-error"
                    iconColor="text-error group-hover:text-on-error"
                    label="Pending Orders"
                    value={sellerStats.pendingOrders}
                />
                <StatCard
                    icon="inventory_2"
                    iconBg="bg-tertiary-fixed group-hover:bg-tertiary"
                    iconColor="text-on-tertiary-fixed-variant group-hover:text-on-tertiary"
                    label="Total Products"
                    value={sellerStats.totalProducts}
                />
            </div>

            {/* Sales chart */}
            <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-[0px_4px_20px_rgba(26,26,46,0.08)] mb-8 overflow-hidden">
                <div className="p-6 border-b border-outline-variant flex flex-col sm:flex-row justify-between sm:items-center gap-stack-sm">
                    <div>
                        <h3 className="text-headline-sm text-on-surface">30-Day Sales Performance</h3>
                        <p className="text-body-sm text-on-surface-variant">
                            Real-time sales tracking across your entire catalog
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-primary-container" />
                            <span className="text-label-md text-on-surface-variant">Current Period</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-outline-variant" />
                            <span className="text-label-md text-on-surface-variant">Previous Period</span>
                        </div>
                    </div>
                </div>
                <SalesChart
                    current={salesChartData.current}
                    previous={salesChartData.previous}
                    xLabels={salesChartData.xLabels}
                />
            </div>

            {/* Recent orders */}
            <RecentOrdersTable orders={recentOrders} />
        </>
    );
}