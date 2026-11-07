import { z } from "zod";

export const CATEGORY_STATUS = {
    active: { label: "Active", badge: "bg-tertiary-fixed text-on-tertiary-fixed-variant" },
    draft: { label: "Draft", badge: "bg-surface-container-highest text-on-surface-variant" }
};

export const BANNER_STATUS = {
    active: { label: "Active", badge: "bg-tertiary-fixed text-on-tertiary-fixed-variant" },
    scheduled: { label: "Scheduled", badge: "bg-secondary-fixed text-on-secondary-container" },
    disabled: { label: "Disabled", badge: "bg-surface-container-highest text-on-surface-variant" }
};

export const categorySchema = z.object({
    name: z.string().trim().min(2, "Enter a category name"),
    status: z.enum(["active", "draft"])
});

export const bannerSchema = z
    .object({
        title: z.string().trim().min(2, "Enter a banner title"),
        status: z.enum(["active", "scheduled"]),
        startDate: z.string().optional()
    })
    .refine((data) => data.status !== "scheduled" || !!data.startDate, {
        message: "Select a start date for a scheduled banner",
        path: ["startDate"]
    });

// active banners sorted by position, then everything else appended as-is
export function sortBanners(banners) {
    const active = banners.filter((b) => b.status === "active").sort((a, b) => a.position - b.position);
    const rest = banners.filter((b) => b.status !== "active");
    return [...active, ...rest];
}