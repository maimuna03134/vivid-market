"use client";

import Link from "next/link";
import Icon from "@/components/ui/Icon";
import { toast } from "@/lib/toast";

const menu = [
    { key: "info", label: "Profile Info", icon: "person", href: "#profile-info" },
    { key: "addresses", label: "Addresses", icon: "location_on", href: "#addresses" },
    { key: "orders", label: "Orders", icon: "shopping_bag", href: "/orders" },
    { key: "wishlist", label: "Wishlist", icon: "favorite", href: null }
];

export default function ProfileSidebar({ profile, active, onAvatarChange }) {
    function handlePick(e) {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => onAvatarChange(reader.result);
        reader.readAsDataURL(file);
        toast.info("Photo preview only for now, it will upload once the backend is connected");
    }

    return (
        <aside className="w-full md:w-[30%] space-y-stack-lg">
            <div className="bg-surface-container-lowest p-stack-lg rounded-lg shadow-sm border border-outline-variant flex flex-col items-center text-center">
                <div className="relative group cursor-pointer">
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary-container shadow-md">
                        {profile.avatar ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={profile.avatar} alt={profile.fullName} className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-surface-container text-outline-variant">
                                <Icon name="person" className="text-[64px]" />
                            </div>
                        )}
                    </div>
                    <label className="absolute bottom-0 right-0 bg-primary-container text-white p-2 rounded-full shadow-lg border-2 border-white hover:scale-110 transition-transform cursor-pointer">
                        <Icon name="photo_camera" className="text-[20px]" />
                        <input type="file" accept="image/*" onChange={handlePick} className="sr-only" />
                    </label>
                </div>
                <div className="mt-stack-md">
                    <h1 className="text-headline-md font-bold text-on-secondary-fixed">{profile.fullName}</h1>
                    <p className="text-on-secondary-fixed-variant text-body-sm">{profile.email}</p>
                </div>
            </div>

            <nav className="bg-surface-container-lowest rounded-lg shadow-sm border border-outline-variant overflow-hidden">
                <ul className="flex flex-col">
                    {menu.map((item) => (
                        <li key={item.key} className="border-b border-outline-variant">
                            {item.href ? (
                                <Link
                                    href={item.href}
                                    className={`flex items-center gap-stack-md px-stack-lg py-4 transition-all ${active === item.key
                                            ? "text-primary font-bold bg-primary-container/10"
                                            : "text-on-secondary-fixed-variant hover:bg-surface-container-high"
                                        }`}
                                >
                                    <Icon name={item.icon} />
                                    <span className="text-label-md">{item.label}</span>
                                </Link>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() => toast.info("Wishlist is coming soon")}
                                    className="w-full flex items-center gap-stack-md px-stack-lg py-4 text-on-secondary-fixed-variant hover:bg-surface-container-high transition-colors"
                                >
                                    <Icon name={item.icon} />
                                    <span className="text-label-md">{item.label}</span>
                                </button>
                            )}
                        </li>
                    ))}
                    <li>
                        <button
                            type="button"
                            onClick={() => toast.info("Login/logout will be enabled once accounts are connected")}
                            className="w-full flex items-center gap-stack-md px-stack-lg py-4 text-error hover:bg-error/5 transition-colors"
                        >
                            <Icon name="logout" />
                            <span className="text-label-md">Logout</span>
                        </button>
                    </li>
                </ul>
            </nav>
        </aside>
    );
}