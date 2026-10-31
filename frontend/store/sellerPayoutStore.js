import { create } from "zustand";
import { persist } from "zustand/middleware";
import { mockPayouts, availableBalance as initialBalance } from "@/constants/mockPayouts";

// Temporary: payouts and balance are kept in the browser.
// Once the backend is ready this becomes GET /api/seller/analytics + POST /api/payout/request.
export const useSellerPayoutStore = create(
    persist(
        (set) => ({
            payouts: mockPayouts,
            balance: initialBalance,

            requestPayout: (amount, method) =>
                set((state) => ({
                    balance: state.balance - amount,
                    payouts: [
                        {
                            id: `po-${Date.now().toString(36)}`,
                            date: new Date().toISOString(),
                            transactionId: `TXN-${Math.floor(90000 + Math.random() * 9000)}-VP`,
                            amount,
                            method,
                            status: "pending"
                        },
                        ...state.payouts
                    ]
                }))
        }),
        { name: "vivid-seller-payouts" }
    )
);