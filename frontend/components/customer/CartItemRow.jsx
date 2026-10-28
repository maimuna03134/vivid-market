"use client";

import { useState } from "react";
import Link from "next/link";
import Icon from "@/components/ui/Icon";
import { useCartStore } from "@/store/cartStore";

const MAX_QTY = 99;

export default function CartItemRow({ item }) {
  const updateQty = useCartStore((s) => s.updateQty);
  const removeItem = useCartStore((s) => s.removeItem);
  const [removing, setRemoving] = useState(false);

  // fade the row out first, then remove it from the cart
  function handleRemove() {
    setRemoving(true);
    setTimeout(() => removeItem(item.id), 300);
  }

  return (
    <article
      className={`bg-surface-container-lowest p-stack-md rounded-xl border border-outline-variant shadow-sm flex flex-col sm:flex-row gap-stack-md relative group transition-all duration-300 hover:shadow-md ${removing ? "opacity-0 translate-x-5" : ""
        }`}
    >
      <Link
        href={`/products/${item.productId}`}
        className="w-full sm:w-32 h-32 flex-shrink-0 bg-surface-container rounded-lg overflow-hidden block"
      >
        {item.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-outline-variant">
            <Icon name="image" className="text-[48px]" />
          </div>
        )}
      </Link>

      <div className="flex flex-col justify-between flex-grow py-1">
        <div>
          <div className="flex justify-between items-start gap-stack-md">
            <Link href={`/products/${item.productId}`}>
              <h3 className="text-headline-sm text-on-surface hover:text-primary transition-colors">
                {item.name}
              </h3>
            </Link>
            <div className="text-right flex-shrink-0">
              <span className="text-price-lg text-primary">${item.price.toFixed(2)}</span>
              {item.qty > 1 && (
                <p className="text-label-md text-on-surface-variant mt-1">
                  ${(item.price * item.qty).toFixed(2)} total
                </p>
              )}
            </div>
          </div>
          {item.variant && (
            <p className="text-body-sm text-on-surface-variant mt-1">{item.variant}</p>
          )}
        </div>

        <div className="flex items-center justify-between mt-stack-sm">
          {/* Quantity stepper */}
          <div className="flex items-center border border-outline-variant rounded-lg bg-surface">
            <button
              type="button"
              onClick={() => updateQty(item.id, item.qty - 1)}
              disabled={item.qty <= 1}
              aria-label="Decrease quantity"
              className="w-10 h-10 flex items-center justify-center hover:bg-surface-container-high transition-colors active:scale-90 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Icon name="remove" className="text-body-md" />
            </button>
            <span className="w-10 text-center font-bold text-body-md">{item.qty}</span>
            <button
              type="button"
              onClick={() => updateQty(item.id, Math.min(MAX_QTY, item.qty + 1))}
              aria-label="Increase quantity"
              className="w-10 h-10 flex items-center justify-center hover:bg-surface-container-high transition-colors active:scale-90"
            >
              <Icon name="add" className="text-body-md" />
            </button>
          </div>

          <button
            type="button"
            onClick={handleRemove}
            className="flex items-center gap-1 text-error text-label-md hover:opacity-70 transition-opacity"
          >
            <Icon name="delete" className="text-[20px]" />
            REMOVE
          </button>
        </div>
      </div>
    </article>
  );
}