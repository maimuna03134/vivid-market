"use client";

import { useState } from "react";
import Icon from "@/components/ui/Icon";
import Stars from "@/components/ui/Stars";
import ReviewCard from "@/components/customer/ReviewCard";
import { toast } from "@/lib/toast";

const tabs = [
    { key: "description", label: "Description" },
    { key: "specifications", label: "Specifications" },
    { key: "reviews", label: "Reviews" }
];

export default function ProductTabs({ product }) {
    const [tab, setTab] = useState("reviews");
    const [showAll, setShowAll] = useState(false);

    const visibleReviews = showAll ? product.reviewList : product.reviewList.slice(0, 2);

    return (
        <section className="mt-stack-lg border-t border-outline-variant pt-stack-lg">
            {/* Tab buttons */}
            <div className="flex border-b border-outline-variant gap-stack-lg mb-stack-lg overflow-x-auto">
                {tabs.map((t) => (
                    <button
                        key={t.key}
                        type="button"
                        onClick={() => setTab(t.key)}
                        className={`pb-4 text-headline-sm transition-colors whitespace-nowrap ${tab === t.key
                                ? "border-b-4 border-primary text-primary"
                                : "text-on-surface-variant hover:text-primary"
                            }`}
                    >
                        {t.label}
                    </button>
                ))}
            </div>

            {/* Description */}
            {tab === "description" && (
                <div className="max-w-3xl space-y-stack-md">
                    <p className="text-body-md text-on-surface-variant leading-relaxed">{product.description}</p>
                    <ul className="space-y-stack-sm">
                        {product.features.map((f) => (
                            <li key={f} className="flex items-start gap-stack-sm text-body-md text-on-surface-variant">
                                <Icon name="check_circle" filled className="text-tertiary text-[20px]" />
                                <span>{f}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Specifications */}
            {tab === "specifications" && (
                <div className="max-w-3xl bg-white border border-outline-variant rounded-xl overflow-hidden">
                    {product.specs.map(([label, value], i) => (
                        <div
                            key={label}
                            className={`flex gap-stack-md px-stack-md py-3 text-body-md ${i % 2 === 0 ? "bg-surface-container-low" : "bg-white"
                                }`}
                        >
                            <span className="w-40 flex-shrink-0 font-bold text-on-secondary-fixed">{label}</span>
                            <span className="text-on-surface-variant">{value}</span>
                        </div>
                    ))}
                </div>
            )}

            {/* Reviews */}
            {tab === "reviews" && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
                    <div className="lg:col-span-4 flex flex-col gap-stack-md">
                        <div className="bg-white p-stack-md rounded-xl shadow-sm border border-outline-variant">
                            <h3 className="text-headline-sm mb-stack-md">Customer Ratings</h3>
                            <div className="flex items-end gap-stack-sm mb-stack-lg">
                                <span className="text-display-lg font-bold">{product.rating}</span>
                                <div className="flex flex-col">
                                    <Stars rating={5} />
                                    <span className="text-label-md text-on-surface-variant">
                                        Based on {product.reviews.toLocaleString("en-US")} reviews
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-stack-sm">
                                {product.ratingBreakdown.map((pct, i) => (
                                    <div key={i} className="flex items-center gap-stack-sm">
                                        <span className="text-label-md w-12 whitespace-nowrap">{5 - i} Star</span>
                                        <div className="flex-grow bg-surface-container h-2 rounded-full overflow-hidden">
                                            <div className="bg-primary h-full" style={{ width: `${pct}%` }} />
                                        </div>
                                        <span className="text-label-md w-10 text-right">{pct}%</span>
                                    </div>
                                ))}
                            </div>

                            <button
                                type="button"
                                onClick={() => toast.info("Please login to write a review")}
                                className="w-full mt-stack-lg py-3 border border-outline text-on-surface font-bold rounded-lg hover:bg-surface-container transition-colors"
                            >
                                Write a Review
                            </button>
                        </div>
                    </div>

                    <div className="lg:col-span-8 space-y-stack-md">
                        {visibleReviews.map((review, i) => (
                            <ReviewCard key={review.id} review={review} index={i} />
                        ))}
                        {product.reviewList.length > 2 && (
                            <button
                                type="button"
                                onClick={() => setShowAll((v) => !v)}
                                className="w-full py-4 text-primary font-bold flex items-center justify-center gap-stack-sm hover:underline"
                            >
                                {showAll ? "Show less" : `View all ${product.reviews.toLocaleString("en-US")} reviews`}
                                <Icon name={showAll ? "expand_less" : "expand_more"} />
                            </button>
                        )}
                    </div>
                </div>
            )}
        </section>
    );
}