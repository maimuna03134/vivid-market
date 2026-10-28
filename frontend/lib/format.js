// Price and date formatting helpers (the app uses Bangladeshi Taka)

export const CURRENCY_SYMBOL = "৳";

export function formatPrice(amount) {
    return `${CURRENCY_SYMBOL}${Number(amount).toFixed(2)}`;
}

export function formatDate(iso) {
    return new Date(iso).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
    });
}