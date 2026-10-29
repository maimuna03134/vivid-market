import { create } from "zustand";
import { persist } from "zustand/middleware";
import { mockProfile, mockAddresses } from "@/constants/mockProfile";

let addressSeq = mockAddresses.length;

export const useProfileStore = create(
    persist(
        (set) => ({
            profile: mockProfile,
            addresses: mockAddresses,

            updateProfile: (data) => set((state) => ({ profile: { ...state.profile, ...data } })),

            setAvatar: (avatar) => set((state) => ({ profile: { ...state.profile, avatar } })),

            addAddress: (data) =>
                set((state) => ({
                    addresses: [...state.addresses, { id: `addr-${++addressSeq}`, ...data }]
                })),

            updateAddress: (id, data) =>
                set((state) => ({
                    addresses: state.addresses.map((a) => (a.id === id ? { ...a, ...data } : a))
                })),

            removeAddress: (id) =>
                set((state) => ({ addresses: state.addresses.filter((a) => a.id !== id) }))
        }),
        { name: "vivid-profile" }
    )
);