"use client";

import { useState } from "react";
import AdminSidebar from "@/components/admin/layout/AdminSidebar";
import AdminTopbar from "@/components/admin/layout/AdminTopbar";
import { adminProfile } from "@/constants/admin/dashboard";

export default function AdminShell({ children }) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <AdminSidebar profile={adminProfile} open={open} onClose={() => setOpen(false)} />
            <AdminTopbar onMenuClick={() => setOpen(true)} />
            <main className="lg:ml-64 mt-[72px] p-margin-mobile md:p-margin-desktop min-h-screen bg-background space-y-gutter">
                {children}
            </main>
        </>
    );
}