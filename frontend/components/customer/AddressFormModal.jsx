"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Icon from "@/components/ui/Icon";
import { addressSchema, ADDRESS_TYPES, CITIES } from "@/lib/profile";

const inputClass =
    "w-full h-12 bg-surface-container-low border border-outline-variant rounded-lg px-4 text-body-md focus:border-primary-container focus:ring-1 focus:ring-primary-container outline-none transition-all";

// editing = the address being edited, or null when adding a new one
export default function AddressFormModal({ editing, onSave, onClose }) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm({
        resolver: zodResolver(addressSchema),
        defaultValues: {
            type: editing?.type || "home",
            line1: editing?.line1 || "",
            line2: editing?.line2 || "",
            city: editing?.city || "",
            postalCode: editing?.postalCode || ""
        }
    });

    async function onSubmit(data) {
        await new Promise((resolve) => setTimeout(resolve, 300));
        onSave({
            type: data.type,
            line1: data.line1.trim(),
            line2: data.line2?.trim() || "",
            city: data.city,
            postalCode: data.postalCode?.trim() || ""
        });
    }

    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="address-modal-title"
            className="fixed inset-0 z-[60] flex items-center justify-center p-margin-mobile bg-black/50"
            onClick={onClose}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
            >
                <div className="flex justify-between items-center p-stack-lg border-b border-outline-variant">
                    <h3 id="address-modal-title" className="text-headline-sm text-on-secondary-fixed">
                        {editing ? "Edit Address" : "Add New Address"}
                    </h3>
                    <button type="button" onClick={onClose} aria-label="Close" className="text-secondary hover:text-error">
                        <Icon name="close" />
                    </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} noValidate className="p-stack-lg space-y-stack-md">
                    <div className="space-y-stack-xs">
                        <label className="text-label-md text-on-secondary-fixed-variant">Address Type</label>
                        <div className="flex gap-stack-sm">
                            {ADDRESS_TYPES.map((t) => (
                                <label key={t.value} className="cursor-pointer flex-1">
                                    <input type="radio" value={t.value} className="sr-only peer" {...register("type")} />
                                    <div className="flex items-center justify-center gap-2 border border-outline-variant rounded-lg py-2 peer-checked:border-2 peer-checked:border-primary peer-checked:bg-primary-fixed/40 transition-all">
                                        <Icon name={t.icon} className="text-[18px]" />
                                        <span className="text-label-md">{t.label}</span>
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-stack-xs">
                        <label htmlFor="line1" className="text-label-md text-on-secondary-fixed-variant">
                            Street Address
                        </label>
                        <input
                            id="line1"
                            type="text"
                            placeholder="House #, Road, Area"
                            className={inputClass}
                            {...register("line1")}
                        />
                        {errors.line1 && <p className="text-label-md text-error">{errors.line1.message}</p>}
                    </div>

                    <div className="space-y-stack-xs">
                        <label htmlFor="line2" className="text-label-md text-on-secondary-fixed-variant">
                            Apartment, Suite, etc. (optional)
                        </label>
                        <input id="line2" type="text" className={inputClass} {...register("line2")} />
                    </div>

                    <div className="grid grid-cols-2 gap-stack-md">
                        <div className="space-y-stack-xs">
                            <label htmlFor="city" className="text-label-md text-on-secondary-fixed-variant">
                                City
                            </label>
                            <select id="city" className={`${inputClass} appearance-none`} {...register("city")}>
                                <option value="">Select City</option>
                                {CITIES.map((c) => (
                                    <option key={c} value={c}>
                                        {c}
                                    </option>
                                ))}
                            </select>
                            {errors.city && <p className="text-label-md text-error">{errors.city.message}</p>}
                        </div>

                        <div className="space-y-stack-xs">
                            <label htmlFor="postalCode" className="text-label-md text-on-secondary-fixed-variant">
                                Postal Code (optional)
                            </label>
                            <input id="postalCode" type="text" placeholder="4000" className={inputClass} {...register("postalCode")} />
                            {errors.postalCode && <p className="text-label-md text-error">{errors.postalCode.message}</p>}
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
                            className="bg-primary-container text-white px-6 py-3 rounded-lg font-bold text-label-md hover:opacity-90 transition-all shadow-md disabled:opacity-70"
                        >
                            {isSubmitting ? "Saving..." : "Save Address"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}