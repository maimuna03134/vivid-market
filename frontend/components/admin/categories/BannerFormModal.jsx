"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Icon from "@/components/ui/Icon";
import { bannerSchema } from "@/lib/admin/categories";
import { toast } from "@/lib/toast";

const inputClass =
    "w-full h-12 bg-surface px-4 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all";
const fieldClass = (hasError) => `${inputClass} ${hasError ? "border-error" : "border-outline-variant"}`;

// editing = the banner being edited, or null when adding a new one
export default function BannerFormModal({ editing, onSave, onClose }) {
    const [image, setImage] = useState(editing?.image || null);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting }
    } = useForm({
        resolver: zodResolver(bannerSchema),
        defaultValues: {
            title: editing?.title || "",
            status: editing?.status === "scheduled" ? "scheduled" : "active",
            startDate: editing?.startDate ? editing.startDate.slice(0, 10) : ""
        }
    });

    const status = watch("status");

    function handlePick(e) {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => setImage(reader.result);
        reader.readAsDataURL(file);
    }

    async function onSubmit(data) {
        if (!image) {
            toast.error("Upload a banner image");
            return;
        }
        await new Promise((resolve) => setTimeout(resolve, 300));
        onSave({
            title: data.title.trim(),
            status: data.status,
            image,
            startDate: data.status === "scheduled" ? new Date(data.startDate).toISOString() : undefined
        });
    }

    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="banner-modal-title"
            className="fixed inset-0 z-[60] flex items-center justify-center p-margin-mobile bg-black/50"
            onClick={onClose}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto"
            >
                <div className="flex justify-between items-center p-stack-lg border-b border-outline-variant">
                    <h3 id="banner-modal-title" className="text-headline-sm text-on-surface">
                        {editing ? "Edit Banner" : "Add Banner"}
                    </h3>
                    <button type="button" onClick={onClose} aria-label="Close" className="text-secondary hover:text-error">
                        <Icon name="close" />
                    </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} noValidate className="p-stack-lg space-y-stack-md">
                    <div className="space-y-1.5">
                        <label className="text-label-md text-on-surface-variant">Banner Image</label>
                        <label className="block border-2 border-dashed border-outline-variant rounded-xl h-32 cursor-pointer overflow-hidden relative hover:border-primary transition-colors">
                            {image ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={image} alt="Banner preview" className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex flex-col items-center justify-center text-on-surface-variant gap-1">
                                    <Icon name="upload" />
                                    <span className="text-body-sm">Click to upload (1920x600px recommended)</span>
                                </div>
                            )}
                            <input type="file" accept="image/*" onChange={handlePick} className="sr-only" />
                        </label>
                    </div>

                    <div className="space-y-1.5">
                        <label htmlFor="banner-title" className="text-label-md text-on-surface-variant">
                            Banner Title
                        </label>
                        <input
                            id="banner-title"
                            type="text"
                            placeholder="e.g. Summer Tech Mega Sale"
                            className={fieldClass(errors.title)}
                            {...register("title")}
                        />
                        {errors.title && <p className="text-label-md text-error">{errors.title.message}</p>}
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-label-md text-on-surface-variant">Status</label>
                        <div className="flex gap-2">
                            {["active", "scheduled"].map((s) => (
                                <label key={s} className="flex-1 cursor-pointer">
                                    <input type="radio" value={s} className="sr-only peer" {...register("status")} />
                                    <div className="text-center py-2 rounded-lg border border-outline-variant capitalize peer-checked:border-2 peer-checked:border-primary peer-checked:bg-primary-fixed/40 transition-all">
                                        {s}
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>

                    {status === "scheduled" && (
                        <div className="space-y-1.5">
                            <label htmlFor="banner-date" className="text-label-md text-on-surface-variant">
                                Start Date
                            </label>
                            <input
                                id="banner-date"
                                type="date"
                                className={fieldClass(errors.startDate)}
                                {...register("startDate")}
                            />
                            {errors.startDate && <p className="text-label-md text-error">{errors.startDate.message}</p>}
                        </div>
                    )}

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
                            {isSubmitting ? "Saving..." : "Save Banner"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}