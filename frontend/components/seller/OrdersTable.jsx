"use client";

import Icon from "@/components/ui/Icon";
import { formatPrice, formatDate } from "@/lib/format";
import { orderTotals } from "@/lib/sellerOrders";
import OrderStatusSelect from "@/components/seller/OrderStatusSelect";

// 1 2 3 ... 12 (always shows first, last and the pages around the current one)
function getPages(current, total) {
    if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);
    const keep = [...new Set([1, total, current - 1, current, current + 1])]
        .filter((p) => p >= 1 && p <= total)
        .sort((a, b) => a - b);
    const out = [];
    keep.forEach((p, i) => {
        if (i > 0 && p - keep[i - 1] > 1) out.push("...");
        out.push(p);
    });
    return out;
}

export default function OrdersTable({ orders, page, totalPages, from, to, total, onPage, onStatusChange, onView }) {
    const pageButton =
        "p-2 rounded-lg hover:bg-outline-variant transition-colors disabled:opacity-30 disabled:cursor-not-allowed";

    return (
        <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-[0px_4px_20px_rgba(26,26,46,0.08)] overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[960px]">
                    <thead>
                        <tr className="bg-surface-container-low">
                            {["Order ID", "Customer", "Product(s)", "Qty", "Total", "Status", "Date", "Actions"].map((h, i) => (
                                <th
                                    key={h}
                                    className={`px-6 py-4 text-label-md text-on-surface-variant uppercase tracking-wider ${i === 3 ? "text-center" : i === 7 ? "text-right" : ""
                                        }`}
                                >
                                    {h}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-outline-variant">
                        {orders.map((order) => {
                            const { qty, amount } = orderTotals(order);
                            const first = order.items[0];
                            const extra = order.items.length - 1;
                            return (
                                <tr key={order.id} className="hover:bg-surface-container/50 transition-colors">
                                    <td className="px-6 py-5">
                                        <span className="font-bold text-primary">#{order.id}</span>
                                    </td>
                                    <td className="px-6 py-5">
                                        <p className="font-bold text-on-surface">{order.customerName}</p>
                                        <p className="text-body-sm text-on-surface-variant">{order.customerEmail}</p>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded border border-outline-variant overflow-hidden shrink-0 bg-surface-container flex items-center justify-center">
                                                {first.image ? (
                                                    // eslint-disable-next-line @next/next/no-img-element
                                                    <img src={first.image} alt={first.name} className="w-full h-full object-cover" />
                                                ) : (
                                                    <Icon name="image" className="text-outline-variant text-[18px]" />
                                                )}
                                            </div>
                                            <span className="text-body-md font-medium truncate max-w-[150px]">{first.name}</span>
                                            {extra > 0 && (
                                                <span className="text-label-md text-on-surface-variant whitespace-nowrap">
                                                    +{extra} more
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 text-center font-medium">{qty}</td>
                                    <td className="px-6 py-5">
                                        <span className="font-bold text-on-surface">{formatPrice(amount)}</span>
                                    </td>
                                    <td className="px-6 py-5">
                                        <OrderStatusSelect
                                            value={order.status}
                                            onChange={(status) => onStatusChange(order.id, status)}
                                            label={`Status for order ${order.id}`}
                                        />
                                    </td>
                                    <td className="px-6 py-5 text-on-surface-variant text-body-sm whitespace-nowrap">
                                        {formatDate(order.date)}
                                    </td>
                                    <td className="px-6 py-5 text-right">
                                        <button
                                            type="button"
                                            onClick={() => onView(order)}
                                            aria-label={`View order ${order.id}`}
                                            className="p-2 text-on-surface-variant hover:text-primary hover:bg-primary/5 rounded-lg transition-all"
                                        >
                                            <Icon name="visibility" />
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            <div className="px-6 py-4 bg-surface-container-low flex flex-col sm:flex-row items-center justify-between gap-stack-sm">
                <p className="text-body-sm text-on-surface-variant font-medium">
                    Showing <span className="font-bold text-on-surface">{from}-{to}</span> of{" "}
                    <span className="font-bold text-on-surface">{total}</span> orders
                </p>
                {totalPages > 1 && (
                    <div className="flex items-center gap-1">
                        <button
                            type="button"
                            onClick={() => onPage(page - 1)}
                            disabled={page === 1}
                            className={pageButton}
                            aria-label="Previous page"
                        >
                            <Icon name="chevron_left" />
                        </button>
                        {getPages(page, totalPages).map((p, i) =>
                            p === "..." ? (
                                <span key={`dots-${i}`} className="px-2">...</span>
                            ) : (
                                <button
                                    key={p}
                                    type="button"
                                    onClick={() => onPage(p)}
                                    className={`w-10 h-10 rounded-lg font-bold transition-colors ${p === page
                                            ? "bg-primary-container text-on-primary-container shadow-sm"
                                            : "hover:bg-outline-variant"
                                        }`}
                                >
                                    {p}
                                </button>
                            )
                        )}
                        <button
                            type="button"
                            onClick={() => onPage(page + 1)}
                            disabled={page === totalPages}
                            className={pageButton}
                            aria-label="Next page"
                        >
                            <Icon name="chevron_right" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}