"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon from "@/components/ui/Icon";

const navItems = [
  { label: "Dashboard", icon: "dashboard", href: "/seller/dashboard" },
  { label: "Products", icon: "inventory_2", href: "/seller/products" },
  { label: "Orders", icon: "shopping_cart", href: "/seller/orders" },
  { label: "Payouts", icon: "payments", href: "/seller/payouts" },
  { label: "Settings", icon: "settings", href: "/seller/settings" }
];

export default function SellerSidebar({ profile, open, onClose }) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile overlay */}
      {open && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onClose} />}

      <aside
        className={`fixed left-0 top-0 h-full w-64 bg-on-secondary-fixed shadow-md z-50 flex flex-col py-stack-lg transition-transform duration-300 lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="px-6 mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-headline-md font-bold text-on-primary">Vivid Market</h1>
            <p className="text-on-secondary opacity-70 text-label-md">Seller Portal</p>
          </div>
          <button type="button" onClick={onClose} className="lg:hidden text-on-secondary" aria-label="Close menu">
            <Icon name="close" />
          </button>
        </div>

        <nav className="flex-1">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const active = pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={`px-6 py-3 flex items-center gap-3 active:scale-95 duration-150 transition-colors ${active
                        ? "text-primary-container border-l-4 border-primary-container"
                        : "text-on-secondary opacity-70 hover:bg-on-secondary-fixed-variant hover:opacity-100"
                      }`}
                  >
                    <Icon name={item.icon} />
                    <span className="text-label-md">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <Link href="/seller/settings" className="mt-auto px-6 pt-6 border-t border-on-secondary-fixed-variant">
          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-on-secondary-fixed-variant transition-colors">
            <div className="w-10 h-10 rounded-full border-2 border-primary-container overflow-hidden flex-shrink-0 bg-secondary flex items-center justify-center text-white font-bold text-xs">
              {profile.avatar ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={profile.avatar} alt={profile.name} className="w-full h-full object-cover" />
              ) : (
                profile.name.split(" ").map((w) => w[0]).join("")
              )}
            </div>
            <div className="min-w-0">
              <p className="text-on-primary text-label-md truncate">{profile.name}</p>
              <p className="text-on-secondary opacity-60 text-[10px] truncate">{profile.tier}</p>
            </div>
          </div>
        </Link>
      </aside>
    </>
  );
}