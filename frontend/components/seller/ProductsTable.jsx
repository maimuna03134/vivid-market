"use client";

import Link from "next/link";
import Icon from "@/components/ui/Icon";
import { formatPrice } from "@/lib/format";
import { stockLevel } from "@/lib/sellerProducts";

const STATUS = {
    approved: { label: "Approved", badge: "bg-[#E6F4EA] text-[#1E7E34]", dot: "bg-[#1E7E34]" },
    pending: { label: "Pending", badge: "bg-[#FFF4E5] text-[#B7791F]", dot: "bg-[#B7791F]" },
    rejected: { label: "Rejected", badge: "bg-[#FCE8E8] text-[#D73A49]", dot: "bg-[#D73A49]" }
};

const STOCK = {
    out: { label: "Out of Stock", number: "text-error", text: "text-error font-bold", warn: true },
    low: { label: "Low Stock", number: "text-error", text: "text-error font-bold", warn: true },
    sufficient: { label: "Sufficient", number: "text-secondary", text: "text-tertiary", warn: false },
    in: { label: "In Stock", number: "text-secondary", text: "text-tertiary", warn: false }
};

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

export default function ProductsTable({ products, page, totalPages, from, to, total, onPage, onDelete }) {
    const pageButton = "px-3 py-1.5 border border-outline-variant rounded-lg text-secondary hover:bg-surface-container-high transition-colors font-semibold text-body-sm flex items-center gap-1 disabled:opacity-40 disabled:cursor-not-allowed";

    return (
        <div className="bg-white rounded-xl shadow-sm border border-outline-variant overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[860px]">
                    <thead>
                        <tr className="bg-surface-container-low border-b border-outline-variant">
                            {["Thumbnail", "Name & SKU", "Category", "Price", "Stock", "Status", "Actions"].map((h, i) => (
                                <th
                                    key={h}
                                    className={`px-6 py-4 text-label-md text-on-surface-variant uppercase tracking-wider ${i === 0 ? "w-20" : ""
                                        } ${i === 6 ? "text-right" : ""}`}
                                >
                                    {h}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-outline-variant">
                        {products.map((p) => {
                            const status = STATUS[p.status] || STATUS.pending;
                            const stock = STOCK[stockLevel(p.stock)];
                            return (
                                <tr key={p.id} className="hover:bg-surface-container-low transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="w-12 h-12 rounded bg-surface-container-high overflow-hidden border border-outline-variant flex items-center justify-center">
                                            {p.image ? (
                                                // eslint-disable-next-line @next/next/no-img-element
                                                <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                                            ) : (
                                                <Icon name="image" className="text-outline-variant" />
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-body-md font-bold text-secondary">{p.name}</p>
                                        <p className="text-body-sm text-on-surface-variant">SKU: {p.sku}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="bg-surface-container-high text-secondary px-3 py-1 rounded-full text-body-sm whitespace-nowrap">
                                            {p.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-body-md font-bold text-secondary whitespace-nowrap">
                                        {formatPrice(p.price)}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className={`text-body-md font-semibold ${stock.number}`}>{p.stock}</span>
                                            <span className={`text-[11px] flex items-center gap-1 whitespace-nowrap ${stock.text}`}>
                                                {stock.warn && <Icon name="warning" className="text-[14px]" />}
                                                {stock.label}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-bold ${status.badge}`}
                                        >
                                            <span className={`w-2 h-2 rounded-full ${status.dot}`} />
                                            {status.label}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <Link
                                                href={`/seller/products/new?edit=${p.id}`}
                                                title="Edit"
                                                aria-label={`Edit ${p.name}`}
                                                className="p-2 text-secondary hover:bg-surface-container-high rounded-lg transition-colors"
                                            >
                                                <Icon name="edit" />
                                            </Link>
                                            <button
                                                type="button"
                                                onClick={() => onDelete(p)}
                                                title="Delete"
                                                aria-label={`Delete ${p.name}`}
                                                className="p-2 text-error hover:bg-error-container rounded-lg transition-colors"
                                            >
                                                <Icon name="delete" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="px-6 py-4 border-t border-outline-variant flex flex-col sm:flex-row items-center justify-between gap-stack-sm bg-white">
                <p className="text-body-sm text-on-surface-variant">
                    Showing {from} to {to} of {total} {total === 1 ? "entry" : "entries"}
                </p>
                {totalPages > 1 && (
                    <div className="flex items-center gap-1">
                        <button type="button" onClick={() => onPage(page - 1)} disabled={page === 1} className={pageButton}>
                            <Icon name="chevron_left" className="text-[18px]" /> Previous
                        </button>
                        {getPages(page, totalPages).map((p, i) =>
                            p === "..." ? (
                                <span key={`dots-${i}`} className="px-1">...</span>
                            ) : (
                                <button
                                    key={p}
                                    type="button"
                                    onClick={() => onPage(p)}
                                    className={`w-9 h-9 rounded-lg font-semibold text-body-sm flex items-center justify-center transition-colors ${p === page
                                            ? "bg-primary-container text-white font-bold"
                                            : "text-secondary hover:bg-surface-container-high"
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
                        >
                            Next <Icon name="chevron_right" className="text-[18px]" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}