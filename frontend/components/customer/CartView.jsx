"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Icon from "@/components/ui/Icon";
import CartItemRow from "@/components/customer/CartItemRow";
import CartSummary from "@/components/customer/CartSummary";
import { useCartStore, selectCartCount } from "@/store/cartStore";

export default function CartView() {
    const items = useCartStore((s) => s.items);
    const count = useCartStore(selectCartCount);
    const [mounted, setMounted] = useState(false);

    // the cart lives in localStorage, so wait for the browser before showing it
    useEffect(() => setMounted(true), []);

    if (!mounted) {
        return (
            <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg">
                <h1 className="text-headline-lg text-on-background mb-stack-lg">Your Shopping Cart</h1>
                <div className="space-y-stack-md animate-pulse">
                    <div className="h-44 bg-surface-container rounded-xl" />
                    <div className="h-44 bg-surface-container rounded-xl" />
                </div>
            </div>
        );
    }

    if (items.length === 0) {
        return (
            <div className="flex items-center justify-center py-stack-lg min-h-[60vh]">
                <div className="text-center max-w-md px-margin-desktop">
                    <div className="w-48 h-48 mx-auto mb-stack-lg bg-surface-container rounded-full flex items-center justify-center">
                        <Icon name="shopping_basket" className="text-surface-variant text-[80px]" />
                    </div>
                    <h2 className="text-headline-lg text-on-background mb-stack-sm">Your cart is empty</h2>
                    <p className="text-body-md text-on-surface-variant mb-stack-lg">
                        Looks like you haven&apos;t added anything to your cart yet. Discover our latest tech
                        and lifestyle essentials.
                    </p>
                    <Link
                        href="/products"
                        className="inline-flex items-center justify-center px-stack-lg h-14 bg-primary-container text-on-primary font-bold text-body-lg rounded-lg shadow-md hover:shadow-lg transition-all"
                    >
                        Continue Shopping
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg">
            <header className="mb-stack-lg">
                <h1 className="text-headline-lg text-on-background">Your Shopping Cart</h1>
                <p className="text-body-md text-on-surface-variant">
                    {count} {count === 1 ? "item" : "items"} ready for checkout
                </p>
            </header>

            <div className="flex flex-col lg:flex-row gap-gutter">
                <section className="lg:w-[70%] space-y-stack-md">
                    {items.map((item) => (
                        <CartItemRow key={item.id} item={item} />
                    ))}
                </section>

                <CartSummary />
            </div>
        </div>
    );
}