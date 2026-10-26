import Link from "next/link";
import Icon from "@/components/ui/Icon";
import { buildQuery } from "@/lib/productQuery";

// 1 2 3 ... 12  (always shows first, last and the pages around the current one)
function getPages(current, total) {
    if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);
    const keep = [...new Set([1, total, current - 1, current, current + 1])]
        .filter((p) => p >= 1 && p <= total)
        .sort((a, b) => a - b);
    const out = [];
    keep.forEach((p, i) => {
        if (i > 0 && p - keep[i - 1] > 1) out.push("...");
        out.push(p);
    });
    return out;
}

const boxBase = "w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant";

export default function Pagination({ filters, page, totalPages, basePath = "/products" }) {
    if (totalPages <= 1) return null;

    const href = (p) => `${basePath}${buildQuery({ ...filters, page: p })}`;

    return (
        <div className="mt-12 flex justify-center items-center gap-2">
            {page > 1 ? (
                <Link href={href(page - 1)} className={`${boxBase} hover:bg-surface-container transition-colors`} aria-label="Previous page">
                    <Icon name="chevron_left" />
                </Link>
            ) : (
                <span className={`${boxBase} opacity-50`}>
                    <Icon name="chevron_left" />
                </span>
            )}

            {getPages(page, totalPages).map((p, i) =>
                p === "..." ? (
                    <span key={`dots-${i}`} className="px-2">...</span>
                ) : p === page ? (
                    <span key={p} className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary-container text-white font-bold">
                        {p}
                    </span>
                ) : (
                    <Link key={p} href={href(p)} className={`${boxBase} hover:bg-surface-container transition-colors`}>
                        {p}
                    </Link>
                )
            )}

            {page < totalPages ? (
                <Link href={href(page + 1)} className={`${boxBase} hover:bg-surface-container transition-colors`} aria-label="Next page">
                    <Icon name="chevron_right" />
                </Link>
            ) : (
                <span className={`${boxBase} opacity-50`}>
                    <Icon name="chevron_right" />
                </span>
            )}
        </div>
    );
}