"use client";

import { useState } from "react";
import Link from "next/link";
import Icon from "@/components/ui/Icon";
import { useCartStore } from "@/store/cartStore";
import { toast } from "@/lib/toast";

export default function ProductListCard({ product }) {
    const addItem = useCartStore((s) => s.addItem);
    const [liked, setLiked] = useState(false);
    const filledStars = Math.round(product.rating || 0);

    function handleAddToCart() {
        addItem(product);
        toast.success(`${product.name} added to cart`);
    }

    return (
        <div className="group relative bg-white rounded-xl border border-outline-variant overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            {product.discount > 0 && (
                <div className="absolute top-3 left-3 z-10">
                    <span className="bg-primary-container text-white px-2 py-1 rounded font-bold text-xs uppercase tracking-wider">
                        -{product.discount}%
                    </span>
                </div>
            )}

            <button
                onClick={() => setLiked((v) => !v)}
                aria-label="Add to wishlist"
                className={`absolute top-3 right-3 z-10 w-10 h-10 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-full transition-colors hover:scale-110 active:scale-95 ${liked ? "text-primary" : "text-on-surface-variant hover:text-primary"
                    }`}
            >
                <Icon name="favorite" filled={liked} />
            </button>

            <div className="relative h-48 w-full overflow-hidden bg-surface-container-low">
                <Link href={`/products/${product.id}`} className="block w-full h-full" aria-label={product.name}>
                    {product.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-outline-variant">
                            <Icon name="image" className="text-[64px]" />
                        </div>
                    )}
                </Link>

                {/* Quick add: always visible on mobile, shows on hover on desktop */}
                <div className="absolute inset-x-0 bottom-0 p-4 transition-all duration-300 opacity-100 translate-y-0 md:opacity-0 md:translate-y-4 md:group-hover:opacity-100 md:group-hover:translate-y-0">
                    <button
                        onClick={handleAddToCart}
                        className="w-full py-3 bg-on-secondary-fixed text-white font-bold rounded-lg flex items-center justify-center gap-2 hover:opacity-90 active:scale-95"
                    >
                        <Icon name="shopping_bag" className="text-[20px]" />
                        Add to Cart
                    </button>
                </div>
            </div>

            <div className="p-4">
                <Link href={`/products/${product.id}`}>
                    <h3 className="text-headline-sm text-on-secondary-fixed mb-1 line-clamp-2 leading-tight h-14">
                        {product.name}
                    </h3>
                </Link>
                <div className="flex items-center gap-2 mb-3">
                    <div className="flex text-[#FFD700] scale-75 origin-left -mr-6">
                        {[1, 2, 3, 4, 5].map((n) => (
                            <Icon key={n} name="star" filled={n <= filledStars} />
                        ))}
                    </div>
                    <span className="text-xs text-on-surface-variant">({product.reviews})</span>
                </div>
                <div className="flex items-baseline gap-3">
                    <span className="text-price-lg text-primary-container">${product.price.toFixed(2)}</span>
                    {product.oldPrice && (
                        <span className="text-sm text-on-surface-variant line-through decoration-primary-container/30">
                            ${product.oldPrice.toFixed(2)}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}