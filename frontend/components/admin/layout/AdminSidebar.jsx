"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon from "@/components/ui/Icon";

const navItems = [
  { label: "Dashboard", icon: "dashboard", href: "/admin/dashboard" },
  { label: "Users", icon: "group", href: "/admin/users" },
  { label: "Products", icon: "inventory_2", href: "/admin/products" },
  { label: "Categories", icon: "category", href: "/admin/categories" },
  { label: "Disputes", icon: "gavel", href: "/admin/disputes" },
  { label: "Settings", icon: "settings", href: "/admin/settings" }
];

export default function AdminSidebar({ profile, open, onClose }) {
  const pathname = usePathname();

  return (
    <>
      {open && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onClose} />}

      <aside
        className={`fixed left-0 top-0 h-full w-64 bg-on-secondary-fixed shadow-sm z-50 flex flex-col p-4 gap-2 transition-transform duration-300 lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="mb-8 px-4 flex items-center justify-between">
          <div>
            <h1 className="text-headline-md font-bold text-surface-container-lowest">MarketAdmin</h1>
            <p className="text-secondary-fixed-dim text-xs opacity-70">Global Controller</p>
          </div>
          <button type="button" onClick={onClose} className="lg:hidden text-on-secondary" aria-label="Close menu">
            <Icon name="close" />
          </button>
        </div>

        <nav className="space-y-1 flex-1">
          {navItems.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg active:scale-95 duration-100 transition-colors ${active
                    ? "bg-primary-container text-on-primary-container"
                    : "text-secondary-fixed-dim hover:bg-on-secondary-fixed-variant"
                  }`}
              >
                <Icon name={item.icon} />
                <span className="text-body-md">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto p-4 flex items-center gap-3 bg-on-secondary-fixed-variant rounded-xl">
          <div className="w-10 h-10 rounded-full border-2 border-primary overflow-hidden flex-shrink-0 bg-secondary flex items-center justify-center text-white font-bold text-xs">
            {profile.avatar ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={profile.avatar} alt={profile.name} className="w-full h-full object-cover" />
            ) : (
              profile.name.split(" ").map((w) => w[0]).join("")
            )}
          </div>
          <div className="overflow-hidden">
            <p className="text-surface-container-lowest font-bold text-sm truncate">{profile.name}</p>
            <p className="text-secondary-fixed-dim text-xs truncate">{profile.tier}</p>
          </div>
        </div>
      </aside>
    </>
  );
}