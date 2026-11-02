"use client";

import { useEffect, useMemo, useState } from "react";
import Icon from "@/components/ui/Icon";
import ProductApprovalCard from "@/components/admin/ProductApprovalCard";
import ProductApprovalModal from "@/components/admin/ProductApprovalModal";
import { useSellerProductStore } from "@/store/sellerProductStore";
import { pendingProducts, sortByDate } from "@/lib/adminProducts";
import { toast } from "@/lib/toast";

export default function ProductApprovalView() {
    const products = useSellerProductStore((s) => s.products);
    const updateProduct = useSellerProductStore((s) => s.updateProduct);

    const [mounted, setMounted] = useState(false);
    const [sortOrder, setSortOrder] = useState("newest");
    const [viewing, setViewing] = useState(null);

    // products live in localStorage, so wait for the browser before showing them
    useEffect(() => setMounted(true), []);

    const queue = useMemo(
        () => sortByDate(pendingProducts(products), sortOrder),
        [products, sortOrder]
    );

    function handleApprove(product) {
        updateProduct(product.id, { status: "approved" });
        toast.success(`${product.name} approved`);
        setViewing(null);
    }

    function handleReject(product) {
        updateProduct(product.id, { status: "rejected" });
        toast.success(`${product.name} rejected`);
        setViewing(null);
    }

    return (
        <>
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <p className="text-body-sm text-on-surface-variant mb-1">Queue Management</p>
                    <h3 className="text-headline-md text-on-surface">Pending Review ({mounted ? queue.length : "–"})</h3>
                </div>
                <div className="flex gap-2">
                    <button
                        type="button"
                        onClick={() => toast.info("Filtering is coming soon")}
                        className="flex items-center gap-2 px-4 py-2 bg-white border border-outline-variant rounded-lg text-body-sm font-medium hover:bg-surface-container-low transition-all"
                    >
                        <Icon name="filter_list" className="text-[18px]" />
                        Filter
                    </button>
                    <button
                        type="button"
                        onClick={() => setSortOrder((o) => (o === "newest" ? "oldest" : "newest"))}
                        className="flex items-center gap-2 px-4 py-2 bg-white border border-outline-variant rounded-lg text-body-sm font-medium hover:bg-surface-container-low transition-all"
                    >
                        <Icon name="sort" className="text-[18px]" />
                        {sortOrder === "newest" ? "Newest First" : "Oldest First"}
                    </button>
                </div>
            </div>

            {!mounted ? (
                <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-96 bg-surface-container rounded-xl animate-pulse" />
                    ))}
                </div>
            ) : queue.length > 0 ? (
                <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-6">
                    {queue.map((product) => (
                        <ProductApprovalCard
                            key={product.id}
                            product={product}
                            onView={setViewing}
                            onApprove={handleApprove}
                            onReject={handleReject}
                        />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center text-center py-20 bg-white border border-outline-variant rounded-xl">
                    <Icon name="task_alt" className="text-[64px] text-tertiary" />
                    <h3 className="text-headline-sm text-on-secondary-fixed mt-4">All caught up!</h3>
                    <p className="text-on-surface-variant mt-1">No products are waiting for review right now.</p>
                </div>
            )}

            {viewing && (
                <ProductApprovalModal
                    product={viewing}
                    onClose={() => setViewing(null)}
                    onApprove={handleApprove}
                    onReject={handleReject}
                />
            )}
        </>
    );
}