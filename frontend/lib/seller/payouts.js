// Logic for the seller payouts page (no styling here, so it can be reused anywhere)

export const PAYOUT_STATUS = {
    paid: { label: "Paid", pill: "bg-tertiary-container/10 text-tertiary border-tertiary-container/20", dot: "bg-tertiary" },
    pending: { label: "Pending", pill: "bg-primary-container/10 text-primary border-primary-container/20", dot: "bg-primary animate-pulse" },
    approved: { label: "Approved", pill: "bg-secondary-container/30 text-secondary border-secondary-container/50", dot: "bg-secondary" }
};

export const PAYOUT_METHODS = [
    { value: "bank", label: "Bank Transfer (**** 4210)", icon: "account_balance" },
    { value: "paypal", label: "PayPal (a.rivera@example.com)", icon: "payments" }
];

export const DATE_RANGES = [
    { value: "30d", label: "Last 30 Days" },
    { value: "3m", label: "Last 3 Months" },
    { value: "ytd", label: "Year to Date" },
    { value: "all", label: "All Time" }
];

const DAY_MS = 24 * 60 * 60 * 1000;

export function filterByRange(payouts, range, now = new Date()) {
    if (range === "all") return payouts;
    const days = range === "30d" ? 30 : range === "3m" ? 90 : null;
    const cutoff =
        range === "ytd" ? new Date(now.getFullYear(), 0, 1) : new Date(now.getTime() - days * DAY_MS);
    return payouts.filter((p) => new Date(p.date) >= cutoff);
}

export function payoutStats(payouts, availableBalance) {
    return {
        available: availableBalance,
        processing: payouts.filter((p) => p.status === "pending").reduce((s, p) => s + p.amount, 0),
        totalWithdrawn: payouts.filter((p) => p.status === "paid").reduce((s, p) => s + p.amount, 0)
    };
}