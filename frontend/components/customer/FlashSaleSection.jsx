"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Icon from "@/components/ui/Icon";
import { flashSaleProducts } from "@/constants/mockData";

// counts down to the end of today
function getTimeLeft() {
  const now = new Date();
  const end = new Date(now);
  end.setHours(23, 59, 59, 999);
  const diff = Math.max(0, end - now);
  const h = Math.floor(diff / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  return [h, m, s].map((n) => String(n).padStart(2, "0")).join(":");
}

export default function FlashSaleSection() {
  // start with a fixed value so server and client HTML match, then tick on the client
  const [timeLeft, setTimeLeft] = useState("00:00:00");

  useEffect(() => {
    setTimeLeft(getTimeLeft());
    const timer = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mt-stack-lg">
      <div className="flex items-center justify-between mb-stack-md">
        <div className="flex items-center gap-4">
          <h2 className="text-headline-lg text-on-secondary-fixed">Flash Sale</h2>
          <div className="flex items-center gap-2 bg-error-container text-on-error-container px-3 py-1 rounded font-bold">
            <Icon name="timer" className="text-[20px]" />
            <span>{timeLeft}</span>
          </div>
        </div>
        <Link href="/products?sort=deals" className="text-primary font-bold hover:underline">
          View All
        </Link>
      </div>

      <div className="flex gap-gutter overflow-x-auto hide-scrollbar pb-4">
        {flashSaleProducts.map((p) => (
          <Link
            key={p.id}
            href={`/products/${p.id}`}
            className="min-w-[240px] bg-white border border-outline-variant rounded-lg overflow-hidden shadow-sm hover:-translate-y-1 transition-transform"
          >
            <div className="h-48 relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
              <div className="absolute top-2 right-2 bg-primary-container text-white px-2 py-1 text-xs font-bold rounded">
                {p.discount}% OFF
              </div>
            </div>
            <div className="p-4 space-y-2">
              <h3 className="text-body-md text-on-secondary-fixed line-clamp-1">{p.name}</h3>
              <div className="flex items-baseline gap-2">
                <span className="text-primary font-bold text-lg">${p.price.toFixed(2)}</span>
                <span className="text-secondary opacity-50 line-through text-sm">
                  ${p.oldPrice.toFixed(2)}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}