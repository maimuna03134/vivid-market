"use client";

import { useState } from "react";
import Icon from "@/components/ui/Icon";
import { useCartStore } from "@/store/cartStore";
import { calcTotals, validateCoupon } from "@/lib/cart";
import { toast } from "@/lib/toast";

const money = (n) => `৳${n.toFixed(2)}`;

// formId = the id of the <form> this "Place Order" button submits (the form is in the left column)
export default function CheckoutSummary({ formId, submitting }) {
    const items = useCartStore((s) => s.items);
    const coupon = useCartStore((s) => s.coupon);
    const setCoupon = useCartStore((s) => s.setCoupon);
    const clearCoupon = useCartStore((s) => s.clearCoupon);
    const [code, setCode] = useState("");

    const { subtotal, discount, shipping, tax, total } = calcTotals(items, coupon);

    function handleApply(e) {
        e.preventDefault();
        if (!code.trim()) {
            toast.error("Enter a promo code");
            return;
        }
        const found = validateCoupon(code);
        if (!found) {
            toast.error("Invalid promo code");
            return;
        }
        setCoupon(found);
        setCode("");
        toast.success(`Promo code ${found.code} applied`);
    }

    return (
        <aside className="lg:sticky lg:top-[100px] space-y-gutter">
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-md overflow-hidden">
                <div className="p-stack-md bg-surface-container-low border-b border-outline-variant">
                    <h3 className="text-headline-sm text-on-secondary-fixed">Order Summary</h3>
                </div>

                <div className="p-stack-md space-y-stack-md">
                    {/* Items */}
                    <div className="space-y-stack-sm max-h-72 overflow-y-auto">
                        {items.map((item) => (
                            <div key={item.id} className="flex items-center gap-stack-sm">
                                <div className="w-16 h-16 bg-surface-container rounded-lg flex-shrink-0 overflow-hidden flex items-center justify-center">
                                    {item.image ? (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <Icon name="image" className="text-outline-variant" />
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-body-sm font-bold text-on-secondary-fixed line-clamp-1">{item.name}</p>
                                    {item.variant && (
                                        <p className="text-label-md text-secondary line-clamp-1">{item.variant}</p>
                                    )}
                                    <p className="text-label-md text-secondary">Qty: {item.qty}</p>
                                    <p className="text-label-md font-bold text-primary">{money(item.price * item.qty)}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <hr className="border-outline-variant" />

                    {/* Breakdown */}
                    <div className="space-y-stack-xs">
                        <div className="flex justify-between text-body-sm text-secondary">
                            <span>Subtotal</span>
                            <span>{money(subtotal)}</span>
                        </div>
                        {discount > 0 && (
                            <div className="flex justify-between text-body-sm text-secondary">
                                <span>Discount ({coupon.code})</span>
                                <span className="text-tertiary font-bold">-{money(discount)}</span>
                            </div>
                        )}
                        <div className="flex justify-between text-body-sm text-secondary">
                            <span>Shipping</span>
                            <span className="text-tertiary font-bold">{shipping === 0 ? "Free" : money(shipping)}</span>
                        </div>
                        <div className="flex justify-between text-body-sm text-secondary">
                            <span>Tax (Estimated)</span>
                            <span>{money(tax)}</span>
                        </div>
                    </div>

                    <hr className="border-outline-variant" />

                    <div className="flex justify-between items-center py-stack-xs">
                        <span className="text-headline-sm text-on-secondary-fixed">Total</span>
                        <span className="text-price-lg text-primary">{money(total)}</span>
                    </div>

                    <button
                        type="submit"
                        form={formId}
                        disabled={submitting}
                        className="w-full bg-primary-container text-white py-4 rounded-lg font-bold text-headline-sm shadow-lg hover:opacity-90 hover:scale-[1.02] active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                        {submitting ? (
                            <>
                                <Icon name="progress_activity" className="animate-spin" />
                                Placing order...
                            </>
                        ) : (
                            "Place Order"
                        )}
                    </button>

                    <div className="flex items-center justify-center gap-stack-xs text-label-md text-secondary">
                        <Icon name="lock" className="text-[16px]" />
                        <span>Secure Encrypted Checkout</span>
                    </div>
                </div>
            </div>

            {/* Promo code (optional) */}
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-stack-md">
                {coupon ? (
                    <div className="flex items-center justify-between">
                        <span className="flex items-center gap-2 text-body-sm font-bold text-tertiary">
                            <Icon name="sell" className="text-[18px]" />
                            {coupon.code} · {coupon.label}
                        </span>
                        <button
                            type="button"
                            onClick={clearCoupon}
                            aria-label="Remove promo code"
                            className="text-on-surface-variant hover:text-error transition-colors"
                        >
                            <Icon name="close" className="text-[18px]" />
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleApply} className="flex gap-stack-sm items-center">
                        <input
                            type="text"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            placeholder="Promo Code (optional)"
                            className="flex-1 min-w-0 h-10 px-3 rounded border border-outline-variant text-body-sm outline-none focus:ring-1 focus:ring-primary-container uppercase"
                        />
                        <button
                            type="submit"
                            className="bg-secondary text-white px-4 h-10 rounded text-label-md hover:bg-on-secondary-fixed transition-colors"
                        >
                            Apply
                        </button>
                    </form>
                )}
            </div>
        </aside>
    );
}