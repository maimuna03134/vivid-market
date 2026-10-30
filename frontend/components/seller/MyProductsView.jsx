"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Icon from "@/components/ui/Icon";
import ProductsTable from "@/components/seller/ProductsTable";
import { useSellerProductStore } from "@/store/sellerProductStore";
import { filterProducts, productStats } from "@/lib/sellerProducts";
import { toast } from "@/lib/toast";

const PAGE_SIZE = 6;

export default function MyProductsView() {
    const products = useSellerProductStore((s) => s.products);
    const removeProduct = useSellerProductStore((s) => s.removeProduct);

    const [mounted, setMounted] = useState(false);
    const [query, setQuery] = useState("");
    const [page, setPage] = useState(1);
    const [deleteTarget, setDeleteTarget] = useState(null);

    // products are saved in localStorage, so wait for the browser before showing them
    useEffect(() => setMounted(true), []);

    const stats = useMemo(() => productStats(products), [products]);
    const filtered = useMemo(() => filterProducts(products, query), [products, query]);

    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    const currentPage = Math.min(page, totalPages); // stays valid after deleting the last item on a page
    const start = (currentPage - 1) * PAGE_SIZE;
    const visible = filtered.slice(start, start + PAGE_SIZE);

    function confirmDelete() {
        removeProduct(deleteTarget.id);
        toast.success(`${deleteTarget.name} deleted`);
        setDeleteTarget(null);
    }

    const statCards = [
        { label: "Total Products", value: stats.total, badge: "+12%", color: "text-secondary" },
        { label: "Active Listings", value: stats.active, color: "text-secondary" },
        { label: "Out of Stock", value: stats.outOfStock, color: "text-error" },
        { label: "Pending Approval", value: stats.pending, color: "text-secondary" }
    ];

    return (
        <>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-stack-md mb-8">
                <div>
                    <h2 className="text-headline-lg text-on-surface">My Products</h2>
                    <p className="text-on-surface-variant text-body-md">Manage your listings, stock and approval status.</p>
                </div>
                <div className="relative w-full md:max-w-md">
                    <Icon
                        name="search"
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant"
                    />
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => {
                            setQuery(e.target.value);
                            setPage(1);
                        }}
                        placeholder="Search products, SKUs, or categories..."
                        className="w-full pl-10 pr-4 py-2.5 bg-white border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary-container focus:border-primary-container text-body-sm outline-none transition-all"
                    />
                </div>
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {statCards.map((c) => (
                    <div key={c.label} className="bg-white p-6 rounded-xl shadow-sm border border-outline-variant">
                        <p className="text-on-surface-variant text-label-md uppercase tracking-wider">{c.label}</p>
                        <div className="flex items-baseline gap-2 mt-2">
                            <span className={`text-[32px] font-bold ${c.color}`}>{mounted ? c.value : "–"}</span>
                            {c.badge && (
                                <span className="text-tertiary font-bold text-[12px] bg-tertiary-fixed px-1.5 py-0.5 rounded">
                                    {c.badge}
                                </span>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Table / empty states */}
            {!mounted ? (
                <div className="h-96 bg-surface-container rounded-xl animate-pulse" />
            ) : filtered.length > 0 ? (
                <ProductsTable
                    products={visible}
                    page={currentPage}
                    totalPages={totalPages}
                    from={start + 1}
                    to={start + visible.length}
                    total={filtered.length}
                    onPage={(p) => setPage(Math.min(totalPages, Math.max(1, p)))}
                    onDelete={setDeleteTarget}
                />
            ) : (
                <div className="flex flex-col items-center justify-center text-center py-20 bg-white border border-outline-variant rounded-xl">
                    <Icon name="inventory_2" className="text-[64px] text-outline-variant" />
                    <h3 className="text-headline-sm text-on-secondary-fixed mt-4">
                        {products.length === 0 ? "No products yet" : "No products match your search"}
                    </h3>
                    <p className="text-on-surface-variant mt-1">
                        {products.length === 0
                            ? "Add your first product to start selling."
                            : "Try a different name, SKU or category."}
                    </p>
                    {products.length === 0 && (
                        <Link
                            href="/seller/products/new"
                            className="mt-6 bg-primary-container text-white font-bold px-6 py-3 rounded-lg hover:opacity-90"
                        >
                            Add Product
                        </Link>
                    )}
                </div>
            )}

            {/* Delete confirmation */}
            {deleteTarget && (
                <div
                    role="dialog"
                    aria-modal="true"
                    className="fixed inset-0 z-[60] flex items-center justify-center p-margin-mobile bg-black/50"
                    onClick={() => setDeleteTarget(null)}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="bg-white rounded-xl shadow-xl w-full max-w-sm p-stack-lg text-center"
                    >
                        <Icon name="delete" className="text-error text-[40px]" />
                        <h3 className="text-headline-sm text-on-secondary-fixed mt-stack-sm">Delete this product?</h3>
                        <p className="text-body-sm text-on-surface-variant mt-1">
                            {deleteTarget.name} will be removed from your listings. This cannot be undone.
                        </p>
                        <div className="flex justify-center gap-stack-sm mt-stack-lg">
                            <button
                                type="button"
                                onClick={() => setDeleteTarget(null)}
                                className="px-6 py-3 rounded-lg font-bold text-label-md border border-outline-variant text-on-surface hover:bg-surface-container transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={confirmDelete}
                                className="px-6 py-3 rounded-lg font-bold text-label-md bg-error text-white hover:opacity-90 transition-all"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}