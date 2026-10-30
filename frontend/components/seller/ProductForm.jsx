"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Icon from "@/components/ui/Icon";
import ProductMediaUploader from "@/components/seller/ProductMediaUploader";
import ProductVariants from "@/components/seller/ProductVariants";
import { useSellerProductStore } from "@/store/sellerProductStore";
import { SELLER_CATEGORIES } from "@/lib/sellerProducts";
import { productSchema, buildProductPayload } from "@/lib/sellerProductForm";
import { toast } from "@/lib/toast";

const inputClass =
    "w-full h-12 bg-surface px-4 border rounded focus:border-primary-container focus:ring-2 focus:ring-primary-container/20 transition-all outline-none";
const fieldClass = (hasError) => `${inputClass} ${hasError ? "border-error" : "border-outline-variant"}`;

const STATUS_NOTE = {
    draft: "Saved as draft — not yet visible to shoppers.",
    pending: "Pending admin approval.",
    approved: "Live on the marketplace.",
    rejected: "Rejected by admin — edit and resubmit for approval."
};

export default function ProductForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const editId = searchParams.get("edit");

    const products = useSellerProductStore((s) => s.products);
    const addProduct = useSellerProductStore((s) => s.addProduct);
    const updateProduct = useSellerProductStore((s) => s.updateProduct);

    const [mounted, setMounted] = useState(false);
    const [images, setImages] = useState([]);
    const [variants, setVariants] = useState([]);

    // products live in localStorage, so wait for the browser before reading them
    useEffect(() => setMounted(true), []);

    const existing = mounted && editId ? products.find((p) => p.id === editId) : null;
    const notFound = mounted && editId && !existing;

    const {
        register,
        handleSubmit,
        getValues,
        reset,
        formState: { errors, isSubmitting }
    } = useForm({
        resolver: zodResolver(productSchema),
        defaultValues: {
            name: "",
            description: "",
            category: SELLER_CATEGORIES[0],
            sku: "",
            price: "",
            stock: "",
            tags: "",
            featured: false,
            bulkDiscount: false
        }
    });

    // once the existing product loads, fill the form with it
    useEffect(() => {
        if (!existing) return;
        reset({
            name: existing.name,
            description: existing.description || "",
            category: existing.category,
            sku: existing.sku,
            price: existing.price,
            stock: existing.stock,
            tags: (existing.tags || []).join(", "),
            featured: !!existing.featured,
            bulkDiscount: !!existing.bulkDiscount
        });
        setImages(existing.images?.length ? existing.images : existing.image ? [existing.image] : []);
        setVariants(existing.variants || []);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [existing?.id]);

    function handleSaveDraft() {
        const values = getValues();
        if (!values.name?.trim()) {
            toast.error("Enter a product name before saving a draft");
            return;
        }
        const payload = buildProductPayload(values, images, variants, "draft");
        if (editId) updateProduct(editId, payload);
        else addProduct(payload);
        toast.success("Saved as draft");
        router.push("/seller/products");
    }

    function onSubmit(values) {
        if (images.length === 0) {
            toast.error("Add at least one product image");
            return;
        }
        const payload = buildProductPayload(values, images, variants, "pending");
        if (editId) updateProduct(editId, payload);
        else addProduct(payload);
        toast.success(editId ? "Product updated and resubmitted for approval" : "Product submitted for approval");
        router.push("/seller/products");
    }

    if (!mounted) {
        return <div className="h-96 bg-surface-container rounded-xl animate-pulse" />;
    }

    if (notFound) {
        return (
            <div className="flex flex-col items-center justify-center text-center py-20 bg-white border border-outline-variant rounded-xl">
                <Icon name="search_off" className="text-[64px] text-outline-variant" />
                <h3 className="text-headline-sm text-on-secondary-fixed mt-4">Product not found</h3>
                <p className="text-on-surface-variant mt-1">It may have been deleted.</p>
                <Link
                    href="/seller/products"
                    className="mt-6 bg-primary-container text-white font-bold px-6 py-3 rounded-lg hover:opacity-90"
                >
                    Back to My Products
                </Link>
            </div>
        );
    }

    const statusNote = existing ? STATUS_NOTE[existing.status] : "This product has not been saved yet.";

    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="pb-28">
            <div className="mb-8">
                <h2 className="text-headline-lg text-on-surface">{editId ? "Edit Product" : "Add Product"}</h2>
                <p className="text-on-surface-variant text-body-md">
                    {editId ? "Update your listing details below." : "Fill in the details to list a new product."}
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
                {/* Left column */}
                <div className="lg:col-span-7 space-y-6">
                    <section className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-outline-variant">
                        <h3 className="text-headline-sm mb-6 text-on-surface">Basic Information</h3>
                        <div className="space-y-4">
                            <div className="flex flex-col gap-1.5">
                                <label htmlFor="name" className="text-label-md text-on-surface-variant">
                                    Product Name
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    placeholder="e.g. Ergonomic Office Chair"
                                    className={fieldClass(errors.name)}
                                    {...register("name")}
                                />
                                {errors.name && <p className="text-label-md text-error">{errors.name.message}</p>}
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label htmlFor="description" className="text-label-md text-on-surface-variant">
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    rows={6}
                                    placeholder="Describe the key features, materials, and benefits of your product..."
                                    className={`${fieldClass(errors.description)} h-auto py-3`}
                                    {...register("description")}
                                />
                                {errors.description && <p className="text-label-md text-error">{errors.description.message}</p>}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col gap-1.5">
                                    <label htmlFor="category" className="text-label-md text-on-surface-variant">
                                        Category
                                    </label>
                                    <select
                                        id="category"
                                        className={`${fieldClass(errors.category)} appearance-none`}
                                        {...register("category")}
                                    >
                                        {SELLER_CATEGORIES.map((c) => (
                                            <option key={c} value={c}>
                                                {c}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.category && <p className="text-label-md text-error">{errors.category.message}</p>}
                                </div>

                                <div className="flex flex-col gap-1.5">
                                    <label htmlFor="sku" className="text-label-md text-on-surface-variant">
                                        SKU
                                    </label>
                                    <input
                                        id="sku"
                                        type="text"
                                        placeholder="VVD-8890"
                                        className={fieldClass(errors.sku)}
                                        {...register("sku")}
                                    />
                                    {errors.sku && <p className="text-label-md text-error">{errors.sku.message}</p>}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col gap-1.5">
                                    <label htmlFor="price" className="text-label-md text-on-surface-variant">
                                        Price (৳)
                                    </label>
                                    <input
                                        id="price"
                                        type="number"
                                        step="0.01"
                                        placeholder="0.00"
                                        className={fieldClass(errors.price)}
                                        {...register("price")}
                                    />
                                    {errors.price && <p className="text-label-md text-error">{errors.price.message}</p>}
                                </div>

                                <div className="flex flex-col gap-1.5">
                                    <label htmlFor="stock" className="text-label-md text-on-surface-variant">
                                        Stock Quantity
                                    </label>
                                    <input
                                        id="stock"
                                        type="number"
                                        placeholder="100"
                                        className={fieldClass(errors.stock)}
                                        {...register("stock")}
                                    />
                                    {errors.stock && <p className="text-label-md text-error">{errors.stock.message}</p>}
                                </div>
                            </div>
                        </div>
                    </section>

                    <ProductVariants variants={variants} onChange={setVariants} />
                </div>

                {/* Right column */}
                <div className="lg:col-span-5 space-y-6">
                    <ProductMediaUploader images={images} onChange={setImages} />

                    <section className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-outline-variant">
                        <h3 className="text-headline-sm mb-4 text-on-surface">Organization</h3>
                        <div className="space-y-4">
                            <div className="flex flex-col gap-1.5">
                                <label htmlFor="tags" className="text-label-md text-on-surface-variant">
                                    Tags
                                </label>
                                <input
                                    id="tags"
                                    type="text"
                                    placeholder="office, chair, ergonomic..."
                                    className={`${inputClass} h-10 border-outline-variant text-sm`}
                                    {...register("tags")}
                                />
                            </div>
                            <div className="flex items-center gap-3 py-2">
                                <input
                                    id="featured"
                                    type="checkbox"
                                    className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary"
                                    {...register("featured")}
                                />
                                <label htmlFor="featured" className="text-body-sm">
                                    Mark as Featured Product
                                </label>
                            </div>
                            <div className="flex items-center gap-3 py-2">
                                <input
                                    id="bulkDiscount"
                                    type="checkbox"
                                    className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary"
                                    {...register("bulkDiscount")}
                                />
                                <label htmlFor="bulkDiscount" className="text-body-sm">
                                    Enable Bulk Purchase Discount
                                </label>
                            </div>
                        </div>
                    </section>
                </div>
            </div>

            {/* Sticky bottom action bar */}
            <footer className="fixed bottom-0 left-0 lg:left-64 right-0 h-20 bg-surface-container-lowest border-t border-outline-variant flex items-center justify-between px-4 sm:px-8 z-40 gap-4">
                <div className="hidden sm:flex items-center gap-2 text-on-surface-variant min-w-0">
                    <Icon name="info" className="text-[18px] flex-shrink-0" />
                    <p className="text-body-sm italic truncate">{statusNote}</p>
                </div>
                <div className="flex items-center gap-2 sm:gap-4 ml-auto">
                    <button
                        type="button"
                        onClick={handleSaveDraft}
                        className="px-4 sm:px-6 py-2.5 rounded-lg border-2 border-on-secondary-fixed text-on-secondary-fixed font-bold hover:bg-surface-container-high transition-all active:scale-95 whitespace-nowrap"
                    >
                        Save as Draft
                    </button>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-4 sm:px-8 py-2.5 rounded-lg bg-primary-container text-white font-bold shadow-md hover:opacity-90 transition-all active:scale-95 disabled:opacity-70 whitespace-nowrap"
                    >
                        Submit for Approval
                    </button>
                </div>
            </footer>
        </form>
    );
}