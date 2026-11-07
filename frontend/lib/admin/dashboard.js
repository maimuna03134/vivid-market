// Logic for the admin dashboard (no styling here, so it can be reused anywhere)

export const TXN_STATUS = {
    delivered: { label: "Delivered", pill: "bg-tertiary-fixed text-on-tertiary-fixed-variant" },
    shipped: { label: "Shipped", pill: "bg-primary-fixed text-on-primary-fixed-variant" },
    pending: { label: "Pending", pill: "bg-surface-container-highest text-on-surface-variant" },
    cancelled: { label: "Cancelled", pill: "bg-error-container text-error" }
};

// bar heights as a percentage of the tallest bar in either series, for a chart container's height
export function chartHeights(current, previous) {
    const max = Math.max(...current, ...previous, 1);
    return {
        current: current.map((v) => Math.round((v / max) * 100)),
        previous: previous.map((v) => Math.round((v / max) * 100))
    };
}

// [{key, pct, color}] -> a CSS conic-gradient string for a donut chart
export function donutGradient(segments) {
    let acc = 0;
    const stops = segments.map((s) => {
        const start = acc;
        acc += s.pct;
        return `${s.color} ${start}% ${acc}%`;
    });
    return `conic-gradient(${stops.join(", ")})`;
}