"use client";

import Icon from "@/components/ui/Icon";
import { formatPrice, formatDate } from "@/lib/format";
import { orderTotals, STATUS_META } from "@/lib/sellerOrders";
import OrderStatusSelect from "@/components/seller/OrderStatusSelect";

export default function OrderDetailsModal({ order, onClose, onStatusChange }) {
    const { qty, amount } = orderTotals(order);

    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="order-modal-title"
            className="fixed inset-0 z-[60] flex items-center justify-center p-margin-mobile bg-black/50"
            onClick={onClose}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
            >
                <div className="flex justify-between items-center p-stack-lg border-b border-outline-variant">
                    <h3 id="order-modal-title" className="text-headline-sm text-on-surface">
                        Order #{order.id}
                    </h3>
                    <button type="button" onClick={onClose} aria-label="Close" className="text-secondary hover:text-error">
                        <Icon name="close" />
                    </button>
                </div>

                <div className="p-stack-lg space-y-stack-md">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="font-bold text-on-surface">{order.customerName}</p>
                            <p className="text-body-sm text-on-surface-variant">{order.customerEmail}</p>
                        </div>
                        <OrderStatusSelect
                            value={order.status}
                            onChange={(status) => onStatusChange(order.id, status)}
                            label={`Status for order ${order.id}`}
                        />
                    </div>

                    <div className="space-y-stack-sm">
                        <h4 className="text-label-md uppercase text-on-surface-variant">
                            Items ({qty})
                        </h4>
                        {order.items.map((item, i) => (
                            <div key={i} className="flex items-center gap-stack-sm">
                                <div className="w-12 h-12 bg-surface-container rounded overflow-hidden flex-shrink-0 border border-outline-variant flex items-center justify-center">
                                    {item.image ? (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <Icon name="image" className="text-outline-variant" />
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-body-sm font-bold text-on-surface line-clamp-1">{item.name}</p>
                                    <p className="text-label-md text-on-surface-variant">
                                        {item.qty} × {formatPrice(item.price)}
                                    </p>
                                </div>
                                <span className="text-body-sm font-bold text-on-surface">
                                    {formatPrice(item.price * item.qty)}
                                </span>
                            </div>
                        ))}
                    </div>

                    <div>
                        <h4 className="text-label-md uppercase text-on-surface-variant mb-1">Shipping Address</h4>
                        <p className="text-body-sm text-on-surface">{order.shippingAddress}</p>
                    </div>

                    <div>
                        <h4 className="text-label-md uppercase text-on-surface-variant mb-1">Order Date</h4>
                        <p className="text-body-sm text-on-surface">{formatDate(order.date)}</p>
                    </div>

                    <div className="pt-stack-sm border-t border-outline-variant flex justify-between items-center">
                        <span className="text-headline-sm text-on-surface">Order Total</span>
                        <span className="text-price-lg text-primary">{formatPrice(amount)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}