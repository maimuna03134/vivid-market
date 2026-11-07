"use client";

import { chartHeights } from "@/lib/admin/dashboard";

export default function RevenueBarChart({ months, current, previous }) {
    const heights = chartHeights(current, previous);

    return (
        <div className="relative h-64 flex items-end justify-between gap-2 px-2">
            {months.map((month, i) => (
                <div key={month} className="flex flex-col items-center gap-2 w-full group">
                    <div className="w-full flex items-end justify-center gap-1 h-full">
                        <div
                            className="w-1/2 bg-surface-container-highest rounded-t transition-all group-hover:opacity-80"
                            style={{ height: `${heights.previous[i]}%` }}
                            title={`Previous: ${previous[i]}`}
                        />
                        <div
                            className="w-1/2 bg-primary rounded-t transition-all"
                            style={{ height: `${heights.current[i]}%` }}
                            title={`Current: ${current[i]}`}
                        />
                    </div>
                    <span className="text-[10px] font-bold text-on-surface-variant uppercase mt-2">{month}</span>
                </div>
            ))}
        </div>
    );
}