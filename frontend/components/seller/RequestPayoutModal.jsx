"use client";

import { useState } from "react";
import Icon from "@/components/ui/Icon";
import { formatPrice } from "@/lib/format";
import { PAYOUT_METHODS } from "@/lib/payouts";

const MIN_PAYOUT = 20;

export default function RequestPayoutModal({ availableBalance, onClose, onConfirm }) {
    const [amount, setAmount] = useState(availableBalance.toFixed(2));
    const [method, setMethod] = useState(PAYOUT_METHODS[0].value);
    const [error, setError] = useState("");

    function handleConfirm() {
        const value = Number(amount);
        if (!amount || Number.isNaN(value)) {
            setError("Enter an amount");
            return;
        }
        if (value < MIN_PAYOUT) {
            setError(`Minimum payout is ${formatPrice(MIN_PAYOUT)}`);
            return;
        }
        if (value > availableBalance) {
            setError("Amount exceeds your available balance");
            return;
        }
        onConfirm(value, method);
    }

    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="payout-modal-title"
            className="fixed inset-0 z-[60] flex items-center justify-center p-margin-mobile bg-black/50"
            onClick={onClose}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden"
            >
                <div className="flex justify-between items-center p-stack-lg border-b border-outline-variant">
                    <h3 id="payout-modal-title" className="text-headline-sm text-on-surface">
                        Request Payout
                    </h3>
                    <button type="button" onClick={onClose} aria-label="Close" className="text-secondary hover:text-error">
                        <Icon name="close" />
                    </button>
                </div>

                <div className="p-stack-lg space-y-stack-md">
                    <p className="text-body-sm text-on-surface-variant">
                        Available balance: <span className="font-bold text-on-surface">{formatPrice(availableBalance)}</span>
                    </p>

                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="payout-amount" className="text-label-md text-on-surface-variant">
                            Amount (৳)
                        </label>
                        <input
                            id="payout-amount"
                            type="number"
                            step="0.01"
                            value={amount}
                            onChange={(e) => {
                                setAmount(e.target.value);
                                setError("");
                            }}
                            className={`h-12 px-4 border rounded-lg outline-none focus:ring-2 focus:ring-primary-container/30 ${error ? "border-error" : "border-outline-variant"
                                }`}
                        />
                        {error && <p className="text-label-md text-error">{error}</p>}
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-label-md text-on-surface-variant">Payout Method</label>
                        <div className="space-y-2">
                            {PAYOUT_METHODS.map((m) => (
                                <label
                                    key={m.value}
                                    className={`flex items-center gap-3 border rounded-lg px-4 py-3 cursor-pointer transition-all ${method === m.value
                                            ? "border-2 border-primary bg-primary-fixed/30"
                                            : "border-outline-variant hover:border-primary-container"
                                        }`}
                                >
                                    <input
                                        type="radio"
                                        name="payout-method"
                                        value={m.value}
                                        checked={method === m.value}
                                        onChange={(e) => setMethod(e.target.value)}
                                        className="sr-only"
                                    />
                                    <Icon name={m.icon} className="text-secondary" />
                                    <span className="text-body-sm">{m.label}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-end gap-stack-sm pt-stack-sm">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-3 rounded-lg font-bold text-label-md border border-outline-variant text-on-surface hover:bg-surface-container transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={handleConfirm}
                            className="px-6 py-3 rounded-lg font-bold text-label-md bg-primary-container text-white hover:opacity-90 transition-all"
                        >
                            Confirm Request
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}