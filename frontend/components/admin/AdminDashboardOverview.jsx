"use client";

import StatCard from "@/components/shared/StatCard";
import RevenueBarChart from "@/components/admin/RevenueBarChart";
import OrdersDonutChart from "@/components/admin/OrdersDonutChart";
import RecentTransactionsTable from "@/components/admin/RecentTransactionsTable";
import Icon from "@/components/ui/Icon";
import { formatPrice } from "@/lib/format";
import {
    adminStats,
    revenueChart,
    orderStatusBreakdown,
    totalActiveOrders,
    recentTransactions
} from "@/constants/mockAdmin";
import { toast } from "@/lib/toast";

export default function AdminDashboardOverview() {
    return (
        <>
            {/* Page header */}
            <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-stack-md">
                <div>
                    <h2 className="text-headline-lg text-on-surface">Workspace Overview</h2>
                    <p className="text-on-surface-variant">
                        Real-time performance metrics for Vivid Market global operations.
                    </p>
                </div>
                <div className="flex gap-2">
                    <button
                        type="button"
                        onClick={() => toast.info("Date range filtering is coming soon")}
                        className="bg-surface-container-highest px-4 py-2 rounded-lg text-label-md flex items-center gap-2 hover:bg-surface-dim transition-colors"
                    >
                        <Icon name="calendar_today" className="text-[18px]" />
                        Last 30 Days
                    </button>
                    <button
                        type="button"
                        onClick={() => toast.success("PDF export will start shortly")}
                        className="bg-on-secondary-fixed text-surface-container-lowest px-4 py-2 rounded-lg text-label-md flex items-center gap-2 hover:opacity-90 transition-opacity"
                    >
                        <Icon name="file_download" className="text-[18px]" />
                        Export PDF
                    </button>
                </div>
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-gutter">
                <StatCard
                    icon="group"
                    iconBg="bg-primary-fixed"
                    iconColor="text-primary"
                    label="Total Users"
                    value={adminStats.totalUsers.toLocaleString("en-US")}
                    trend={{ value: `+${adminStats.usersTrend}%`, positive: true }}
                    progress={{ value: adminStats.usersProgress, color: "bg-primary" }}
                />
                <StatCard
                    icon="storefront"
                    iconBg="bg-secondary-container"
                    iconColor="text-secondary"
                    label="Total Sellers"
                    value={adminStats.totalSellers.toLocaleString("en-US")}
                    trend={{ value: `+${adminStats.sellersTrend}%`, positive: true }}
                    progress={{ value: adminStats.sellersProgress, color: "bg-secondary" }}
                />
                <StatCard
                    icon="shopping_bag"
                    iconBg="bg-tertiary-fixed"
                    iconColor="text-tertiary"
                    label="Total Orders"
                    value={adminStats.totalOrders.toLocaleString("en-US")}
                    trend={{ value: `+${adminStats.ordersTrend}%`, positive: true }}
                    progress={{ value: adminStats.ordersProgress, color: "bg-tertiary" }}
                />
                <StatCard
                    icon="payments"
                    iconBg="bg-primary-container/10"
                    iconColor="text-primary-container"
                    label="Total Revenue"
                    value={formatPrice(adminStats.totalRevenue)}
                    trend={{ value: `+${adminStats.revenueTrend}%`, positive: true }}
                    progress={{ value: adminStats.revenueProgress, color: "bg-primary-container" }}
                />
            </div>

            {/* Analytics grid */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-gutter">
                <div className="xl:col-span-8 bg-surface-container-lowest p-8 rounded-xl border border-outline-variant shadow-[0px_4px_20px_rgba(26,26,46,0.08)]">
                    <div className="flex justify-between items-center mb-10 flex-wrap gap-4">
                        <div>
                            <h4 className="text-headline-sm">Monthly Revenue Growth</h4>
                            <p className="text-sm text-on-surface-variant">
                                Performance metrics compared to previous fiscal year
                            </p>
                        </div>
                        <div className="flex gap-4 items-center">
                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 bg-primary rounded-full" />
                                <span className="text-xs font-medium text-on-surface-variant">Current Year</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 bg-surface-container-highest rounded-full" />
                                <span className="text-xs font-medium text-on-surface-variant">Previous</span>
                            </div>
                        </div>
                    </div>
                    <RevenueBarChart months={revenueChart.months} current={revenueChart.current} previous={revenueChart.previous} />
                </div>

                <div className="xl:col-span-4 bg-surface-container-lowest p-8 rounded-xl border border-outline-variant shadow-[0px_4px_20px_rgba(26,26,46,0.08)] flex flex-col">
                    <h4 className="text-headline-sm mb-2">Orders by Status</h4>
                    <p className="text-sm text-on-surface-variant mb-8">Current distribution of pending tasks</p>
                    <OrdersDonutChart segments={orderStatusBreakdown} total={totalActiveOrders} />
                </div>

                <div className="xl:col-span-12">
                    <RecentTransactionsTable transactions={recentTransactions} />
                </div>
            </div>
        </>
    );
}