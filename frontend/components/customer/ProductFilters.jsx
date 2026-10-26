"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Icon from "@/components/ui/Icon";
import { buildQuery } from "@/lib/productQuery";
import { categoryOptions, brandOptions } from "@/constants/mockProducts";

const ratingOptions = [
  { value: 5, label: "5 Stars" },
  { value: 4, label: "4+ Stars" },
  { value: 3, label: "3+ Stars" }
];

function toNum(v) {
  if (v === "" || v === null || v === undefined) return null;
  const n = Number(v);
  return Number.isNaN(n) ? null : n;
}

export default function ProductFilters({ filters }) {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false); // mobile only
  const [minPrice, setMinPrice] = useState(filters.minPrice ?? "");
  const [maxPrice, setMaxPrice] = useState(filters.maxPrice ?? "");

  // keep the price inputs in sync with the URL (e.g. after "Clear all filters")
  useEffect(() => {
    setMinPrice(filters.minPrice ?? "");
    setMaxPrice(filters.maxPrice ?? "");
  }, [filters.minPrice, filters.maxPrice]);

  function apply(patch) {
    router.push(`${pathname}${buildQuery({ ...filters, ...patch, page: 1 })}`, { scroll: false });
  }

  function toggleInList(key, value) {
    const list = filters[key];
    apply({ [key]: list.includes(value) ? list.filter((v) => v !== value) : [...list, value] });
  }

  function commitPrice() {
    apply({ minPrice: toNum(minPrice), maxPrice: toNum(maxPrice) });
  }

  function clearAll() {
    router.push(pathname, { scroll: false });
  }

  return (
    <div className="w-full md:w-64 flex-shrink-0">
      {/* Mobile toggle */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="md:hidden w-full flex items-center justify-between bg-white border border-outline-variant rounded-lg px-4 h-12 font-bold text-on-secondary-fixed"
      >
        <span className="flex items-center gap-2">
          <Icon name="tune" /> Filters
        </span>
        <Icon name={open ? "expand_less" : "expand_more"} />
      </button>

      <aside className={`${open ? "block" : "hidden"} md:block space-y-8 mt-4 md:mt-0`}>
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-headline-sm text-on-secondary-fixed">Filters</h3>
            <button onClick={clearAll} className="text-primary text-label-md hover:underline">
              Clear all filters
            </button>
          </div>

          {/* Categories */}
          <div className="mb-6">
            <h4 className="font-bold text-on-secondary-fixed mb-3">Categories</h4>
            <div className="space-y-2">
              {categoryOptions.map((c) => {
                const checked = filters.category.includes(c.slug);
                return (
                  <label key={c.slug} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleInList("category", c.slug)}
                      className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary-container"
                    />
                    <span
                      className={
                        checked
                          ? "text-primary font-bold"
                          : "text-on-surface-variant group-hover:text-primary transition-colors"
                      }
                    >
                      {c.name}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Price Range */}
          <div className="mb-6">
            <h4 className="font-bold text-on-secondary-fixed mb-3">Price Range</h4>
            <div className="space-y-4">
              <input
                type="range"
                min="0"
                max="1000"
                value={maxPrice === "" ? 1000 : maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                onPointerUp={commitPrice}
                onKeyUp={commitPrice}
                className="w-full h-2 bg-surface-container rounded-lg appearance-none cursor-pointer accent-primary-container"
              />
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  commitPrice();
                }}
                className="flex items-center gap-2"
              >
                <div className="relative flex-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm">$</span>
                  <input
                    type="number"
                    min="0"
                    placeholder="Min"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    onBlur={commitPrice}
                    className="w-full pl-7 pr-2 h-10 border border-outline-variant rounded bg-white text-sm"
                  />
                </div>
                <span className="text-on-surface-variant">to</span>
                <div className="relative flex-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm">$</span>
                  <input
                    type="number"
                    min="0"
                    placeholder="Max"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    onBlur={commitPrice}
                    className="w-full pl-7 pr-2 h-10 border border-outline-variant rounded bg-white text-sm"
                  />
                </div>
              </form>
            </div>
          </div>

          {/* Brands */}
          <div className="mb-6">
            <h4 className="font-bold text-on-secondary-fixed mb-3">Brands</h4>
            <div className="space-y-2">
              {brandOptions.map((b) => {
                const checked = filters.brand.includes(b);
                return (
                  <label key={b} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleInList("brand", b)}
                      className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary-container"
                    />
                    <span
                      className={
                        checked
                          ? "text-primary font-bold"
                          : "text-on-surface-variant group-hover:text-primary transition-colors"
                      }
                    >
                      {b}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Rating */}
          <div className="mb-6">
            <h4 className="font-bold text-on-secondary-fixed mb-3">Rating</h4>
            <div className="space-y-2">
              {ratingOptions.map((r) => {
                const active = filters.rating === r.value;
                return (
                  <button
                    key={r.value}
                    onClick={() => apply({ rating: active ? null : r.value })}
                    className="flex items-center gap-2 group w-full text-left"
                  >
                    <div className="flex text-[#FFD700]">
                      {[1, 2, 3, 4, 5].map((n) => (
                        <Icon key={n} name="star" filled={n <= r.value} />
                      ))}
                    </div>
                    <span
                      className={`text-sm ${active ? "text-primary font-bold" : "text-on-surface-variant group-hover:text-primary"
                        }`}
                    >
                      {r.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}