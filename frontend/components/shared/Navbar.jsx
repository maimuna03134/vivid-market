"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Icon from "@/components/ui/Icon";
import { useCartStore, selectCartCount } from "@/store/cartStore";

export default function Navbar() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [mounted, setMounted] = useState(false);
  const cartCount = useCartStore(selectCartCount);

  // cart is stored in localStorage, so only show the badge after mount (avoids hydration mismatch)
  useEffect(() => setMounted(true), []);

  function handleSearch(e) {
    e.preventDefault();
    const q = query.trim();
    router.push(q ? `/products?search=${encodeURIComponent(q)}` : "/products");
  }

  return (
    <nav className="fixed top-0 left-0 w-full z-50 h-[72px] bg-secondary flex items-center px-margin-mobile md:px-margin-desktop shadow-md">
      <div className="flex items-center justify-between w-full max-w-container-max mx-auto gap-gutter">
        <Link
          href="/"
          className="text-headline-md font-bold text-on-secondary whitespace-nowrap"
        >
          Vivid Market
        </Link>

        <form onSubmit={handleSearch} className="flex-grow max-w-2xl relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products..."
            className="w-full h-12 pl-12 pr-4 rounded-lg bg-white border-none focus:ring-2 focus:ring-primary-container text-on-secondary-fixed"
          />
          <Icon
            name="search"
            className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary-fixed-dim"
          />
        </form>

        <div className="flex items-center gap-6">
          <Link
            href="/cart"
            className="relative scale-95 active:scale-90 transition-transform text-on-secondary hover:opacity-80"
            aria-label="Cart"
          >
            <Icon name="shopping_cart" className="text-[28px]" />
            {mounted && cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary-container text-on-primary-container text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
          </Link>
          <Link
            href="/login"
            className="scale-95 active:scale-90 transition-transform text-on-secondary hover:opacity-80"
            aria-label="Account"
          >
            <Icon name="account_circle" className="text-[28px]" />
          </Link>
        </div>
      </div>
    </nav>
  );
}