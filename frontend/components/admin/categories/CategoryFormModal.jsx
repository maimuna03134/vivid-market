"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Icon from "@/components/ui/Icon";
import { categorySchema } from "@/lib/admin/categories";

const inputClass =
    "w-full h-12 bg-surface px-4 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all";
const fieldClass = (hasError) => `${inputClass} ${hasError ? "border-error" : "border-outline-variant"}`;

// editing = the category being edited, or null when adding a new one
export default function CategoryFormModal({ editing, onSave, onClose }) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm({
        resolver: zodResolver(categorySchema),
        defaultValues: { name: editing?.name || "", status: editing?.status || "active" }
    });

    async function onSubmit(data) {
        await new Promise((resolve) => setTimeout(resolve, 300));
        onSave({ name: data.name.trim(), status: data.status });
    }

    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="category-modal-title"
            className="fixed inset-0 z-[60] flex items-center justify-center p-margin-mobile bg-black/50"
            onClick={onClose}
        >
            <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
                <div className="flex justify-between items-center p-stack-lg border-b border-outline-variant">
                    <h3 id="category-modal-title" className="text-headline-sm text-on-surface">
                        {editing ? "Edit Category" : "Add Category"}
                    </h3>
                    <button type="button" onClick={onClose} aria-label="Close" className="text-secondary hover:text-error">
                        <Icon name="close" />
                    </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} noValidate className="p-stack-lg space-y-stack-md">
                    <div className="space-y-1.5">
                        <label htmlFor="cat-name" className="text-label-md text-on-surface-variant">
                            Category Name
                        </label>
                        <input
                            id="cat-name"
                            type="text"
                            placeholder="e.g. Electronics & Gadgets"
                            className={fieldClass(errors.name)}
                            {...register("name")}
                        />
                        {errors.name && <p className="text-label-md text-error">{errors.name.message}</p>}
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-label-md text-on-surface-variant">Status</label>
                        <div className="flex gap-2">
                            {["active", "draft"].map((s) => (
                                <label key={s} className="flex-1 cursor-pointer">
                                    <input type="radio" value={s} className="sr-only peer" {...register("status")} />
                                    <div className="text-center py-2 rounded-lg border border-outline-variant capitalize peer-checked:border-2 peer-checked:border-primary peer-checked:bg-primary-fixed/40 transition-all">
                                        {s}
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-end gap-stack-sm pt-stack-sm">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-3 rounded-lg font-bold text-label-md border border-outline-variant text-on-surface hover:bg-surface-container transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-primary text-on-primary px-6 py-3 rounded-lg font-bold text-label-md hover:opacity-90 transition-all shadow-sm disabled:opacity-70"
                        >
                            {isSubmitting ? "Saving..." : "Save Category"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}