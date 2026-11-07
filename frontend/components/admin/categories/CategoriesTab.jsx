"use client";

import { useState } from "react";
import Icon from "@/components/ui/Icon";
import { CATEGORY_STATUS } from "@/lib/admin/categories";

const PAGE_SIZE = 5;

export default function CategoriesTab({ categories, onEdit, onDelete }) {
    const [page, setPage] = useState(1);
    const totalPages = Math.max(1, Math.ceil(categories.length / PAGE_SIZE));
    const currentPage = Math.min(page, totalPages);
    const start = (currentPage - 1) * PAGE_SIZE;
    const visible = categories.slice(start, start + PAGE_SIZE);

    return (
        <div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden border border-outline-variant">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-surface-container text-label-md font-bold text-on-surface-variant uppercase tracking-wider">
                        <tr>
                            <th className="px-6 py-4">Image</th>
                            <th className="px-6 py-4">Category Name</th>
                            <th className="px-6 py-4">Product Count</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-outline-variant">
                        {visible.map((cat) => {
                            const status = CATEGORY_STATUS[cat.status];
                            return (
                                <tr key={cat.id} className="hover:bg-surface-container-low transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="w-16 h-16 rounded-lg overflow-hidden border border-outline-variant bg-surface-container flex items-center justify-center">
                                            {cat.image ? (
                                                // eslint-disable-next-line @next/next/no-img-element
                                                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
                                            ) : (
                                                <Icon name="category" className="text-outline-variant" />
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-bold text-on-surface">{cat.name}</td>
                                    <td className="px-6 py-4 text-on-surface-variant">
                                        {cat.productCount.toLocaleString("en-US")} items
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${status.badge}`}>
                                            {status.label}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right space-x-2">
                                        <button
                                            type="button"
                                            onClick={() => onEdit(cat)}
                                            aria-label={`Edit ${cat.name}`}
                                            className="p-2 text-on-surface-variant hover:text-primary hover:bg-primary-fixed rounded-lg transition-all"
                                        >
                                            <Icon name="edit" className="text-sm" />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => onDelete(cat)}
                                            aria-label={`Delete ${cat.name}`}
                                            className="p-2 text-on-surface-variant hover:text-error hover:bg-error-container rounded-lg transition-all"
                                        >
                                            <Icon name="delete" className="text-sm" />
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            <div className="p-4 bg-surface-container-low border-t border-outline-variant flex justify-between items-center">
                <p className="text-body-sm text-on-surface-variant">
                    Showing {visible.length} of {categories.length} categories
                </p>
                <div className="flex space-x-2">
                    <button
                        type="button"
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2 bg-surface-container-lowest border border-outline-variant rounded text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        Previous
                    </button>
                    <button
                        type="button"
                        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 bg-primary text-on-primary rounded font-bold hover:opacity-90 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}