"use client";

import { useRouter, usePathname } from "next/navigation";
import { buildQuery } from "@/lib/productQuery";

const options = [
    { value: "popularity", label: "Popularity" },
    { value: "newest", label: "Newest Arrivals" },
    { value: "price-asc", label: "Price: Low to High" },
    { value: "price-desc", label: "Price: High to Low" },
    { value: "deals", label: "Top Deals" }
];

export default function ProductSort({ filters }) {
    const router = useRouter();
    const pathname = usePathname();

    function handleChange(e) {
        router.push(`${pathname}${buildQuery({ ...filters, sort: e.target.value, page: 1 })}`, {
            scroll: false
        });
    }

    return (
        <div className="flex items-center gap-2">
            <span className="text-sm text-on-surface-variant whitespace-nowrap">Sort by:</span>
            <select
                value={filters.sort}
                onChange={handleChange}
                className="border-outline-variant rounded-lg bg-white h-10 px-3 text-sm focus:ring-primary-container outline-none transition-all cursor-pointer"
            >
                {options.map((o) => (
                    <option key={o.value} value={o.value}>
                        {o.label}
                    </option>
                ))}
            </select>
        </div>
    );
}