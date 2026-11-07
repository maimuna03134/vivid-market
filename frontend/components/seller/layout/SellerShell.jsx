"use client";

import { useState } from "react";
import SellerSidebar from "@/components/seller/layout/SellerSidebar";
import SellerTopbar from "@/components/seller/layout/SellerTopbar";
import { sellerProfile } from "@/constants/seller/dashboard";

export default function SellerShell({ children }) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <SellerSidebar profile={sellerProfile} open={open} onClose={() => setOpen(false)} />
            <SellerTopbar onMenuClick={() => setOpen(true)} />
            <main className="lg:ml-64 mt-[72px] p-margin-mobile md:p-margin-desktop min-h-screen bg-[#F4F5F7]">
                {children}
            </main>
        </>
    );
}