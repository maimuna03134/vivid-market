"use client";

import Icon from "@/components/ui/Icon";
import { formatDate } from "@/lib/format";
import { BANNER_STATUS, sortBanners } from "@/lib/admin/categories";

export default function BannersTab({ banners, onAdd, onEdit, onRemove, onToggleStatus, onReorder }) {
    const sorted = sortBanners(banners);
    const activeCount = banners.filter((b) => b.status === "active").length;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            <button
                type="button"
                onClick={onAdd}
                className="border-2 border-dashed border-outline-variant rounded-xl h-64 flex flex-col items-center justify-center gap-3 text-on-surface-variant hover:border-primary hover:text-primary transition-colors"
            >
                <Icon name="add_photo_alternate" className="text-4xl" />
                <span className="font-bold">Upload New Banner</span>
            </button>

            {sorted.map((banner) => {
                const status = BANNER_STATUS[banner.status];
                const activeIdx = banner.status === "active" ? banner.position - 1 : -1;
                return (
                    <div
                        key={banner.id}
                        className={`relative rounded-xl overflow-hidden border border-outline-variant shadow-sm group ${banner.status === "disabled" ? "opacity-60 grayscale" : ""
                            }`}
                    >
                        <div className="h-40 w-full bg-surface-container relative">
                            {banner.image ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={banner.image} alt={banner.title} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-outline-variant">
                                    <Icon name="image" className="text-4xl" />
                                </div>
                            )}
                            <div className="absolute top-2 left-2 flex items-center gap-1 bg-black/40 text-white rounded px-2 py-1">
                                <Icon name="drag_indicator" className="text-[16px]" />
                            </div>
                            <span className={`absolute top-2 right-2 px-3 py-1 rounded-full text-[11px] font-bold uppercase ${status.badge}`}>
                                {status.label}
                            </span>
                        </div>

                        <div className="p-4 space-y-3">
                            <div>
                                <p className="font-bold text-on-surface line-clamp-1">{banner.title}</p>
                                <p className="text-body-sm text-on-surface-variant">
                                    {banner.status === "active" && `Position ${banner.position}`}
                                    {banner.status === "scheduled" && `Starts: ${formatDate(banner.startDate)}`}
                                    {banner.status === "disabled" && "Not shown on storefront"}
                                </p>
                            </div>

                            {banner.status === "active" && (
                                <div className="flex gap-1">
                                    <button
                                        type="button"
                                        onClick={() => onReorder(banner.id, "up")}
                                        disabled={activeIdx === 0}
                                        aria-label={`Move ${banner.title} up`}
                                        className="p-1.5 border border-outline-variant rounded hover:bg-surface-container-low disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                                    >
                                        <Icon name="arrow_upward" className="text-[16px]" />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => onReorder(banner.id, "down")}
                                        disabled={activeIdx === activeCount - 1}
                                        aria-label={`Move ${banner.title} down`}
                                        className="p-1.5 border border-outline-variant rounded hover:bg-surface-container-low disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                                    >
                                        <Icon name="arrow_downward" className="text-[16px]" />
                                    </button>
                                </div>
                            )}

                            <div className="flex items-center justify-between pt-2 border-t border-outline-variant">
                                <button
                                    type="button"
                                    onClick={() => onEdit(banner)}
                                    className="text-primary text-label-md font-bold hover:underline"
                                >
                                    Edit Details
                                </button>
                                <div className="flex gap-2">
                                    {banner.status === "active" && (
                                        <button
                                            type="button"
                                            onClick={() => onToggleStatus(banner, "disabled")}
                                            className="text-on-surface-variant text-label-md hover:text-error"
                                        >
                                            Disable
                                        </button>
                                    )}
                                    {banner.status === "disabled" && (
                                        <button
                                            type="button"
                                            onClick={() => onToggleStatus(banner, "active")}
                                            className="text-tertiary text-label-md font-bold hover:underline"
                                        >
                                            Enable
                                        </button>
                                    )}
                                    <button
                                        type="button"
                                        onClick={() => onRemove(banner)}
                                        className="text-error text-label-md hover:underline"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}