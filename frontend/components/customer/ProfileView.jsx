"use client";

import { useEffect, useState } from "react";
import Icon from "@/components/ui/Icon";
import ProfileSidebar from "@/components/customer/ProfileSidebar";
import ProfileInfoForm from "@/components/customer/ProfileInfoForm";
import AddressCard from "@/components/customer/AddressCard";
import AddressFormModal from "@/components/customer/AddressFormModal";
import { useProfileStore } from "@/store/profileStore";
import { toast } from "@/lib/toast";

export default function ProfileView() {
    const profile = useProfileStore((s) => s.profile);
    const addresses = useProfileStore((s) => s.addresses);
    const updateProfile = useProfileStore((s) => s.updateProfile);
    const setAvatar = useProfileStore((s) => s.setAvatar);
    const addAddress = useProfileStore((s) => s.addAddress);
    const updateAddress = useProfileStore((s) => s.updateAddress);
    const removeAddress = useProfileStore((s) => s.removeAddress);

    const [mounted, setMounted] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingAddress, setEditingAddress] = useState(null); // null = adding new
    const [deleteTarget, setDeleteTarget] = useState(null);

    // profile/addresses live in localStorage, so wait for the browser before showing them
    useEffect(() => setMounted(true), []);

    function openAdd() {
        setEditingAddress(null);
        setModalOpen(true);
    }

    function openEdit(address) {
        setEditingAddress(address);
        setModalOpen(true);
    }

    function handleSaveAddress(data) {
        if (editingAddress) {
            updateAddress(editingAddress.id, data);
            toast.success("Address updated");
        } else {
            addAddress(data);
            toast.success("Address added");
        }
        setModalOpen(false);
        setEditingAddress(null);
    }

    function confirmDelete() {
        removeAddress(deleteTarget.id);
        toast.success("Address removed");
        setDeleteTarget(null);
    }

    if (!mounted) {
        return (
            <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mt-stack-lg py-stack-lg">
                <div className="flex flex-col md:flex-row gap-gutter animate-pulse">
                    <div className="w-full md:w-[30%] h-96 bg-surface-container rounded-lg" />
                    <div className="w-full md:w-[70%] h-96 bg-surface-container rounded-lg" />
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mt-stack-lg py-stack-lg">
            <div className="flex flex-col md:flex-row gap-gutter">
                <ProfileSidebar profile={profile} active="info" onAvatarChange={setAvatar} />

                <section className="w-full md:w-[70%] space-y-stack-lg">
                    <ProfileInfoForm profile={profile} onSave={updateProfile} />

                    <div id="addresses" className="bg-white p-stack-lg rounded-lg shadow-sm border border-outline-variant scroll-mt-24">
                        <div className="flex justify-between items-center mb-stack-lg border-b border-outline-variant pb-stack-sm">
                            <h2 className="text-headline-sm text-on-secondary-fixed">Saved Addresses</h2>
                            <button
                                type="button"
                                onClick={openAdd}
                                className="flex items-center gap-1 text-primary font-bold text-label-md hover:underline decoration-2 underline-offset-4"
                            >
                                <Icon name="add_circle" className="text-[18px]" />
                                Add New Address
                            </button>
                        </div>

                        {addresses.length > 0 ? (
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-stack-md">
                                {addresses.map((address) => (
                                    <AddressCard
                                        key={address.id}
                                        address={address}
                                        onEdit={() => openEdit(address)}
                                        onDelete={() => setDeleteTarget(address)}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-stack-lg text-on-surface-variant">
                                <Icon name="location_off" className="text-[48px] text-outline-variant" />
                                <p className="mt-2">No saved addresses yet.</p>
                            </div>
                        )}
                    </div>
                </section>
            </div>

            {modalOpen && (
                <AddressFormModal
                    editing={editingAddress}
                    onSave={handleSaveAddress}
                    onClose={() => {
                        setModalOpen(false);
                        setEditingAddress(null);
                    }}
                />
            )}

            {deleteTarget && (
                <div
                    role="dialog"
                    aria-modal="true"
                    className="fixed inset-0 z-[60] flex items-center justify-center p-margin-mobile bg-black/50"
                    onClick={() => setDeleteTarget(null)}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="bg-white rounded-xl shadow-xl w-full max-w-sm p-stack-lg text-center"
                    >
                        <Icon name="delete" className="text-error text-[40px]" />
                        <h3 className="text-headline-sm text-on-secondary-fixed mt-stack-sm">Remove this address?</h3>
                        <p className="text-body-sm text-on-surface-variant mt-1">
                            {deleteTarget.line1} will be removed from your saved addresses.
                        </p>
                        <div className="flex justify-center gap-stack-sm mt-stack-lg">
                            <button
                                type="button"
                                onClick={() => setDeleteTarget(null)}
                                className="px-6 py-3 rounded-lg font-bold text-label-md border border-outline-variant text-on-surface hover:bg-surface-container transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={confirmDelete}
                                className="px-6 py-3 rounded-lg font-bold text-label-md bg-error text-white hover:opacity-90 transition-all"
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}