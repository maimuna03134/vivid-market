"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Icon from "@/components/ui/Icon";
import Stars from "@/components/ui/Stars";
import { useCartStore } from "@/store/cartStore";
import { toast } from "@/lib/toast";

const MAX_QTY = 10;

export default function ProductInfo({ product }) {
    const router = useRouter();
    const addItem = useCartStore((s) => s.addItem);

    const [colorIdx, setColorIdx] = useState(0);
    const [model, setModel] = useState(product.defaultModel || product.models[0] || null);
    const [qty, setQty] = useState(1);
    const [following, setFollowing] = useState(false);

    const color = product.colors[colorIdx] || null;
    const heading = color ? `${product.title} - ${color.name}` : product.title;

    // each color/model combination is its own line in the cart
    function buildCartItem() {
        const parts = [color?.name, model].filter(Boolean);
        return {
            id: parts.length ? `${product.id}:${parts.join("-")}` : product.id,
            productId: product.id,
            name: product.title,
            price: product.price,
            image: product.images[0] || null,
            variant: parts.length ? parts.join(" / ") : null
        };
    }

    function handleAddToCart() {
        addItem(buildCartItem(), qty);
        toast.success(`${qty} × ${product.title} added to cart`);
    }

    function handleBuyNow() {
        addItem(buildCartItem(), qty);
        router.push("/checkout");
    }

    return (
        <div className="lg:col-span-5 flex flex-col gap-stack-md">
            <div>
                <h1 className="text-headline-lg-mobile md:text-headline-lg text-on-secondary-fixed leading-tight">
                    {heading}
                </h1>
                <div className="flex items-center gap-stack-sm mt-stack-xs">
                    <Stars rating={product.rating} />
                    <span className="text-label-md text-on-surface-variant">
                        {product.rating} ({product.reviews.toLocaleString("en-US")} Reviews)
                    </span>
                </div>
            </div>

            <div className="flex items-baseline gap-stack-sm">
                <span className="font-bold text-primary text-headline-lg md:text-display-lg">
                    ${product.price.toFixed(2)}
                </span>
                {product.oldPrice && (
                    <span className="text-on-surface-variant line-through text-body-lg">
                        ${product.oldPrice.toFixed(2)}
                    </span>
                )}
            </div>

            <hr className="border-outline-variant" />

            {/* Colors */}
            {product.colors.length > 0 && (
                <div className="space-y-stack-xs">
                    <span className="text-label-md uppercase text-on-surface-variant">Color: {color.name}</span>
                    <div className="flex gap-stack-sm">
                        {product.colors.map((c, i) => (
                            <button
                                key={c.name}
                                type="button"
                                onClick={() => setColorIdx(i)}
                                aria-label={c.name}
                                style={{ backgroundColor: c.hex }}
                                className={`w-8 h-8 rounded-full ring-offset-2 transition-all ${i === colorIdx
                                        ? "ring-2 ring-primary"
                                        : "ring-1 ring-outline-variant hover:ring-primary-container"
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* Models */}
            {product.models.length > 0 && (
                <div className="space-y-stack-xs">
                    <span className="text-label-md uppercase text-on-surface-variant">Model</span>
                    <div className="flex gap-stack-sm">
                        {product.models.map((m) => (
                            <button
                                key={m}
                                type="button"
                                onClick={() => setModel(m)}
                                className={`px-6 py-2 rounded-full text-body-sm transition-colors ${m === model
                                        ? "border-2 border-primary font-bold bg-primary-fixed"
                                        : "border border-outline-variant hover:border-primary-container"
                                    }`}
                            >
                                {m}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Quantity + shipping */}
            <div className="flex flex-col gap-stack-sm">
                <span className="text-label-md uppercase text-on-surface-variant">Quantity</span>
                <div className="flex items-center gap-stack-md flex-wrap">
                    <div className="flex items-center border border-outline-variant rounded-lg overflow-hidden bg-white">
                        <button
                            type="button"
                            onClick={() => setQty((q) => Math.max(1, q - 1))}
                            aria-label="Decrease quantity"
                            className="px-4 py-2 hover:bg-surface-container transition-colors"
                        >
                            <Icon name="remove" className="text-body-md" />
                        </button>
                        <span className="px-4 font-bold min-w-[2.5rem] text-center">{qty}</span>
                        <button
                            type="button"
                            onClick={() => setQty((q) => Math.min(MAX_QTY, q + 1))}
                            aria-label="Increase quantity"
                            className="px-4 py-2 hover:bg-surface-container transition-colors"
                        >
                            <Icon name="add" className="text-body-md" />
                        </button>
                    </div>
                    <div className="flex items-center gap-stack-xs text-tertiary">
                        <Icon name="local_shipping" className="text-body-md" />
                        <span className="text-label-md">Free delivery by Tomorrow</span>
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-stack-sm mt-stack-sm">
                <button
                    type="button"
                    onClick={handleAddToCart}
                    className="flex-1 py-4 border-2 border-primary text-primary font-bold rounded-lg hover:bg-primary/5 active:scale-95 transition-all"
                >
                    Add to Cart
                </button>
                <button
                    type="button"
                    onClick={handleBuyNow}
                    className="flex-1 py-4 bg-primary-container text-white font-bold rounded-lg shadow-md hover:opacity-90 active:scale-95 transition-all"
                >
                    Buy Now
                </button>
            </div>

            {/* Seller */}
            <div className="bg-surface-container-low p-stack-md rounded-xl border border-outline-variant flex items-center justify-between">
                <div className="flex items-center gap-stack-md">
                    <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center text-white">
                        <Icon name="store" />
                    </div>
                    <div>
                        <div className="text-body-lg font-semibold">{product.seller.name}</div>
                        <div className="text-label-md text-tertiary">{product.seller.feedback}</div>
                    </div>
                </div>
                <button
                    type="button"
                    onClick={() => setFollowing((v) => !v)}
                    className="px-4 py-2 bg-secondary text-white text-label-md rounded-lg hover:opacity-90 transition-opacity"
                >
                    {following ? "Following" : "Follow"}
                </button>
            </div>
        </div>
    );
}