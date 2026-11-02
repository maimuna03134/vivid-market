"use client";

import Icon from "@/components/ui/Icon";
import { formatPrice } from "@/lib/format";
import { adminProfile } from "@/constants/mockAdmin";

export default function ProductApprovalModal({ product, onClose, onApprove, onReject }) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="approval-modal-title"
      className="fixed inset-0 bg-on-secondary-fixed/60 backdrop-blur-sm z-[100] flex items-center justify-center p-margin-mobile"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden"
      >
        <div className="flex flex-col md:flex-row h-full max-h-[90vh]">
          {/* Image side */}
          <div className="md:w-1/2 bg-surface-container-low relative h-64 md:h-auto flex-shrink-0">
            {product.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-outline-variant">
                <Icon name="image" className="text-[96px]" />
              </div>
            )}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute top-4 left-4 w-10 h-10 bg-white/80 backdrop-blur rounded-full flex items-center justify-center hover:bg-white transition-all shadow-md"
            >
              <Icon name="close" />
            </button>
          </div>

          {/* Content side */}
          <div className="md:w-1/2 p-8 flex flex-col overflow-y-auto">
            <div className="mb-6">
              <span className="text-label-md text-primary font-bold uppercase tracking-widest mb-2 block">
                Pending Approval
              </span>
              <h2 id="approval-modal-title" className="text-headline-lg font-bold text-on-surface mb-2">
                {product.name}
              </h2>
              <p className="text-body-md text-on-surface-variant">
                Submitted by <span className="font-semibold text-on-surface">{adminProfile.name}&apos;s Store</span>
              </p>
            </div>

            <div className="space-y-6 mb-8">
              <div>
                <h5 className="text-label-md text-outline mb-2 uppercase">Description</h5>
                <p className="text-body-sm text-on-surface leading-relaxed">{product.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h5 className="text-label-md text-outline mb-1 uppercase">Price</h5>
                  <p className="text-headline-sm font-bold text-primary">{formatPrice(product.price)}</p>
                </div>
                <div>
                  <h5 className="text-label-md text-outline mb-1 uppercase">Stock</h5>
                  <p className="text-headline-sm font-bold text-on-surface">{product.stock} Units</p>
                </div>
              </div>

              <div>
                <h5 className="text-label-md text-outline mb-2 uppercase">Details</h5>
                <ul className="text-body-sm space-y-1 list-disc pl-4 text-on-surface">
                  <li>SKU: {product.sku}</li>
                  <li>Category: {product.category}</li>
                  {product.variants?.length > 0 &&
                    product.variants.map((v) => (
                      <li key={v.id}>
                        {v.attribute}: {v.values}
                      </li>
                    ))}
                </ul>
              </div>

              {product.tags?.length > 0 && (
                <div>
                  <h5 className="text-label-md text-outline mb-2 uppercase">Tags</h5>
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
                </div>
              )}
            </div>

            <div className="mt-auto flex gap-3 border-t border-outline-variant pt-6">
              <button
                type="button"
                onClick={() => onReject(product)}
                className="flex-1 px-4 py-3 border border-error text-error rounded-xl font-bold hover:bg-error/5 transition-all"
              >
                Reject Submission
              </button>
              <button
                type="button"
                onClick={() => onApprove(product)}
                className="flex-1 px-4 py-3 bg-tertiary-container text-white rounded-xl font-bold hover:brightness-110 transition-all shadow-lg shadow-tertiary-container/20"
              >
                Approve Product
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}