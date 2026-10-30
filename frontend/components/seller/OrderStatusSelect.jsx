"use client";

import Icon from "@/components/ui/Icon";
import { ORDER_STATUSES, STATUS_META } from "@/lib/sellerOrders";

export default function OrderStatusSelect({ value, onChange, label }) {
    const meta = STATUS_META[value];

    return (
        <div className="relative inline-block">
            <select
                aria-label={label || "Order status"}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className={`appearance-none font-bold text-xs px-3 py-1.5 pr-8 rounded-full border-none focus:ring-2 cursor-pointer transition-all ${meta.pill} ${meta.ring}`}
            >
                {ORDER_STATUSES.map((s) => (
                    <option key={s} value={s}>
                        {STATUS_META[s].label}
                    </option>
                ))}
            </select>
            <Icon
                name="expand_more"
                className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-xs"
            />
        </div>
    );
}