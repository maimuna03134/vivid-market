"use client";

import { donutGradient } from "@/lib/admin/dashboard";

export default function OrdersDonutChart({ segments, total, totalLabel = "Total Active" }) {
    return (
        <div className="flex-1 flex flex-col justify-center items-center">
            <div
                className="relative w-48 h-48 rounded-full flex items-center justify-center"
                style={{ background: donutGradient(segments) }}
            >
                <div className="absolute inset-[16px] bg-surface-container-lowest rounded-full flex items-center justify-center">
                    <div className="text-center">
                        <span className="block text-2xl font-bold">{total}</span>
                        <span className="text-[10px] text-on-surface-variant uppercase font-bold">{totalLabel}</span>
                    </div>
                </div>
            </div>

            <div className="mt-10 w-full space-y-3">
                {segments.map((s) => (
                    <div key={s.key} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: s.color }} />
                            <span className="text-sm">{s.label}</span>
                        </div>
                        <span className="text-sm font-bold">{s.pct}%</span>
                    </div>
                ))}
            </div>
        </div>
    );
}