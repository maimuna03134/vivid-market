"use client";

import { useState } from "react";
import Icon from "@/components/ui/Icon";
import { formatPrice } from "@/lib/format";
import { TXN_STATUS } from "@/lib/admin/dashboard";
import { toast } from "@/lib/toast";

export default function RecentTransactionsTable({ transactions }) {
    const [openMenu, setOpenMenu] = useState(null);

    return (
        <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-[0px_4px_20px_rgba(26,26,46,0.08)] overflow-hidden">
            <div className="p-6 border-b border-outline-variant flex justify-between items-center">
                <h4 className="text-headline-sm text-on-surface">Recent Transactions</h4>
                <button
                    type="button"
                    onClick={() => toast.info("Full order management is coming soon")}
                    className="text-primary font-bold text-sm hover:underline"
                >
                    View All Orders
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[720px]">
                    <thead className="bg-surface-container-low">
                        <tr>
                            {["Order ID", "Customer", "Product", "Amount", "Status", "Action"].map((h) => (
                                <th key={h} className="px-6 py-4 text-label-md text-on-surface-variant uppercase">
                                    {h}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-outline-variant">
                        {transactions.map((t) => {
                            const status = TXN_STATUS[t.status];
                            return (
                                <tr key={t.id} className="hover:bg-surface-container-low transition-colors relative">
                                    <td className="px-6 py-4 font-medium text-on-surface">#{t.id}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div
                                                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${t.avatarStyle}`}
                                            >
                                                {t.initials}
                                            </div>
                                            <span className="whitespace-nowrap">{t.customer}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-on-surface-variant whitespace-nowrap">{t.product}</td>
                                    <td className="px-6 py-4 font-bold whitespace-nowrap">{formatPrice(t.amount)}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap ${status.pill}`}>
                                            {status.label}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 relative">
                                        <button
                                            type="button"
                                            onClick={() => setOpenMenu(openMenu === t.id ? null : t.id)}
                                            className="p-2 hover:bg-surface-dim rounded-lg transition-colors"
                                            aria-label="Transaction actions"
                                        >
                                            <Icon name="more_vert" className="text-sm" />
                                        </button>
                                        {openMenu === t.id && (
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
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}