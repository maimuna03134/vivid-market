"use client";

import Icon from "@/components/ui/Icon";
import { VARIANT_ATTRIBUTES } from "@/lib/sellerProductForm";

let rowSeq = 0;
export function newVariantRow() {
    rowSeq += 1;
    return { id: `var-${rowSeq}`, attribute: "Size", values: "" };
}

// variants = array of { id, attribute, values }, onChange(nextArray)
export default function ProductVariants({ variants, onChange }) {
    function update(id, patch) {
        onChange(variants.map((v) => (v.id === id ? { ...v, ...patch } : v)));
    }

    function remove(id) {
        onChange(variants.filter((v) => v.id !== id));
    }

    return (
        <section className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-outline-variant">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-headline-sm text-on-surface">Product Variants</h3>
                <button
                    type="button"
                    onClick={() => onChange([...variants, newVariantRow()])}
                    className="flex items-center gap-1 text-primary text-label-md hover:underline"
                >
                    <Icon name="add" className="text-[18px]" /> Add Variant
                </button>
            </div>

            {variants.length === 0 ? (
                <p className="text-body-sm text-on-surface-variant">
                    No variants yet. Add one if this product comes in different sizes, colors or materials.
                </p>
            ) : (
                <div className="space-y-4">
                    {variants.map((row) => (
                        <div key={row.id} className="grid grid-cols-12 gap-3 items-end group">
                            <div className="col-span-4 flex flex-col gap-1.5">
                                <label htmlFor={`attr-${row.id}`} className="text-label-md text-on-surface-variant">
                                    Attribute
                                </label>
                                <select
                                    id={`attr-${row.id}`}
                                    value={row.attribute}
                                    onChange={(e) => update(row.id, { attribute: e.target.value })}
                                    className="h-10 bg-surface px-3 border border-outline-variant rounded text-sm focus:border-primary-container outline-none"
                                >
                                    {VARIANT_ATTRIBUTES.map((a) => (
                                        <option key={a} value={a}>
                                            {a}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-span-6 flex flex-col gap-1.5">
                                <label htmlFor={`val-${row.id}`} className="text-label-md text-on-surface-variant">
                                    Values (comma separated)
                                </label>
                                <input
                                    id={`val-${row.id}`}
                                    type="text"
                                    value={row.values}
                                    onChange={(e) => update(row.id, { values: e.target.value })}
                                    placeholder="Small, Medium, Large"
                                    className="h-10 bg-surface px-3 border border-outline-variant rounded text-sm focus:border-primary-container outline-none"
                                />
                            </div>
                            <div className="col-span-2 pb-1">
                                <button
                                    type="button"
                                    onClick={() => remove(row.id)}
                                    aria-label="Remove variant"
                                    className="h-10 w-10 flex items-center justify-center text-on-surface-variant hover:text-error transition-colors rounded hover:bg-error-container"
                                >
                                    <Icon name="delete" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}