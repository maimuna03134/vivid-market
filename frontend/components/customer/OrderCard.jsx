"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Icon from "@/components/ui/Icon";
import { useCartStore } from "@/store/cartStore";
import { formatPrice, formatDate } from "@/lib/format";
import { statusKey } from "@/lib/orders";
import { PAYMENT_METHODS } from "@/lib/checkout";
import { toast } from "@/lib/toast";

const STATUS = {
    processing: { label: "Processing", badge: "bg-amber-100 text-amber-800" },
    shipped: { label: "Shipped", badge: "bg-blue-100 text-blue-800" },
    delivered: { label: "Delivered", badge: "bg-green-100 text-green-800" },
    cancelled: { label: "Cancelled", badge: "bg-red-100 text-red-800" }
};

const MAX_TILES = 3;

function paymentLabel(order) {
    if (order.status === "cancelled") return "Cancelled";
    if (order.paymentStatus === "paid") return "Paid";
    return order.paymentMethod === "cod" ? "Pay on delivery" : "Payment pending";
}

export default function OrderCard({ order }) {
    const router = useRouter();
    const addItem = useCartStore((s) => s.addItem);
    const [expanded, setExpanded] = useState(false);

    const key = statusKey(order);
    const status = STATUS[key];
    const cancelled = key === "cancelled";
    const method = PAYMENT_METHODS.find((m) => m.value === order.paymentMethod);

    // up to 3 tiles; if there are more items, show 2 pictures and a "+N Items" tile
    const hasMore = order.items.length > MAX_TILES;
    const thumbs = hasMore ? order.items.slice(0, MAX_TILES - 1) : order.items;
    const extra = order.items.length - thumbs.length;

    function handleBuyAgain() {
        order.items.forEach((item) =>
            addItem(
                {
                    id: item.id,
                    productId: item.productId,
                    name: item.name,
                    price: item.price,
                    image: item.image,
                    variant: item.variant
                },
                item.qty
            )
        );
        toast.success(`${order.items.length} ${order.items.length === 1 ? "item" : "items"} added to cart`, {
            action: { label: "View Cart", onClick: () => router.push("/cart") }
        });
    }

    const outlineButton =
        "px-gutter py-stack-sm border-2 border-secondary text-secondary hover:bg-secondary hover:text-white transition-colors text-label-md rounded-lg";

    return (
        <div
            className={`bg-surface-container-lowest border border-outline-variant rounded-xl p-stack-md shadow-sm hover:shadow-md transition-all duration-300 ${cancelled ? "opacity-80" : ""
                }`}
        >
            {/* Header */}
            <div className="flex justify-between items-start gap-stack-md mb-stack-md">
                <div>
                    <h3 className="text-headline-sm text-secondary flex flex-wrap items-center gap-2">
                        Order #{order.id}
                        {order.isSample && (
                            <span className="text-label-md px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant font-normal">
                                Sample
                            </span>
                        )}
                    </h3>
                    <p className="text-body-sm text-on-surface-variant">Ordered on {formatDate(order.createdAt)}</p>
                </div>
                <span className={`px-stack-md py-1 rounded-full text-label-md whitespace-nowrap ${status.badge}`}>
                    {status.label}
                </span>
            </div>

            {/* Thumbnails */}
            <div
                className={`flex flex-wrap gap-stack-md py-stack-md border-y border-surface-variant mb-stack-md ${cancelled ? "grayscale" : ""
                    }`}
            >
                {thumbs.map((item) => (
                    <Link
                        key={item.id}
                        href={`/products/${item.productId}`}
                        title={item.name}
                        className="w-20 h-20 bg-surface-container-low rounded-lg overflow-hidden border border-outline-variant flex items-center justify-center"
                    >
                        {item.image ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        ) : (
                            <Icon name="image" className="text-outline-variant" />
                        )}
                    </Link>
                ))}
                {extra > 0 && (
                    <div className="w-20 h-20 rounded-lg border border-outline-variant flex items-center justify-center text-on-surface-variant text-label-md bg-surface-container-high text-center">
                        +{extra} {extra === 1 ? "Item" : "Items"}
                    </div>
                )}
            </div>

            {/* Total + actions */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-stack-sm">
                <div className={`text-price-lg ${cancelled ? "text-on-surface-variant" : "text-primary"}`}>
                    Total: {formatPrice(order.totals.total)}
                </div>
                <div className="flex flex-wrap gap-stack-sm">
                    {key === "shipped" && (
                        <button
                            type="button"
                            onClick={() => toast.info("Package tracking is coming soon")}
                            className="px-gutter py-stack-sm bg-primary-container text-white text-label-md rounded-lg active:scale-95 transition-transform shadow-md"
                        >
                            Track Package
                        </button>
                    )}
                    {key === "delivered" && (
                        <button
                            type="button"
                            onClick={handleBuyAgain}
                            className="px-gutter py-stack-sm border-2 border-primary text-primary hover:bg-primary-fixed-dim transition-colors text-label-md rounded-lg"
                        >
                            Buy Again
                        </button>
                    )}
                    <button type="button" onClick={() => setExpanded((v) => !v)} className={outlineButton}>
                        {expanded ? "Hide Details" : "View Details"}
                    </button>
                </div>
            </div>

            {/* Details */}
            {expanded && (
                <div className="mt-stack-md pt-stack-md border-t border-surface-variant grid grid-cols-1 md:grid-cols-2 gap-gutter">
                    <div className="space-y-stack-sm">
                        <h4 className="text-label-md uppercase text-on-surface-variant">Items</h4>
                        {order.items.map((item) => (
                            <div key={item.id} className="flex items-center gap-stack-sm">
                                <div className="w-12 h-12 bg-surface-container rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center">
                                    {item.image ? (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <Icon name="image" className="text-outline-variant" />
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-body-sm font-bold text-on-secondary-fixed line-clamp-1">{item.name}</p>
                                    <p className="text-label-md text-secondary">
                                        {item.variant ? `${item.variant} · ` : ""}
                                        {item.qty} × {formatPrice(item.price)}
                                    </p>
                                </div>
                                <span className="text-body-sm font-bold text-on-secondary-fixed">
                                    {formatPrice(item.price * item.qty)}
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className="space-y-stack-md">
                        <div>
                            <h4 className="text-label-md uppercase text-on-surface-variant mb-stack-xs">Shipping Address</h4>
                            <p className="text-body-sm text-on-surface leading-relaxed">
                                {order.shipping.fullName}
                                <br />
                                {order.shipping.phone}
                                <br />
                                {order.shipping.address}, {order.shipping.area}, {order.shipping.city}
                            </p>
                        </div>

                        <div>
                            <h4 className="text-label-md uppercase text-on-surface-variant mb-stack-xs">Payment</h4>
                            <p className="text-body-sm text-on-surface">
                                {method?.label} · {paymentLabel(order)}
                            </p>
                        </div>

                        <div className="space-y-stack-xs text-body-sm text-secondary">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>{formatPrice(order.totals.subtotal)}</span>
                            </div>
                            {order.totals.discount > 0 && (
                                <div className="flex justify-between">
                                    <span>Discount{order.coupon ? ` (${order.coupon})` : ""}</span>
                                    <span className="text-tertiary font-bold">-{formatPrice(order.totals.discount)}</span>
                                </div>
                            )}
                            <div className="flex justify-between">
                                <span>Shipping</span>
                                <span>{order.totals.shipping === 0 ? "Free" : formatPrice(order.totals.shipping)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Tax</span>
                                <span>{formatPrice(order.totals.tax)}</span>
                            </div>
                            <div className="flex justify-between pt-stack-xs border-t border-surface-variant font-bold text-on-secondary-fixed">
                                <span>Total</span>
                                <span>{formatPrice(order.totals.total)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}