"use client";

import Icon from "@/components/ui/Icon";
import { formatDate } from "@/lib/format";
import { ROLE_META, STATUS_META } from "@/lib/admin/users";

export default function UserDetailsModal({ user, onClose, onToggleBan }) {
    const role = ROLE_META[user.role];
    const status = STATUS_META[user.status];
    const banned = user.status === "banned";

    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="user-modal-title"
            className="fixed inset-0 z-[60] flex items-center justify-center p-margin-mobile bg-black/50"
            onClick={onClose}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden"
            >
                <div className="flex justify-between items-center p-stack-lg border-b border-outline-variant">
                    <h3 id="user-modal-title" className="text-headline-sm text-on-surface">
                        User Details
                    </h3>
                    <button type="button" onClick={onClose} aria-label="Close" className="text-secondary hover:text-error">
                        <Icon name="close" />
                    </button>
                </div>

                <div className="p-stack-lg space-y-stack-md">
                    <div className="flex items-center gap-stack-md">
                        <div className={`w-14 h-14 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0 ${user.avatarStyle}`}>
                            {user.initials}
                        </div>
                        <div>
                            <p className="font-bold text-headline-sm text-on-surface">{user.name}</p>
                            <p className="text-body-sm text-on-surface-variant">{user.email}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-stack-md">
                        <div>
                            <p className="text-label-md text-on-surface-variant uppercase mb-1">User ID</p>
                            <p className="text-body-sm font-mono text-on-surface">{user.id}</p>
                        </div>
                        <div>
                            <p className="text-label-md text-on-surface-variant uppercase mb-1">Role</p>
                            <span className={`inline-block px-3 py-1 rounded text-[11px] font-bold uppercase ${role.badge}`}>
                                {role.label}
                            </span>
                        </div>
                        <div>
                            <p className="text-label-md text-on-surface-variant uppercase mb-1">Status</p>
                            <div className="flex items-center gap-2">
                                <span className={`w-2 h-2 rounded-full ${status.dot}`} />
                                <span className={`text-body-sm font-medium ${status.text}`}>{status.label}</span>
                            </div>
                        </div>
                        <div>
                            <p className="text-label-md text-on-surface-variant uppercase mb-1">Joined Date</p>
                            <p className="text-body-sm text-on-surface">{formatDate(user.joinedAt)}</p>
                        </div>
                    </div>

                    <div className="pt-stack-sm border-t border-outline-variant">
                        <button
                            type="button"
                            onClick={() => onToggleBan(user)}
                            className={`w-full px-6 py-3 rounded-lg font-bold text-label-md transition-all ${banned
                                    ? "bg-tertiary-container text-white hover:brightness-110"
                                    : "border border-error text-error hover:bg-error/5"
                                }`}
                        >
                            {banned ? "Unban User" : "Ban User"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}