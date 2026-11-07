"use client";

import Icon from "@/components/ui/Icon";
import { formatDate } from "@/lib/format";
import { ROLE_META, STATUS_META } from "@/lib/admin/users";

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

export default function UsersTable({ users, page, totalPages, from, to, total, onPage, onView, onToggleBan }) {
    const pageButton = "p-2 rounded hover:bg-surface-container-highest disabled:opacity-30 disabled:cursor-not-allowed transition-colors";

    return (
        <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-surface-container border-b border-outline-variant">
                            {["User", "Role", "Status", "Joined Date", "Actions"].map((h, i) => (
                                <th
                                    key={h}
                                    className={`px-6 py-4 text-label-md text-on-surface-variant uppercase tracking-wider ${i === 4 ? "text-right" : ""
                                        }`}
                                >
                                    {h}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-outline-variant">
                        {users.map((u) => {
                            const role = ROLE_META[u.role];
                            const status = STATUS_META[u.status];
                            const banned = u.status === "banned";
                            return (
                                <tr
                                    key={u.id}
                                    className={`hover:bg-surface-container-low transition-colors group ${banned ? "opacity-70" : ""}`}
                                >
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div
                                                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0 ${banned ? "grayscale" : ""
                                                    } ${u.avatarStyle}`}
                                            >
                                                {u.initials}
                                            </div>
                                            <div>
                                                <p className="text-body-md font-semibold text-on-surface">{u.name}</p>
                                                <p className="text-body-sm text-on-surface-variant">{u.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded text-[11px] font-bold uppercase tracking-wide ${role.badge}`}>
                                            {role.label}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <span className={`w-2 h-2 rounded-full ${status.dot}`} />
                                            <span className={`text-body-sm font-medium ${status.text}`}>{status.label}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-body-sm text-on-surface-variant whitespace-nowrap">
                                        {formatDate(u.joinedAt)}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                type="button"
                                                onClick={() => onView(u)}
                                                className="px-3 py-1.5 text-primary hover:bg-primary-fixed rounded text-label-md transition-colors"
                                            >
                                                View Details
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => onToggleBan(u)}
                                                title={banned ? "Unban User" : "Ban User"}
                                                aria-label={banned ? `Unban ${u.name}` : `Ban ${u.name}`}
                                                className={`p-1.5 transition-colors ${banned ? "text-tertiary hover:text-tertiary-fixed-dim" : "text-on-surface-variant hover:text-error"
                                                    }`}
                                            >
                                                <Icon name={banned ? "check_circle" : "do_not_disturb_on"} filled={banned} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            <div className="px-6 py-4 bg-surface-container-low border-t border-outline-variant flex flex-col sm:flex-row items-center justify-between gap-stack-sm">
                <p className="text-body-sm text-on-surface-variant">
                    Showing <span className="font-bold text-on-surface">{from}-{to}</span> of{" "}
                    <span className="font-bold text-on-surface">{total}</span> users
                </p>
                {totalPages > 1 && (
                    <div className="flex items-center gap-1">
                        <button type="button" onClick={() => onPage(page - 1)} disabled={page === 1} className={pageButton} aria-label="Previous page">
                            <Icon name="chevron_left" />
                        </button>
                        {getPages(page, totalPages).map((p, i) =>
                            p === "..." ? (
                                <span key={`dots-${i}`} className="px-2 text-on-surface-variant text-label-md">...</span>
                            ) : (
                                <button
                                    key={p}
                                    type="button"
                                    onClick={() => onPage(p)}
                                    className={`px-3 py-1 rounded text-label-md transition-colors ${p === page
                                            ? "bg-primary text-on-primary shadow-sm"
                                            : "text-on-surface-variant hover:bg-surface-container-highest"
                                        }`}
                                >
                                    {p}
                                </button>
                            )
                        )}
                        <button
                            type="button"
                            onClick={() => onPage(page + 1)}
                            disabled={page === totalPages}
                            className={pageButton}
                            aria-label="Next page"
                        >
                            <Icon name="chevron_right" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}