"use client";

import Link from "next/link";
import Icon from "@/components/ui/Icon";
import { useCartStore } from "@/store/cartStore";
import { toast } from "@/lib/toast";

export default function ProductCard({ product }) {
  const addItem = useCartStore((s) => s.addItem);
  const filledStars = Math.round(product.rating || 0);

  function handleAddToCart() {
    addItem(product);
    toast.success(`${product.name} added to cart`);
  }

  return (
    <div className="bg-white border border-outline-variant rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full group">
      <Link href={`/products/${product.id}`} className="h-64 relative bg-surface overflow-hidden block">
        {product.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-surface-container text-outline-variant">
            <Icon name="image" className="text-[64px]" />
          </div>
        )}
        {product.discount > 0 && (
          <div className="absolute top-3 left-3 bg-primary-container text-white px-2 py-1 text-xs font-bold rounded">
            {product.discount}% OFF
          </div>
        )}
      </Link>

      <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-center gap-1 text-[#FFB400] mb-1">
            {[1, 2, 3, 4, 5].map((n) => (
              <Icon key={n} name="star" filled={n <= filledStars} className="text-sm" />
            ))}
            <span className="text-secondary font-bold text-xs ml-1">{product.rating}</span>
          </div>
          <Link href={`/products/${product.id}`}>
            <h3 className="text-body-lg text-on-secondary-fixed font-semibold">{product.name}</h3>
          </Link>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-primary font-bold text-xl">${product.price.toFixed(2)}</span>
          <button
            onClick={handleAddToCart}
            className="bg-on-secondary-fixed text-white text-xs font-bold py-2 px-4 rounded hover:bg-primary-container transition-colors uppercase tracking-wider"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}