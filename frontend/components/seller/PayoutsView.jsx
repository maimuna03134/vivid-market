"use client";

import { useEffect, useMemo, useState } from "react";
import Icon from "@/components/ui/Icon";
import PayoutHistoryTable from "@/components/seller/PayoutHistoryTable";
import RequestPayoutModal from "@/components/seller/RequestPayoutModal";
import { useSellerPayoutStore } from "@/store/sellerPayoutStore";
import { DATE_RANGES, filterByRange, payoutStats, PAYOUT_METHODS } from "@/lib/payouts";
import { nextPayoutDate } from "@/constants/mockPayouts";
import { formatPrice, formatDate } from "@/lib/format";
import { toast } from "@/lib/toast";

const PAGE_SIZE = 6;

export default function PayoutsView() {
    const payouts = useSellerPayoutStore((s) => s.payouts);
    const balance = useSellerPayoutStore((s) => s.balance);
    const requestPayout = useSellerPayoutStore((s) => s.requestPayout);

    const [mounted, setMounted] = useState(false);
    const [range, setRange] = useState("30d");
    const [page, setPage] = useState(1);
    const [modalOpen, setModalOpen] = useState(false);

    // payouts live in localStorage, so wait for the browser before showing them
    useEffect(() => setMounted(true), []);

    const stats = useMemo(() => payoutStats(payouts, balance), [payouts, balance]);
    const filtered = useMemo(() => filterByRange(payouts, range), [payouts, range]);

    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    const currentPage = Math.min(page, totalPages);
    const start = (currentPage - 1) * PAGE_SIZE;
    const visible = filtered.slice(start, start + PAGE_SIZE);

    function handleConfirmPayout(amount, method) {
        requestPayout(amount, method);
        const label = PAYOUT_METHODS.find((m) => m.value === method)?.value === "bank" ? "Bank Transfer" : "PayPal";
        toast.success(`Payout of ${formatPrice(amount)} requested via ${label}`);
        setModalOpen(false);
    }

    return (
        <>
            <div className="mb-stack-lg">
                <h2 className="text-headline-lg text-on-surface">Payouts</h2>
                <p className="text-on-surface-variant text-body-md">Track your earnings and withdrawal history.</p>
            </div>

            {/* Hero balance card */}
            <div className="bg-gradient-to-br from-on-secondary-fixed to-secondary rounded-xl p-8 mb-stack-lg shadow-lg relative overflow-hidden">
                <div className="relative flex flex-col md:flex-row md:items-end justify-between gap-stack-md">
                    <div>
                        <p className="text-white/70 text-label-md uppercase tracking-wider mb-2">Available Balance</p>
                        <p className="text-white text-[40px] font-bold leading-none">
                            {mounted ? formatPrice(stats.available) : "–"}
                        </p>
                        <p className="text-white/60 text-body-sm mt-2">
                            Next scheduled payout: {formatDate(nextPayoutDate)}
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={() => setModalOpen(true)}
                        disabled={!mounted || stats.available <= 0}
                        className="px-8 py-3.5 bg-primary-container text-white font-bold rounded-lg shadow-md hover:opacity-90 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                    >
                        Request Payout
                    </button>
                </div>
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-gutter mb-stack-lg">
                <div className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant shadow-sm">
                    <div className="flex items-center gap-2 text-on-surface-variant text-label-md mb-2">
                        <Icon name="hourglass_top" className="text-[18px]" />
                        Processing
                    </div>
                    <p className="text-headline-md text-on-surface">{mounted ? formatPrice(stats.processing) : "–"}</p>
                </div>
                <div className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant shadow-sm">
                    <div className="flex items-center gap-2 text-on-surface-variant text-label-md mb-2">
                        <Icon name="event_available" className="text-[18px]" />
                        Next Payout Date
                    </div>
                    <p className="text-headline-md text-on-surface">{formatDate(nextPayoutDate)}</p>
                </div>
                <div className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant shadow-sm">
                    <div className="flex items-center gap-2 text-on-surface-variant text-label-md mb-2">
                        <Icon name="savings" className="text-[18px]" />
                        Total Withdrawn
                    </div>
                    <p className="text-headline-md text-on-surface">{mounted ? formatPrice(stats.totalWithdrawn) : "–"}</p>
                </div>
            </div>

            {/* Date range filter */}
            <div className="flex justify-end mb-stack-sm">
                <select
                    value={range}
                    onChange={(e) => {
                        setRange(e.target.value);
                        setPage(1);
                    }}
                    className="h-10 px-3 border border-outline-variant rounded-lg bg-white text-body-sm outline-none focus:ring-2 focus:ring-primary-container"
                >
                    {DATE_RANGES.map((r) => (
                        <option key={r.value} value={r.value}>
                            {r.label}
                        </option>
                    ))}
                </select>
            </div>

            {!mounted ? (
                <div className="h-80 bg-surface-container rounded-xl animate-pulse" />
            ) : visible.length > 0 ? (
                <PayoutHistoryTable
                    payouts={visible}
                    page={currentPage}
                    totalPages={totalPages}
                    from={start + 1}
                    to={start + visible.length}
                    total={filtered.length}
                    onPage={(p) => setPage(Math.min(totalPages, Math.max(1, p)))}
                />
            ) : (
                <div className="flex flex-col items-center justify-center text-center py-20 bg-white border border-outline-variant rounded-xl">
                    <Icon name="account_balance_wallet" className="text-[64px] text-outline-variant" />
                    <h3 className="text-headline-sm text-on-secondary-fixed mt-4">No payouts in this range</h3>
                    <p className="text-on-surface-variant mt-1">Try a different date range.</p>
                </div>
            )}

            {/* Info note */}
            <div className="mt-stack-lg bg-primary-container/5 rounded-xl p-6 border border-primary-container/20 flex gap-4">
                <Icon name="info" className="text-primary shrink-0" />
                <p className="text-body-sm text-on-surface-variant">
                    Payouts are processed weekly and typically arrive within 2-3 business days. A minimum
                    balance of ৳20.00 is required to request a payout.
                </p>
            </div>

            {modalOpen && (
                <RequestPayoutModal
                    availableBalance={balance}
                    onClose={() => setModalOpen(false)}
                    onConfirm={handleConfirmPayout}
                />
            )}
        </>
    );
}