"use client";

import Icon from "@/components/ui/Icon";
import { formatPrice, formatDate } from "@/lib/format";
import { adminProfile } from "@/constants/mockAdmin";

export default function ProductApprovalCard({ product, onView, onApprove, onReject }) {
  const submitted = product.submittedAt || new Date().toISOString();

  return (
    <div className="bg-white rounded-xl border border-outline-variant shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden flex flex-col group">
      <div className="relative h-48 w-full overflow-hidden bg-surface-container">
        {product.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-outline-variant">
            <Icon name="image" className="text-[64px]" />
          </div>
        )}
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider text-on-surface border border-outline-variant">
          {product.category}
        </div>
      </div>

      <div className="p-5 flex-1">
        <div className="flex justify-between items-start gap-3 mb-2">
          <h4 className="text-headline-sm text-on-surface leading-tight">{product.name}</h4>
          <span className="text-price-lg text-primary whitespace-nowrap">{formatPrice(product.price)}</span>
        </div>
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <div className="w-6 h-6 rounded-full bg-surface-container-high flex items-center justify-center">
            <Icon name="store" className="text-[14px]" />
          </div>
          <span className="text-body-sm text-on-surface-variant">{adminProfile.name}&apos;s Store</span>
          <span className="mx-1 text-outline-variant">•</span>
          <span className="text-[12px] text-outline">{formatDate(submitted)}</span>
        </div>
        {product.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {product.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-surface-container-low text-[11px] font-semibold text-on-surface-variant rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="p-5 bg-surface-container-low/50 border-t border-outline-variant flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => onView(product)}
          className="text-primary text-label-md hover:underline underline-offset-4"
        >
          View Details
        </button>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => onReject(product)}
            className="px-4 py-2 border border-error text-error rounded-lg text-body-sm font-bold hover:bg-error-container/20 transition-all"
          >
            Reject
          </button>
          <button
            type="button"
            onClick={() => onApprove(product)}
            className="px-4 py-2 bg-tertiary-container text-white rounded-lg text-body-sm font-bold hover:brightness-110 shadow-sm transition-all"
          >
            Approve
          </button>
        </div>
      </div>
    </div>
  );
}