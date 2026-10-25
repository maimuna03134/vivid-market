"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon from "@/components/ui/Icon";

const items = [
    { label: "Home", icon: "home", href: "/" },
    { label: "Categories", icon: "grid_view", href: "/products" },
    { label: "Deals", icon: "bolt", href: "/products?sort=deals" },
    { label: "Profile", icon: "person", href: "/profile" }
];

export default function MobileBottomNav() {
    const pathname = usePathname();

    return (
        <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-2 md:hidden bg-surface border-t border-outline-variant shadow-lg rounded-t-xl">
            {items.map((item) => {
                const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href.split("?")[0]);
                return (
                    <Link
                        key={item.label}
                        href={item.href}
                        className={`flex flex-col items-center justify-center rounded-full px-4 py-1 transition-all ${active
                                ? "bg-primary-container text-on-primary-container"
                                : "text-on-surface-variant hover:bg-surface-container-high"
                            }`}
                    >
                        <Icon name={item.icon} />
                        <span className="text-label-md text-[10px]">{item.label}</span>
                    </Link>
                );
            })}
        </nav>
    );
}