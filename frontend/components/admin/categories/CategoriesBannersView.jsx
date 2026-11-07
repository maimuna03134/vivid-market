"use client";

import { useEffect, useState } from "react";
import Icon from "@/components/ui/Icon";
import CategoriesTab from "@/components/admin/categories/CategoriesTab";
import BannersTab from "@/components/admin/categories/BannersTab";
import CategoryFormModal from "@/components/admin/categories/CategoryFormModal";
import BannerFormModal from "@/components/admin/categories/BannerFormModal";
import { useCatalogStore } from "@/store/admin/catalogStore";
import { toast } from "@/lib/toast";

const TABS = [
    { key: "categories", label: "Categories" },
    { key: "banners", label: "Banners" }
];

export default function CategoriesBannersView() {
    const categories = useCatalogStore((s) => s.categories);
    const banners = useCatalogStore((s) => s.banners);
    const addCategory = useCatalogStore((s) => s.addCategory);
    const updateCategory = useCatalogStore((s) => s.updateCategory);
    const removeCategory = useCatalogStore((s) => s.removeCategory);
    const addBanner = useCatalogStore((s) => s.addBanner);
    const updateBanner = useCatalogStore((s) => s.updateBanner);
    const removeBanner = useCatalogStore((s) => s.removeBanner);
    const setBannerStatus = useCatalogStore((s) => s.setBannerStatus);
    const reorderActiveBanner = useCatalogStore((s) => s.reorderActiveBanner);

    const [mounted, setMounted] = useState(false);
    const [tab, setTab] = useState("categories");
    const [categoryModal, setCategoryModal] = useState(null); // null closed, {} = new, {...cat} = editing
    const [bannerModal, setBannerModal] = useState(null);
    const [deleteTarget, setDeleteTarget] = useState(null); // { type: "category" | "banner", item }

    useEffect(() => setMounted(true), []);

    function handleSaveCategory(data) {
        if (categoryModal?.id) {
            updateCategory(categoryModal.id, data);
            toast.success("Category updated");
        } else {
            addCategory(data);
            toast.success("Category added");
        }
        setCategoryModal(null);
    }

    function handleSaveBanner(data) {
        if (bannerModal?.id) {
            updateBanner(bannerModal.id, data);
            toast.success("Banner updated");
        } else {
            addBanner(data);
            toast.success("Banner added");
        }
        setBannerModal(null);
    }

    function handleToggleBannerStatus(banner, status) {
        setBannerStatus(banner.id, status);
        toast.success(`${banner.title} ${status === "active" ? "enabled" : "disabled"}`);
    }

    function confirmDelete() {
        if (deleteTarget.type === "category") {
            removeCategory(deleteTarget.item.id);
            toast.success(`${deleteTarget.item.name} deleted`);
        } else {
            removeBanner(deleteTarget.item.id);
            toast.success(`${deleteTarget.item.title} removed`);
        }
        setDeleteTarget(null);
    }

    return (
        <>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                    <h2 className="text-headline-lg text-on-surface">Categories & Banners</h2>
                    <p className="text-on-surface-variant">Manage your storefront's catalog structure and promotions.</p>
                </div>
                {tab === "categories" ? (
                    <button
                        type="button"
                        onClick={() => setCategoryModal({})}
                        className="flex items-center gap-2 bg-primary text-on-primary font-bold px-5 py-2.5 rounded-lg hover:opacity-90 transition-all"
                    >
                        <Icon name="add" className="text-[18px]" />
                        Add Category
                    </button>
                ) : (
                    <button
                        type="button"
                        onClick={() => setBannerModal({})}
                        className="flex items-center gap-2 bg-primary text-on-primary font-bold px-5 py-2.5 rounded-lg hover:opacity-90 transition-all"
                    >
                        <Icon name="add" className="text-[18px]" />
                        Add Banner
                    </button>
                )}
            </div>

            <div className="flex gap-6 border-b border-outline-variant mb-6">
                {TABS.map((t) => (
                    <button
                        key={t.key}
                        type="button"
                        onClick={() => setTab(t.key)}
                        className={`relative font-bold pb-3 transition-colors ${tab === t.key ? "text-primary" : "text-on-surface-variant hover:text-on-surface"
                            }`}
                    >
                        {t.label}
                        {tab === t.key && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary" />}
                    </button>
                ))}
            </div>

            {!mounted ? (
                <div className="h-96 bg-surface-container rounded-xl animate-pulse" />
            ) : tab === "categories" ? (
                <CategoriesTab
                    categories={categories}
                    onEdit={setCategoryModal}
                    onDelete={(cat) => setDeleteTarget({ type: "category", item: cat })}
                />
            ) : (
                <BannersTab
                    banners={banners}
                    onAdd={() => setBannerModal({})}
                    onEdit={setBannerModal}
                    onRemove={(b) => setDeleteTarget({ type: "banner", item: b })}
                    onToggleStatus={handleToggleBannerStatus}
                    onReorder={reorderActiveBanner}
                />
            )}

            {categoryModal && (
                <CategoryFormModal
                    editing={categoryModal.id ? categoryModal : null}
                    onSave={handleSaveCategory}
                    onClose={() => setCategoryModal(null)}
                />
            )}

            {bannerModal && (
                <BannerFormModal
                    editing={bannerModal.id ? bannerModal : null}
                    onSave={handleSaveBanner}
                    onClose={() => setBannerModal(null)}
                />
            )}

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
                        <h3 className="text-headline-sm text-on-secondary-fixed mt-stack-sm">
                            Delete this {deleteTarget.type}?
                        </h3>
                        <p className="text-body-sm text-on-surface-variant mt-1">
                            {deleteTarget.type === "category" ? deleteTarget.item.name : deleteTarget.item.title} will be
                            removed. This cannot be undone.
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