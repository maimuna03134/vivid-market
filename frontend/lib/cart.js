// Cart calculations + promo code check.
// The checkout page will reuse calcTotals() so both pages always show the same numbers.

export const TAX_RATE = 0.08; // 8%
export const SHIPPING_FEE = 0; // free shipping for now

const round2 = (n) => Math.round(n * 100) / 100;

export function calcTotals(items, coupon) {
    const subtotal = round2(items.reduce((sum, i) => sum + i.price * i.qty, 0));

    let discount = 0;
    if (coupon) {
        discount =
            coupon.type === "percent"
                ? round2((subtotal * coupon.value) / 100)
                : Math.min(coupon.value, subtotal);
    }

    const shipping = items.length ? SHIPPING_FEE : 0;
    const taxable = subtotal - discount;
    const tax = round2(taxable * TAX_RATE);
    const total = round2(taxable + shipping + tax);

    return { subtotal, discount, shipping, tax, total };
}

// Mock promo codes. When the backend is ready, replace validateCoupon() with a call to
// POST /api/coupons/validate  (same idea: send the code, get the coupon back or an error).
const COUPONS = {
    VIVID10: { type: "percent", value: 10, label: "10% off" },
    SAVE20: { type: "fixed", value: 20, label: "৳20 off" }
};

export function validateCoupon(code) {
    const key = String(code || "").trim().toUpperCase();
    const coupon = COUPONS[key];
    return coupon ? { code: key, ...coupon } : null;
}