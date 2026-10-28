"use client";

import { useState } from "react";
import Link from "next/link";
import Icon from "@/components/ui/Icon";
import { useCartStore } from "@/store/cartStore";
import { calcTotals, validateCoupon } from "@/lib/cart";
import { toast } from "@/lib/toast";

const money = (n) => `$${n.toFixed(2)}`;

export default function CartSummary() {
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
        <aside className="lg:w-[30%]">
            <div className="sticky top-[100px] space-y-stack-md">
                <section className="bg-surface-container-lowest p-stack-lg rounded-xl border border-outline-variant shadow-lg">
                    <h2 className="text-headline-sm text-on-surface mb-stack-md">Order Summary</h2>

                    <div className="space-y-stack-sm border-b border-outline-variant pb-stack-md mb-stack-md">
                        <div className="flex justify-between text-body-md">
                            <span className="text-on-surface-variant">Subtotal</span>
                            <span className="text-on-surface font-semibold">{money(subtotal)}</span>
                        </div>
                        {discount > 0 && (
                            <div className="flex justify-between text-body-md">
                                <span className="text-on-surface-variant">Discount ({coupon.code})</span>
                                <span className="text-tertiary font-semibold">-{money(discount)}</span>
                            </div>
                        )}
                        <div className="flex justify-between text-body-md">
                            <span className="text-on-surface-variant">Shipping</span>
                            <span className="text-tertiary-container font-semibold">
                                {shipping === 0 ? "Free" : money(shipping)}
                            </span>
                        </div>
                        <div className="flex justify-between text-body-md">
                            <span className="text-on-surface-variant">Tax</span>
                            <span className="text-on-surface font-semibold">{money(tax)}</span>
                        </div>
                    </div>

                    {/* Promo code */}
                    <div className="mb-stack-lg">
                        <label className="block text-label-md text-on-surface-variant mb-2">Promo Code</label>
                        {coupon ? (
                            <div className="flex items-center justify-between bg-tertiary-fixed/30 border border-tertiary-container rounded-lg px-4 h-11">
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
                            <form onSubmit={handleApply} className="flex gap-2">
                                <input
                                    type="text"
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                    placeholder="Enter code"
                                    className="flex-grow min-w-0 h-11 px-4 bg-surface border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary-container focus:border-transparent outline-none text-body-sm uppercase"
                                />
                                <button
                                    type="submit"
                                    className="px-4 h-11 bg-on-secondary-fixed text-on-secondary font-bold rounded-lg hover:opacity-90 transition-opacity"
                                >
                                    Apply
                                </button>
                            </form>
                        )}
                    </div>

                    <div className="flex justify-between items-center mb-stack-lg">
                        <span className="text-headline-sm text-on-surface">Total</span>
                        <span className="text-headline-lg text-primary">{money(total)}</span>
                    </div>

                    <Link
                        href="/checkout"
                        className="flex items-center justify-center w-full h-14 bg-primary-container text-on-primary font-bold text-body-lg rounded-lg shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
                    >
                        Proceed to Checkout
                    </Link>
                    <p className="text-center mt-4 text-label-md text-on-surface-variant">
                        Shipping calculated at next step
                    </p>
                </section>

                {/* Trust badges */}
                <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col items-center justify-center p-stack-md bg-surface border border-outline-variant rounded-lg">
                        <Icon name="lock" className="text-primary mb-1" />
                        <span className="text-label-md text-center">Secure Payment</span>
                    </div>
                    <div className="flex flex-col items-center justify-center p-stack-md bg-surface border border-outline-variant rounded-lg">
                        <Icon name="local_shipping" className="text-primary mb-1" />
                        <span className="text-label-md text-center">Free Delivery</span>
                    </div>
                </div>
            </div>
        </aside>
    );
}